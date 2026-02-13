import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import HeroForm from "@/components/HeroForm";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, ArrowRight, User, Tag, Filter } from "lucide-react";
import heroContactCenterVideo from "@/assets/hero-contact-center.mp4";
import heroContactCenterPoster from "@/assets/hero-contact-center.jpg";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  author: string;
  read_time_minutes: number | null;
  published_at: string | null;
  created_at: string;
  category: string | null;
  tags: string[] | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image, author, read_time_minutes, published_at, created_at, category, tags")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      setPosts((data as BlogPost[]) || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  // Get unique categories and tags
  const categories = [...new Set(posts.map(p => p.category).filter(Boolean))] as string[];
  const allTags = [...new Set(posts.flatMap(p => p.tags || []))];

  // Filter posts
  const filteredPosts = posts.filter(p => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (activeTag && !(p.tags || []).includes(activeTag)) return false;
    return true;
  });

  return (
    <>
      <SEOHead
        title="Blog | AI Contact Center Insights & Best Practices | Haloo Connect"
        description="Expert articles on AI-powered contact center solutions, customer engagement strategies, and industry best practices from Haloo Connect."
        keywords="contact center blog, AI customer service, call center tips, omnichannel strategy, customer experience"
        canonical="https://halooconnect.com/blog"
      />
      <main className="min-h-screen">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex flex-col justify-center pt-20 pb-8 md:pt-24 md:pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <video src={heroContactCenterVideo} poster={heroContactCenterPoster} autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/55 to-black/45" />
          </div>
          <div className="container relative z-10 flex-1 flex flex-col">
            <div className="flex-1 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 text-white">
                  Insights & <span className="text-primary">Resources</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Expert articles on AI-powered contact center solutions, customer engagement, and industry best practices.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                <HeroForm />
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        {(categories.length > 0 || allTags.length > 0) && (
          <section className="py-6 bg-muted/30 border-b border-border">
            <div className="container">
              {categories.length > 0 && (
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <span className="text-sm font-medium text-foreground flex items-center gap-1.5"><Filter className="w-4 h-4" /> Category:</span>
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`text-sm px-3 py-1.5 rounded-full transition-colors ${!activeCategory ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}
                  >
                    All
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                      className={`text-sm px-3 py-1.5 rounded-full transition-colors ${activeCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
              {allTags.length > 0 && (
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-medium text-foreground flex items-center gap-1.5"><Tag className="w-4 h-4" /> Tags:</span>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                      className={`text-xs px-2.5 py-1 rounded-full transition-colors ${activeTag === tag ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Blog Listing */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  {activeCategory || activeTag ? "No posts found" : "Coming Soon"}
                </h2>
                <p className="text-muted-foreground">
                  {activeCategory || activeTag ? "Try a different filter" : "We're working on great content for you. Stay tuned!"}
                </p>
                {(activeCategory || activeTag) && (
                  <button onClick={() => { setActiveCategory(null); setActiveTag(null); }} className="mt-4 text-primary underline text-sm">Clear filters</button>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                  >
                    {post.cover_image && (
                      <div className="aspect-video overflow-hidden">
                        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 flex-wrap mb-3">
                        {post.category && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{post.category}</span>
                        )}
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.published_at || post.created_at)}
                        </span>
                        {post.read_time_minutes && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {post.read_time_minutes} min
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                      {post.excerpt && <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap mb-3">
                          {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <User className="w-3.5 h-3.5" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                          Read More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Blog;
