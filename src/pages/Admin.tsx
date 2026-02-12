import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, LogOut, RefreshCw, Users, Calendar, Phone, Building2, MapPin, FileText } from "lucide-react";
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

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
      if (session) {
        fetchLeads();
      }
    });

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
      if (session) {
        fetchLeads();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchLeads = async () => {
    setLeadsLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch leads",
        variant: "destructive",
      });
    } else {
      setLeads(data || []);
    }
    setLeadsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    // Check for admin email
    if (email !== "admin@connect.com") {
      toast({
        title: "Access Denied",
        description: "Invalid admin credentials",
        variant: "destructive",
      });
      setLoginLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // If user doesn't exist, try to sign up first
      if (error.message.includes("Invalid login credentials")) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });

        if (signUpError) {
          toast({
            title: "Login Failed",
            description: signUpError.message,
            variant: "destructive",
          });
        } else {
          // Try logging in again after signup
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (loginError) {
            toast({
              title: "Login Failed",
              description: "Please try again",
              variant: "destructive",
            });
          }
        }
      } else {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    }

    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setLeads([]);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error } = await supabase.from("leads").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete lead",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Lead has been removed",
      });
      setLeads(leads.filter((lead) => lead.id !== id));
    }
    setDeletingId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl p-8 shadow-elevated border border-border/50">
            <div className="text-center mb-8">
              <img src={logo} alt="Haloo Connect" className="h-10 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
              <p className="text-muted-foreground mt-2">Access the leads dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="admin@connect.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={loginLoading}
              >
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
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Haloo Connect" className="h-8 md:h-10" />
            <span className="text-muted-foreground hidden sm:inline">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/admin/blog")}>
              <FileText className="w-4 h-4 mr-2" />
              Blog Manager
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-card rounded-xl p-6 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{leads.length}</p>
                <p className="text-sm text-muted-foreground">Total Leads</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {leads.filter((l) => {
                    const today = new Date();
                    const created = new Date(l.created_at);
                    return created.toDateString() === today.toDateString();
                  }).length}
                </p>
                <p className="text-sm text-muted-foreground">Today</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border/50 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {leads.filter((l) => l.phone).length}
                </p>
                <p className="text-sm text-muted-foreground">With Phone</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border/50 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {leads.filter((l) => l.company && l.company !== "Not provided").length}
                </p>
                <p className="text-sm text-muted-foreground">Companies</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border/50 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {leads.filter((l) => l.location === "India").length}
                </p>
                <p className="text-sm text-muted-foreground">From India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Lead Submissions</h2>
          <Button variant="outline" size="sm" onClick={fetchLeads} disabled={leadsLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${leadsLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Leads Table */}
        {leadsLoading ? (
          <div className="bg-card rounded-xl border border-border/50 p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            <p className="text-muted-foreground mt-4">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-card rounded-xl border border-border/50 p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No leads yet</h3>
            <p className="text-muted-foreground">Form submissions will appear here</p>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-medium text-foreground">Name</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-foreground">Phone</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-foreground hidden md:table-cell">Company</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-foreground hidden lg:table-cell">Email</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-foreground hidden md:table-cell">Location</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-foreground hidden sm:table-cell">Date</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-medium text-foreground">{lead.name}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-foreground">
                          {lead.country_code} {lead.phone}
                        </p>
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        <p className="text-muted-foreground">{lead.company || "-"}</p>
                      </td>
                      <td className="py-4 px-6 hidden lg:table-cell">
                        <p className="text-muted-foreground">{lead.email || "-"}</p>
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        <p className="text-muted-foreground">
                          {lead.location || "-"}
                          {lead.city && `, ${lead.city}`}
                        </p>
                      </td>
                      <td className="py-4 px-6 hidden sm:table-cell">
                        <p className="text-sm text-muted-foreground">{formatDate(lead.created_at)}</p>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(lead.id)}
                          disabled={deletingId === lead.id}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          {deletingId === lead.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
