"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabaseNext } from "@/integrations/supabase/next-client";
import {
  Trash2,
  LogOut,
  RefreshCw,
  Users,
  Calendar,
  Phone,
  Building2,
  MapPin,
  FileText,
  BarChart3,
} from "lucide-react";
import logo from "@/assets/haloo-connect-logo.png";

interface Lead {
  id: string;
  name: string;
  phone: string;
  country_code: string;
  company: string;
  email: string | null;
  created_at: string;
  location: string | null;
  city: string | null;
}

interface AnalysisLead {
  id: string;
  full_name: string | null;
  email: string | null;
  company_name: string;
  website: string;
  business_type: string;
  readiness_score: number | null;
  created_at: string;
}

const AdminPageNext = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"leads" | "analysis">("leads");
  const [analysisLeads, setAnalysisLeads] = useState<AnalysisLead[]>([]);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseNext.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
      if (session) {
        void fetchLeads();
        void fetchAnalysisLeads();
      }
    });

    supabaseNext.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
      if (session) {
        void fetchLeads();
        void fetchAnalysisLeads();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchLeads = async () => {
    setLeadsLoading(true);
    const { data, error } = await supabaseNext
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch leads", variant: "destructive" });
    } else {
      setLeads(data || []);
    }
    setLeadsLoading(false);
  };

  const fetchAnalysisLeads = async () => {
    setAnalysisLoading(true);
    const { data, error } = await supabaseNext
      .from("analysis_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch analysis leads",
        variant: "destructive",
      });
    } else {
      setAnalysisLeads(data || []);
    }
    setAnalysisLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    if (email !== "admin@connect.com") {
      toast({ title: "Access Denied", description: "Invalid admin credentials", variant: "destructive" });
      setLoginLoading(false);
      return;
    }

    const { error } = await supabaseNext.auth.signInWithPassword({ email, password });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        const { error: signUpError } = await supabaseNext.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });

        if (signUpError) {
          toast({ title: "Login Failed", description: signUpError.message, variant: "destructive" });
        } else {
          const { error: loginError } = await supabaseNext.auth.signInWithPassword({ email, password });
          if (loginError) {
            toast({ title: "Login Failed", description: "Please try again", variant: "destructive" });
          }
        }
      } else {
        toast({ title: "Login Failed", description: error.message, variant: "destructive" });
      }
    }

    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabaseNext.auth.signOut();
    setIsAuthenticated(false);
    setLeads([]);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error } = await supabaseNext.from("leads").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete lead", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Lead has been removed" });
      setLeads((current) => current.filter((lead) => lead.id !== id));
    }
    setDeletingId(null);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-elevated">
            <div className="mb-8 text-center">
              <img src={logo.src} alt="Haloo Connect" className="mx-auto mb-4 h-10" />
              <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
              <p className="mt-2 text-muted-foreground">Access the leads dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="admin@connect.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loginLoading}>
                {loginLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <img src={logo.src} alt="Haloo Connect" className="h-8 md:h-10" />
            <span className="hidden text-muted-foreground sm:inline">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/blog")}>
              <FileText className="mr-2 h-4 w-4" />
              Blog CMS
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{leads.length}</p>
                <p className="text-sm text-muted-foreground">Total Leads</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                <Calendar className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {
                    leads.filter((lead) => {
                      const today = new Date();
                      const created = new Date(lead.created_at);
                      return created.toDateString() === today.toDateString();
                    }).length
                  }
                </p>
                <p className="text-sm text-muted-foreground">Today</p>
              </div>
            </div>
          </div>
          <div className="hidden rounded-xl border border-border/50 bg-card p-6 md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                <Phone className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{leads.filter((lead) => lead.phone).length}</p>
                <p className="text-sm text-muted-foreground">With Phone</p>
              </div>
            </div>
          </div>
          <div className="hidden rounded-xl border border-border/50 bg-card p-6 md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                <Building2 className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {leads.filter((lead) => lead.company && lead.company !== "Not provided").length}
                </p>
                <p className="text-sm text-muted-foreground">Companies</p>
              </div>
            </div>
          </div>
          <div className="hidden rounded-xl border border-border/50 bg-card p-6 md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                <MapPin className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {leads.filter((lead) => lead.location === "India").length}
                </p>
                <p className="text-sm text-muted-foreground">From India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <Button variant={activeTab === "leads" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("leads")}>
            <Users className="mr-2 h-4 w-4" />
            Contact Leads
          </Button>
          <Button variant={activeTab === "analysis" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("analysis")}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Analysis Leads ({analysisLeads.length})
          </Button>
        </div>

        {activeTab === "leads" ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Lead Submissions</h2>
              <Button variant="outline" size="sm" onClick={fetchLeads} disabled={leadsLoading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${leadsLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
            {leadsLoading ? (
              <div className="rounded-xl border border-border/50 bg-card p-12 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                <p className="mt-4 text-muted-foreground">Loading leads...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="rounded-xl border border-border/50 bg-card p-12 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-medium text-foreground">No leads yet</h3>
                <p className="text-muted-foreground">Form submissions will appear here</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border bg-muted/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Phone</th>
                        <th className="hidden px-6 py-4 text-left text-sm font-medium text-foreground md:table-cell">Company</th>
                        <th className="hidden px-6 py-4 text-left text-sm font-medium text-foreground lg:table-cell">Email</th>
                        <th className="hidden px-6 py-4 text-left text-sm font-medium text-foreground md:table-cell">Location</th>
                        <th className="hidden px-6 py-4 text-left text-sm font-medium text-foreground sm:table-cell">Date</th>
                        <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="transition-colors hover:bg-muted/30">
                          <td className="px-6 py-4"><p className="font-medium text-foreground">{lead.name}</p></td>
                          <td className="px-6 py-4"><p className="text-foreground">{lead.country_code} {lead.phone}</p></td>
                          <td className="hidden px-6 py-4 md:table-cell"><p className="text-muted-foreground">{lead.company || "-"}</p></td>
                          <td className="hidden px-6 py-4 lg:table-cell"><p className="text-muted-foreground">{lead.email || "-"}</p></td>
                          <td className="hidden px-6 py-4 md:table-cell"><p className="text-muted-foreground">{lead.location || "-"}{lead.city && `, ${lead.city}`}</p></td>
                          <td className="hidden px-6 py-4 sm:table-cell"><p className="text-sm text-muted-foreground">{formatDate(lead.created_at)}</p></td>
                          <td className="px-6 py-4 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(lead.id)}
                              disabled={deletingId === lead.id}
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              {deletingId === lead.id ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Analysis Leads</h2>
              <Button variant="outline" size="sm" onClick={fetchAnalysisLeads} disabled={analysisLoading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${analysisLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
            {analysisLoading ? (
              <div className="rounded-xl border border-border/50 bg-card p-12 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                <p className="mt-4 text-muted-foreground">Loading...</p>
              </div>
            ) : analysisLeads.length === 0 ? (
              <div className="rounded-xl border border-border/50 bg-card p-12 text-center">
                <BarChart3 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-medium text-foreground">No analysis leads yet</h3>
                <p className="text-muted-foreground">AI Readiness Analyzer submissions will appear here</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border bg-muted/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Email</th>
                        <th className="hidden px-6 py-4 text-left text-sm font-medium text-foreground md:table-cell">Company</th>
                        <th className="hidden px-6 py-4 text-left text-sm font-medium text-foreground md:table-cell">Website</th>
                        <th className="hidden px-6 py-4 text-left text-sm font-medium text-foreground sm:table-cell">Industry</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Score</th>
                        <th className="hidden px-6 py-4 text-left text-sm font-medium text-foreground sm:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {analysisLeads.map((lead) => (
                        <tr key={lead.id} className="transition-colors hover:bg-muted/30">
                          <td className="px-6 py-4"><p className="font-medium text-foreground">{lead.full_name || "-"}</p></td>
                          <td className="px-6 py-4"><p className="text-muted-foreground">{lead.email || "-"}</p></td>
                          <td className="hidden px-6 py-4 md:table-cell"><p className="text-muted-foreground">{lead.company_name}</p></td>
                          <td className="hidden px-6 py-4 text-xs text-muted-foreground md:table-cell">{lead.website}</td>
                          <td className="hidden px-6 py-4 sm:table-cell"><p className="text-muted-foreground">{lead.business_type}</p></td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center rounded-lg bg-destructive/10 px-2 py-1 text-sm font-bold text-destructive">
                              {lead.readiness_score ?? "-"}/100
                            </span>
                          </td>
                          <td className="hidden px-6 py-4 sm:table-cell"><p className="text-sm text-muted-foreground">{formatDate(lead.created_at)}</p></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPageNext;
