import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import HeroForm from "@/components/HeroForm";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroContactCenterVideo from "@/assets/hero-contact-center.mp4";
import heroContactCenterPoster from "@/assets/hero-contact-center.jpg";

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author: string;
  read_time_minutes: number | null;
  published_at: string | null;
  created_at: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
            <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt || post.meta_description,
    "author": { "@type": "Person", "name": post.author },
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.created_at,
    "publisher": { "@type": "Organization", "name": "Haloo Connect" },
    "image": post.og_image || post.cover_image,
    "mainEntityOfPage": `https://halooconnect.com/blog/${post.slug}`,
  };

  return (
    <>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || post.title}
        keywords={post.meta_keywords || ""}
        canonical={`https://halooconnect.com/blog/${post.slug}`}
        ogImage={post.og_image || post.cover_image || undefined}
        schema={articleSchema}
      />
      <main className="min-h-screen">
        <Header />

        {/* Hero Section with Blog Title + Form */}
        <section className="relative min-h-[60vh] flex flex-col justify-center pt-20 pb-8 md:pt-24 md:pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <video
              src={heroContactCenterVideo}
              poster={heroContactCenterPoster}
              autoPlay loop muted playsInline preload="auto"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/45" />
          </div>

          <div className="container relative z-10 flex-1 flex flex-col">
            <div className="flex-1 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <Link to="/blog" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(post.published_at || post.created_at)}</span>
                  {post.read_time_minutes && (
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.read_time_minutes} min read</span>
                  )}
                </div>
              </div>
              <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                <HeroForm />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content - Mobile First */}
        <section className="py-8 md:py-16 bg-background">
          <div className="container max-w-4xl">
            {/* Share bar */}
            <div className="flex items-center justify-end mb-6">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
            </div>

            {post.cover_image && (
              <div className="rounded-2xl overflow-hidden mb-8">
                <img src={post.cover_image} alt={post.title} className="w-full h-auto" />
              </div>
            )}

            {/* Blog Content */}
            <article
              className="blog-content prose prose-lg max-w-none prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4 prose-a:text-primary prose-strong:text-foreground prose-img:rounded-xl prose-li:text-muted-foreground prose-li:leading-relaxed prose-ul:my-4 prose-ol:my-4 prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-table:border-collapse prose-td:border prose-td:border-border prose-td:p-3 prose-th:border prose-th:border-border prose-th:p-3 prose-th:bg-muted/50 prose-hr:my-8 prose-pre:bg-muted prose-code:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Back to blog */}
            <div className="mt-12 pt-8 border-t border-border">
              <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to all articles
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default BlogPost;
