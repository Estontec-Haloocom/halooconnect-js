import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BlogRichTextEditor from "@/components/BlogRichTextEditor";
import logo from "@/assets/haloo-connect-logo.png";
import {
  LogOut, Plus, Edit, Trash2, Save, ArrowLeft, Search,
  Globe, FileText, Clock, ChevronDown, ExternalLink, RefreshCw,
  Upload, Image as ImageIcon, Eye, Tag, BarChart3, CheckCircle2, AlertCircle, Info, X
} from "lucide-react";

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

const AdminBlog = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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

  // Form state
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
  const [readTime, setReadTime] = useState(5);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
      if (session) fetchPosts();
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
      if (session) fetchPosts();
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("updated_at", { ascending: false });
    setPosts((data as BlogPost[]) || []);
  };

  const generateSlug = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const estimateReadTime = (html: string) => {
    const text = html.replace(/<[^>]*>/g, "");
    return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
  };

  const resetForm = () => {
    setTitle(""); setSlug(""); setExcerpt(""); setContent(""); setCoverImage("");
    setAuthor("Haloo Connect"); setStatus("draft"); setMetaTitle(""); setMetaDescription("");
    setMetaKeywords(""); setOgImage(""); setReadTime(5); setEditingPost(null); setActiveTab("content");
    setCategory(""); setTags([]); setTagInput("");
  };

  const openEditor = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setTitle(post.title); setSlug(post.slug); setExcerpt(post.excerpt || "");
      setContent(post.content); setCoverImage(post.cover_image || "");
      setAuthor(post.author); setStatus(post.status);
      setMetaTitle(post.meta_title || ""); setMetaDescription(post.meta_description || "");
      setMetaKeywords(post.meta_keywords || ""); setOgImage(post.og_image || "");
      setReadTime(post.read_time_minutes || 5);
      setCategory(post.category || "");
      setTags(post.tags || []);
    } else {
      resetForm();
    }
    setView("editor");
  };

  const uploadImage = useCallback(async (file: File, setter: (url: string) => void, setLoading: (v: boolean) => void) => {
    setLoading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file, { contentType: file.type });

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("blog-images")
      .getPublicUrl(data.path);

    setter(publicUrl);
    setLoading(false);
    toast({ title: "Image uploaded" });
  }, [toast]);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  const handleSave = async (publishNow = false) => {
    if (!title.trim()) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return;
    }

    setSaving(true);
    const finalSlug = slug || generateSlug(title);
    const finalStatus = publishNow ? "published" : status;
    const finalReadTime = estimateReadTime(content);

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
      read_time_minutes: finalReadTime,
      category: category || null,
      tags: tags.length > 0 ? tags : [],
      ...(publishNow && !editingPost?.published_at ? { published_at: new Date().toISOString() } : {}),
    } as any;

    let error;
    if (editingPost) {
      ({ error } = await supabase.from("blog_posts").update(postData).eq("id", editingPost.id));
    } else {
      ({ error } = await supabase.from("blog_posts").insert(postData));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: publishNow ? "Post published successfully" : "Draft saved" });
      fetchPosts();
      setView("list");
      resetForm();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast({ title: "Deleted", description: "Post removed" });
    fetchPosts();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );

  if (!isAuthenticated) {
    navigate("/admin");
    return null;
  }

  // SEO Analysis
  const seoChecks = [
    { label: "Meta title set (10-60 chars)", pass: metaTitle.length >= 10 && metaTitle.length <= 60, critical: true },
    { label: "Meta description set (50-160 chars)", pass: metaDescription.length >= 50 && metaDescription.length <= 160, critical: true },
    { label: "Keywords defined", pass: metaKeywords.length > 5, critical: false },
    { label: "Slug is SEO-friendly", pass: slug.length > 3 && !slug.includes(" "), critical: false },
    { label: "Excerpt provided (20+ chars)", pass: excerpt.length >= 20, critical: false },
    { label: "Cover image set", pass: coverImage.length > 5, critical: false },
    { label: "OG image set for social sharing", pass: ogImage.length > 5, critical: false },
    { label: "Content has 300+ words", pass: content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length >= 300, critical: true },
    { label: "Title includes focus keyword", pass: metaKeywords.split(",")[0]?.trim() ? title.toLowerCase().includes(metaKeywords.split(",")[0].trim().toLowerCase()) : false, critical: false },
    { label: "Meta description includes focus keyword", pass: metaKeywords.split(",")[0]?.trim() ? metaDescription.toLowerCase().includes(metaKeywords.split(",")[0].trim().toLowerCase()) : false, critical: false },
    { label: "Category assigned", pass: !!category, critical: false },
    { label: "Tags added", pass: tags.length > 0, critical: false },
  ];

  const seoScore = Math.round((seoChecks.filter(c => c.pass).length / seoChecks.length) * 100);

  if (view === "editor") {
    return (
      <div className="min-h-screen bg-background">
        {/* Editor Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => { setView("list"); resetForm(); }}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <span className="text-sm text-muted-foreground">
                {editingPost ? "Editing" : "New Post"}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${status === 'published' ? 'bg-green-500/15 text-green-600' : 'bg-yellow-500/15 text-yellow-600'}`}>
                {status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {editingPost?.status === "published" && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/blog/${slug}`} target="_blank" rel="noopener noreferrer">
                    <Eye className="w-4 h-4 mr-1" /> Preview
                  </a>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => handleSave(false)} disabled={saving}>
                <Save className="w-4 h-4 mr-1" /> Save Draft
              </Button>
              <Button size="sm" onClick={() => handleSave(true)} disabled={saving} className="bg-primary text-primary-foreground">
                {saving ? <RefreshCw className="w-4 h-4 animate-spin mr-1" /> : <Globe className="w-4 h-4 mr-1" />}
                Publish
              </Button>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="bg-card border-b border-border">
          <div className="container flex gap-0">
            {([
              { id: "content" as const, label: "Content", icon: FileText },
              { id: "media" as const, label: "Media & Settings", icon: ImageIcon },
              { id: "seo" as const, label: "SEO", icon: BarChart3, badge: `${seoScore}%` },
            ]).map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.badge && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${seoScore >= 70 ? 'bg-green-500/15 text-green-600' : seoScore >= 40 ? 'bg-yellow-500/15 text-yellow-600' : 'bg-red-500/15 text-red-600'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="container py-6 max-w-5xl">
          {/* CONTENT TAB */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <Input
                value={title}
                onChange={(e) => { setTitle(e.target.value); if (!editingPost) setSlug(generateSlug(e.target.value)); }}
                placeholder="Enter blog title..."
                className="text-2xl font-bold h-14 border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 bg-transparent"
              />

              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">URL:</span>
                <span className="text-muted-foreground">/blog/</span>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  className="h-8 text-sm max-w-xs"
                  placeholder="post-slug"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Excerpt / Summary</label>
                <Textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary for listings and social shares..."
                  rows={2}
                />
                <p className="text-xs text-muted-foreground mt-1">{excerpt.length} characters</p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Content</label>
                <BlogRichTextEditor content={content} onChange={setContent} />
              </div>
            </div>
          )}

          {/* MEDIA & SETTINGS TAB */}
          {activeTab === "media" && (
            <div className="space-y-6">
              {/* Cover Image */}
              <div className="border border-border rounded-xl p-5 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2"><ImageIcon className="w-5 h-5 text-primary" /> Cover Image</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="Image URL or upload below" />
                    <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f, setCoverImage, setUploadingCover); e.target.value = ""; }} />
                    <Button variant="outline" size="sm" onClick={() => coverInputRef.current?.click()} disabled={uploadingCover}>
                      {uploadingCover ? <RefreshCw className="w-4 h-4 animate-spin mr-1" /> : <Upload className="w-4 h-4 mr-1" />}
                      Upload Cover Image
                    </Button>
                  </div>
                  <div>
                    {coverImage ? (
                      <div className="relative group">
                        <img src={coverImage} alt="Cover preview" className="rounded-lg w-full h-40 object-cover" />
                        <button type="button" onClick={() => setCoverImage("")} className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs">×</button>
                      </div>
                    ) : (
                      <div className="rounded-lg w-full h-40 bg-muted/50 border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm">No cover image</div>
                    )}
                  </div>
                </div>
              </div>

              {/* OG Image */}
              <div className="border border-border rounded-xl p-5 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> Social Share Image (OG Image)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Input value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="OG Image URL or upload" />
                    <input ref={ogInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f, setOgImage, setUploadingOg); e.target.value = ""; }} />
                    <Button variant="outline" size="sm" onClick={() => ogInputRef.current?.click()} disabled={uploadingOg}>
                      {uploadingOg ? <RefreshCw className="w-4 h-4 animate-spin mr-1" /> : <Upload className="w-4 h-4 mr-1" />}
                      Upload OG Image
                    </Button>
                    <p className="text-xs text-muted-foreground">Recommended: 1200×630px</p>
                  </div>
                  <div>
                    {ogImage ? (
                      <div className="relative group">
                        <img src={ogImage} alt="OG preview" className="rounded-lg w-full h-40 object-cover" />
                        <button type="button" onClick={() => setOgImage("")} className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs">×</button>
                      </div>
                    ) : (
                      <div className="rounded-lg w-full h-40 bg-muted/50 border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm">No OG image</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Category & Tags */}
              <div className="border border-border rounded-xl p-5 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2"><Tag className="w-5 h-5 text-primary" /> Category & Tags</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="flex h-12 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <option value="">Select category...</option>
                      {BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Tags</label>
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                        placeholder="Add tag and press Enter"
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm" onClick={addTag} className="h-12">Add</Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map(tag => (
                          <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive"><X className="w-3 h-3" /></button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Post Settings */}
              <div className="border border-border rounded-xl p-5 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Post Settings</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Author</label>
                    <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="flex h-12 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Read Time</label>
                    <p className="text-sm text-muted-foreground mt-2">Auto: ~{estimateReadTime(content)} min</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SEO TAB */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              {/* Score overview */}
              <div className={`border rounded-xl p-5 ${seoScore >= 70 ? 'border-green-500/30 bg-green-500/5' : seoScore >= 40 ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${seoScore >= 70 ? 'bg-green-500/20 text-green-600' : seoScore >= 40 ? 'bg-yellow-500/20 text-yellow-600' : 'bg-red-500/20 text-red-600'}`}>
                    {seoScore}%
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">SEO Score</h3>
                    <p className="text-sm text-muted-foreground">
                      {seoScore >= 70 ? "Great! Your post is well-optimized." : seoScore >= 40 ? "Good start. Fix the issues below." : "Needs work. Address critical issues."}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {seoChecks.map((check, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {check.pass ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> : check.critical ? <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> : <Info className="w-4 h-4 text-yellow-500 flex-shrink-0" />}
                      <span className={check.pass ? "text-muted-foreground" : "text-foreground"}>{check.label}</span>
                      {check.critical && !check.pass && <span className="text-xs text-red-500 ml-auto">Critical</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO Fields */}
              <div className="border border-border rounded-xl p-5 space-y-4">
                <h3 className="font-semibold text-foreground">Meta Tags</h3>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 flex items-center justify-between">
                    Meta Title
                    <span className={`text-xs ${metaTitle.length > 60 ? 'text-red-500' : metaTitle.length >= 10 ? 'text-green-500' : 'text-muted-foreground'}`}>{metaTitle.length}/60</span>
                  </label>
                  <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="SEO title (10-60 characters)" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 flex items-center justify-between">
                    Meta Description
                    <span className={`text-xs ${metaDescription.length > 160 ? 'text-red-500' : metaDescription.length >= 50 ? 'text-green-500' : 'text-muted-foreground'}`}>{metaDescription.length}/160</span>
                  </label>
                  <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="SEO description (50-160 characters)" rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Focus Keywords</label>
                  <Input value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="primary keyword, secondary keyword, ..." />
                  <p className="text-xs text-muted-foreground mt-1">First keyword is focus keyword for analysis</p>
                </div>
              </div>

              {/* Google Preview */}
              <div className="border border-border rounded-xl p-5 space-y-3">
                <h3 className="font-semibold text-foreground">Google Search Preview</h3>
                <div className="p-4 bg-background rounded-lg border border-border">
                  <p className="text-blue-600 text-lg font-medium truncate">{metaTitle || title || "Page Title"}</p>
                  <p className="text-green-700 text-sm">halooconnect.com/blog/{slug || "post-slug"}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{metaDescription || excerpt || "Add a meta description..."}</p>
                </div>
              </div>

              {/* Social Preview */}
              <div className="border border-border rounded-xl p-5 space-y-3">
                <h3 className="font-semibold text-foreground">Social Share Preview</h3>
                <div className="rounded-lg border border-border overflow-hidden max-w-md">
                  {(ogImage || coverImage) ? (
                    <img src={ogImage || coverImage} alt="Social preview" className="w-full h-40 object-cover" />
                  ) : (
                    <div className="w-full h-40 bg-muted/50 flex items-center justify-center text-muted-foreground text-sm">No image set</div>
                  )}
                  <div className="p-3 bg-muted/30">
                    <p className="text-xs text-muted-foreground uppercase">halooconnect.com</p>
                    <p className="font-semibold text-foreground text-sm truncate">{metaTitle || title || "Post Title"}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{metaDescription || excerpt || "Description"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Haloo Connect" className="h-8 md:h-10" />
            <span className="text-muted-foreground hidden sm:inline">Blog Manager</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/admin")}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Leads
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
            <p className="text-sm text-muted-foreground">{posts.length} total posts</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search posts..." className="pl-9 w-full sm:w-64" />
            </div>
            <Button onClick={() => openEditor()} className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-1" /> New Post
            </Button>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-card rounded-xl border border-border/50 p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-4">Create your first blog post</p>
            <Button onClick={() => openEditor()} className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-1" /> Create Post
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-card rounded-xl border border-border/50 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                {post.cover_image && (
                  <img src={post.cover_image} alt="" className="w-full sm:w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.status === 'published' ? 'bg-green-500/15 text-green-600' : 'bg-yellow-500/15 text-yellow-600'}`}>
                      {post.status}
                    </span>
                    {post.category && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{post.category}</span>
                    )}
                    {post.read_time_minutes && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.read_time_minutes} min
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground truncate">{post.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{post.excerpt || "No excerpt"}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {post.status === "published" && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4" /></a>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => openEditor(post)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminBlog;
