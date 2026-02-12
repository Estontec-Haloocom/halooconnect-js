import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import HeroForm from "@/components/HeroForm";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
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
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image, author, read_time_minutes, published_at, created_at")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

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
            <video
              src={heroContactCenterVideo}
              poster={heroContactCenterPoster}
              autoPlay loop muted playsInline preload="auto"
              className="w-full h-full object-cover"
            />
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

        {/* Blog Listing */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Coming Soon</h2>
                <p className="text-muted-foreground">We're working on great content for you. Stay tuned!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                  >
                    {post.cover_image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(post.published_at || post.created_at)}
                        </span>
                        {post.read_time_minutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.read_time_minutes} min read
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
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
