import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BlogRichTextEditor from "@/components/BlogRichTextEditor";
import logo from "@/assets/haloo-connect-logo.png";
import {
  LogOut, Plus, Edit, Trash2, Eye, Save, ArrowLeft, Search,
  Globe, FileText, Clock, ChevronDown, ExternalLink, RefreshCw
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
}

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
  const [showSEO, setShowSEO] = useState(false);

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
    setPosts(data || []);
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
    setMetaKeywords(""); setOgImage(""); setReadTime(5); setEditingPost(null); setShowSEO(false);
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
    } else {
      resetForm();
    }
    setView("editor");
  };

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
      ...(publishNow && !editingPost?.published_at ? { published_at: new Date().toISOString() } : {}),
    };

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

  if (view === "editor") {
    const seoScore = [
      metaTitle.length > 10,
      metaTitle.length < 60,
      metaDescription.length > 50,
      metaDescription.length < 160,
      metaKeywords.length > 5,
      slug.length > 3,
      excerpt.length > 20,
    ].filter(Boolean).length;

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
            </div>
            <div className="flex items-center gap-2">
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

        <div className="container py-6 max-w-5xl">
          <div className="space-y-6">
            {/* Title */}
            <Input
              value={title}
              onChange={(e) => { setTitle(e.target.value); if (!editingPost) setSlug(generateSlug(e.target.value)); }}
              placeholder="Enter blog title..."
              className="text-2xl font-bold h-14 border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 bg-transparent"
            />

            {/* Slug */}
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

            {/* Cover Image & Author */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Cover Image URL</label>
                <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." />
                {coverImage && (
                  <img src={coverImage} alt="Cover preview" className="mt-2 rounded-lg max-h-32 object-cover" />
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Author</label>
                <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Excerpt</label>
              <Textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of the post..."
                rows={2}
              />
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Content</label>
              <BlogRichTextEditor content={content} onChange={setContent} />
            </div>

            {/* SEO Section */}
            <div className="border border-border rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowSEO(!showSEO)}
                className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">SEO Settings</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${seoScore >= 5 ? 'bg-green-500/20 text-green-600' : seoScore >= 3 ? 'bg-yellow-500/20 text-yellow-600' : 'bg-red-500/20 text-red-600'}`}>
                    Score: {seoScore}/7
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showSEO ? 'rotate-180' : ''}`} />
              </button>

              {showSEO && (
                <div className="p-4 space-y-4 border-t border-border">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 flex items-center justify-between">
                      Meta Title
                      <span className={`text-xs ${metaTitle.length > 60 ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {metaTitle.length}/60
                      </span>
                    </label>
                    <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="SEO title (under 60 chars)" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 flex items-center justify-between">
                      Meta Description
                      <span className={`text-xs ${metaDescription.length > 160 ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {metaDescription.length}/160
                      </span>
                    </label>
                    <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="SEO description (under 160 chars)" rows={2} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Keywords</label>
                    <Input value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="keyword1, keyword2, keyword3" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">OG Image URL</label>
                    <Input value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="Social share image URL" />
                  </div>

                  {/* SEO Preview */}
                  {(metaTitle || title) && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-2">Google Preview:</p>
                      <div className="space-y-1">
                        <p className="text-blue-600 text-lg font-medium truncate">{metaTitle || title}</p>
                        <p className="text-green-700 text-sm">halooconnect.com/blog/{slug || "..."}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{metaDescription || excerpt || "No description set"}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
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
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
            <p className="text-sm text-muted-foreground">{posts.length} total posts</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="pl-9 w-full sm:w-64"
              />
            </div>
            <Button onClick={() => openEditor()} className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-1" /> New Post
            </Button>
          </div>
        </div>

        {/* Posts List */}
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
              <div
                key={post.id}
                className="bg-card rounded-xl border border-border/50 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-shadow"
              >
                {post.cover_image && (
                  <img src={post.cover_image} alt="" className="w-full sm:w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.status === 'published' ? 'bg-green-500/15 text-green-600' : 'bg-yellow-500/15 text-yellow-600'}`}>
                      {post.status}
                    </span>
                    {post.read_time_minutes && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.read_time_minutes} min
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground truncate">{post.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{post.excerpt || "No excerpt"}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {post.status === "published" && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => openEditor(post)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
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
