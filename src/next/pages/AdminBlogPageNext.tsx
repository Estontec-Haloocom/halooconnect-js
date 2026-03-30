"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import BlogRichTextEditor from "@/components/BlogRichTextEditor";
import { supabaseNext } from "@/integrations/supabase/next-client";
import logo from "@/assets/haloo-connect-logo.png";
import {
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  ArrowLeft,
  Search,
  Globe,
  FileText,
  Clock,
  ExternalLink,
  RefreshCw,
  Upload,
  Image as ImageIcon,
  Eye,
  Tag,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  Database,
  Sparkles,
} from "lucide-react";
import { hasSanityEnv } from "@/sanity/env";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author: string;
  status: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image: string | null;
  read_time_minutes: number | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  category: string | null;
  tags: string[] | null;
}

const BLOG_CATEGORIES = [
  "AI & Automation",
  "Contact Center",
  "Customer Experience",
  "Cloud Solutions",
  "Industry Insights",
  "Product Updates",
  "Best Practices",
  "Case Studies",
];

const AdminBlogPageNext = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [view, setView] = useState<"list" | "editor">("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "media">("content");
  const coverInputRef = useRef<HTMLInputElement>(null);
  const ogInputRef = useRef<HTMLInputElement>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [author, setAuthor] = useState("Haloo Connect");
  const [status, setStatus] = useState("draft");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseNext.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
      if (session) void fetchPosts();
    });

    supabaseNext.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
      if (session) void fetchPosts();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabaseNext.from("blog_posts").select("*").order("updated_at", { ascending: false });
    setPosts((data as BlogPost[]) || []);
  };

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const estimateReadTime = (html: string) => {
    const text = html.replace(/<[^>]*>/g, "");
    return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setCoverImage("");
    setAuthor("Haloo Connect");
    setStatus("draft");
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
    setOgImage("");
    setEditingPost(null);
    setActiveTab("content");
    setCategory("");
    setTags([]);
    setTagInput("");
  };

  const openEditor = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt || "");
      setContent(post.content);
      setCoverImage(post.cover_image || "");
      setAuthor(post.author);
      setStatus(post.status);
      setMetaTitle(post.meta_title || "");
      setMetaDescription(post.meta_description || "");
      setMetaKeywords(post.meta_keywords || "");
      setOgImage(post.og_image || "");
      setCategory(post.category || "");
      setTags(post.tags || []);
    } else {
      resetForm();
    }
    setView("editor");
  };

  const uploadImage = useCallback(
    async (file: File, setter: (url: string) => void, setLoading: (value: boolean) => void) => {
      setLoading(true);
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      const { data, error } = await supabaseNext.storage
        .from("blog-images")
        .upload(fileName, file, { contentType: file.type });

      if (error) {
        toast({ title: "Upload failed", description: error.message, variant: "destructive" });
        setLoading(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabaseNext.storage.from("blog-images").getPublicUrl(data.path);

      setter(publicUrl);
      setLoading(false);
      toast({ title: "Image uploaded" });
    },
    [toast],
  );

  const addTag = () => {
    const nextTag = tagInput.trim();
    if (nextTag && !tags.includes(nextTag)) setTags([...tags, nextTag]);
    setTagInput("");
  };

  const removeTag = (tag: string) => setTags(tags.filter((item) => item !== tag));

  const handleSave = async (publishNow = false) => {
    if (!title.trim()) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return;
    }

    setSaving(true);
    const finalSlug = slug || generateSlug(title);
    const finalStatus = publishNow ? "published" : status;
    const postData = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim() || null,
      content,
      cover_image: coverImage.trim() || null,
      author: author.trim(),
      status: finalStatus,
      meta_title: metaTitle.trim() || null,
      meta_description: metaDescription.trim() || null,
      meta_keywords: metaKeywords.trim() || null,
      og_image: ogImage.trim() || null,
      read_time_minutes: estimateReadTime(content),
      category: category || null,
      tags: tags.length > 0 ? tags : [],
      ...(publishNow && !editingPost?.published_at ? { published_at: new Date().toISOString() } : {}),
    };

    let error;
    if (editingPost) {
      ({ error } = await supabaseNext.from("blog_posts").update(postData).eq("id", editingPost.id));
    } else {
      ({ error } = await supabaseNext.from("blog_posts").insert(postData));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: publishNow ? "Post published successfully" : "Draft saved" });
      await fetchPosts();
      setView("list");
      resetForm();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    await supabaseNext.from("blog_posts").delete().eq("id", id);
    toast({ title: "Deleted", description: "Post removed" });
    await fetchPosts();
  };

  const handleLogout = async () => {
    await supabaseNext.auth.signOut();
    router.push("/admin");
  };

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/admin");
    return null;
  }

  const contentText = content.replace(/<[^>]*>/g, "");
  const contentWords = contentText.split(/\s+/).filter(Boolean);
  const focusKeyword = metaKeywords.split(",")[0]?.trim()?.toLowerCase() || "";
  const keywordInContent = focusKeyword ? contentText.toLowerCase().includes(focusKeyword) : false;
  const keywordDensity =
    focusKeyword && contentWords.length > 0
      ? (((contentText.toLowerCase().split(focusKeyword).length - 1) / contentWords.length) * 100).toFixed(1)
      : "0";

  const seoChecks = [
    { label: "Meta title set (10-60 chars)", pass: metaTitle.length >= 10 && metaTitle.length <= 60, critical: true },
    { label: "Meta description set (50-160 chars)", pass: metaDescription.length >= 50 && metaDescription.length <= 160, critical: true },
    { label: "Focus keyword defined", pass: focusKeyword.length > 2, critical: true },
    { label: "Focus keyword in title", pass: focusKeyword ? title.toLowerCase().includes(focusKeyword) : false, critical: true },
    { label: "Focus keyword in content", pass: keywordInContent, critical: false },
    { label: `Keyword density (${keywordDensity}% - aim 1-3%)`, pass: parseFloat(keywordDensity) >= 0.5 && parseFloat(keywordDensity) <= 3, critical: false },
    { label: "SEO-friendly slug", pass: slug.length > 3 && !slug.includes(" "), critical: false },
    { label: "Excerpt provided", pass: excerpt.length >= 20, critical: false },
    { label: "Cover image set", pass: coverImage.length > 5, critical: false },
    { label: "OG image set", pass: ogImage.length > 5, critical: false },
    { label: "Content has 300+ words", pass: contentWords.length >= 300, critical: true },
    { label: "Category assigned", pass: !!category, critical: false },
    { label: "Tags added (3+ recommended)", pass: tags.length >= 3, critical: false },
  ];

  const seoScore = Math.round((seoChecks.filter((check) => check.pass).length / seoChecks.length) * 100);

  if (view === "editor") {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b border-border bg-card">
          <div className="container flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => { setView("list"); resetForm(); }}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              <span className="text-sm text-muted-foreground">{editingPost ? "Editing" : "New Post"}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${status === "published" ? "bg-green-500/15 text-green-600" : "bg-yellow-500/15 text-yellow-600"}`}>{status}</span>
            </div>
            <div className="flex items-center gap-2">
              {editingPost?.status === "published" && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/blog/${slug}`} target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-1 h-4 w-4" /> Preview
                  </a>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => void handleSave(false)} disabled={saving}>
                <Save className="mr-1 h-4 w-4" /> Save Draft
              </Button>
              <Button size="sm" onClick={() => void handleSave(true)} disabled={saving} className="bg-primary text-primary-foreground">
                {saving ? <RefreshCw className="mr-1 h-4 w-4 animate-spin" /> : <Globe className="mr-1 h-4 w-4" />}
                Publish
              </Button>
            </div>
          </div>
        </header>

        <div className="border-b border-border bg-card">
          <div className="container flex gap-0">
            {[
              { id: "content" as const, label: "Content", icon: FileText },
              { id: "media" as const, label: "Media & Settings", icon: ImageIcon },
              { id: "seo" as const, label: "SEO", icon: BarChart3, badge: `${seoScore}%` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {tab.badge && (
                  <span className={`rounded-full px-1.5 py-0.5 text-xs ${seoScore >= 70 ? "bg-green-500/15 text-green-600" : seoScore >= 40 ? "bg-yellow-500/15 text-yellow-600" : "bg-red-500/15 text-red-600"}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="container max-w-5xl py-6">
          {activeTab === "content" && (
            <div className="space-y-6">
              <Input
                value={title}
                onChange={(e) => { setTitle(e.target.value); if (!editingPost) setSlug(generateSlug(e.target.value)); }}
                placeholder="Enter blog title..."
                className="h-14 rounded-none border-0 border-b border-border bg-transparent px-0 text-2xl font-bold focus-visible:ring-0"
              />
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">URL:</span>
                <span className="text-muted-foreground">/blog/</span>
                <Input value={slug} onChange={(e) => setSlug(generateSlug(e.target.value))} className="h-8 max-w-xs text-sm" placeholder="post-slug" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Excerpt / Summary</label>
                <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief summary for listings and social shares..." rows={2} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Content</label>
                <BlogRichTextEditor content={content} onChange={setContent} />
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="space-y-4 rounded-xl border border-border p-5">
                <h3 className="flex items-center gap-2 font-semibold text-foreground"><ImageIcon className="h-5 w-5 text-primary" /> Cover Image</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="Image URL or upload below" />
                    <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadImage(file, setCoverImage, setUploadingCover); e.target.value = ""; }} />
                    <Button variant="outline" size="sm" onClick={() => coverInputRef.current?.click()} disabled={uploadingCover}>
                      {uploadingCover ? <RefreshCw className="mr-1 h-4 w-4 animate-spin" /> : <Upload className="mr-1 h-4 w-4" />}
                      Upload Cover Image
                    </Button>
                  </div>
                  <div>{coverImage ? <img src={coverImage} alt="Cover preview" className="h-40 w-full rounded-lg object-cover" /> : <div className="flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 text-sm text-muted-foreground">No cover image</div>}</div>
                </div>
              </div>

              <div className="space-y-4 rounded-xl border border-border p-5">
                <h3 className="flex items-center gap-2 font-semibold text-foreground"><Globe className="h-5 w-5 text-primary" /> Social Share Image (OG Image)</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <Input value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="OG Image URL or upload" />
                    <input ref={ogInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadImage(file, setOgImage, setUploadingOg); e.target.value = ""; }} />
                    <Button variant="outline" size="sm" onClick={() => ogInputRef.current?.click()} disabled={uploadingOg}>
                      {uploadingOg ? <RefreshCw className="mr-1 h-4 w-4 animate-spin" /> : <Upload className="mr-1 h-4 w-4" />}
                      Upload OG Image
                    </Button>
                  </div>
                  <div>{ogImage ? <img src={ogImage} alt="OG preview" className="h-40 w-full rounded-lg object-cover" /> : <div className="flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 text-sm text-muted-foreground">No OG image</div>}</div>
                </div>
              </div>

              <div className="space-y-4 rounded-xl border border-border p-5">
                <h3 className="flex items-center gap-2 font-semibold text-foreground"><Tag className="h-5 w-5 text-primary" /> Category & Tags</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="flex h-12 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      <option value="">Select category...</option>
                      {BLOG_CATEGORIES.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Tags</label>
                    <div className="flex gap-2">
                      <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Add tag and press Enter" className="flex-1" />
                      <Button variant="outline" size="sm" onClick={addTag} className="h-12">Add</Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive"><X className="h-3 w-3" /></button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6">
              <div className={`rounded-xl border p-5 ${seoScore >= 70 ? "border-green-500/30 bg-green-500/5" : seoScore >= 40 ? "border-yellow-500/30 bg-yellow-500/5" : "border-red-500/30 bg-red-500/5"}`}>
                <div className="mb-4 flex items-center gap-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold ${seoScore >= 70 ? "bg-green-500/20 text-green-600" : seoScore >= 40 ? "bg-yellow-500/20 text-yellow-600" : "bg-red-500/20 text-red-600"}`}>{seoScore}%</div>
                  <div>
                    <h3 className="font-semibold text-foreground">SEO Score</h3>
                    <p className="text-sm text-muted-foreground">Address critical issues before publishing.</p>
                  </div>
                </div>
                <div className="grid gap-x-6 gap-y-1.5 md:grid-cols-2">
                  {seoChecks.map((check) => (
                    <div key={check.label} className="flex items-center gap-2 py-0.5 text-sm">
                      {check.pass ? <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" /> : check.critical ? <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-500" /> : <Info className="h-4 w-4 flex-shrink-0 text-yellow-500" />}
                      <span className={check.pass ? "text-muted-foreground" : "text-foreground"}>{check.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4 rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground">Meta Tags</h3>
                <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="SEO title (10-60 characters)" />
                <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="SEO description (50-160 characters)" rows={3} />
                <Input value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="primary keyword, secondary keyword" />
              </div>
            </div>
          )}
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
            <span className="hidden text-muted-foreground sm:inline">Blog Manager</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push("/admin")}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Leads
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-1 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <section className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                <Sparkles className="h-4 w-4" /> Sanity Workflow
              </p>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                Manage new blog content in Sanity Studio
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                The blog frontend now supports Sanity-first content with Supabase fallback.
                Use Studio for new posts and structured SEO fields. This legacy screen remains
                available only while older Supabase posts are being migrated.
              </p>
              {!hasSanityEnv && (
                <p className="mt-2 text-sm text-amber-600">
                  Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
                  in your environment to enable the embedded Studio route.
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-primary text-primary-foreground">
                <Link href="/studio" target="_blank">
                  <Sparkles className="mr-2 h-4 w-4" /> Open Sanity Studio
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.sanity.io/docs" target="_blank" rel="noopener noreferrer">
                  Learn Sanity
                </a>
              </Button>
            </div>
          </div>
        </section>

        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Legacy Supabase Blog Posts</h1>
            <p className="text-sm text-muted-foreground">{posts.length} total legacy posts</p>
          </div>
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search posts..." className="w-full pl-9 sm:w-64" />
            </div>
            <Button variant="outline" onClick={() => openEditor()}>
              <Database className="mr-1 h-4 w-4" /> Legacy Editor
            </Button>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="rounded-xl border border-border/50 bg-card p-12 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-medium text-foreground">No posts yet</h3>
            <p className="mb-4 text-muted-foreground">Create your first blog post</p>
            <Button onClick={() => openEditor()} className="bg-primary text-primary-foreground">
              <Plus className="mr-1 h-4 w-4" /> Create Post
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <div key={post.id} className="flex flex-col items-start gap-4 rounded-xl border border-border/50 bg-card p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:p-5">
                {post.cover_image && <img src={post.cover_image} alt="" className="h-20 w-full rounded-lg object-cover sm:w-20" />}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${post.status === "published" ? "bg-green-500/15 text-green-600" : "bg-yellow-500/15 text-yellow-600"}`}>{post.status}</span>
                    {post.category && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{post.category}</span>}
                    {post.read_time_minutes && <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {post.read_time_minutes} min</span>}
                  </div>
                  <h3 className="truncate font-semibold text-foreground">{post.title}</h3>
                  <p className="truncate text-sm text-muted-foreground">{post.excerpt || "No excerpt"}</p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1">
                  {post.status === "published" && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => openEditor(post)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => void handleDelete(post.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminBlogPageNext;
