import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24 text-center">
          <h1 className="text-4xl font-bold text-foreground">Post Not Found</h1>
          <p className="text-muted-foreground mt-4">The blog post you're looking for doesn't exist.</p>
          <Link to="/#blog" className="inline-flex items-center gap-2 text-primary mt-6 hover:underline">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const renderContent = (blocks: string[]) => {
    return blocks.map((block, i) => {
      if (block.startsWith("## ")) {
        const title = block.replace("## ", "");
        const heading = post.headings.find((h) => h.title === title);
        return (
          <h2
            key={i}
            id={heading?.id}
            className="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4 scroll-mt-24"
          >
            {title}
          </h2>
        );
      }
      return (
        <p key={i} className="text-muted-foreground leading-relaxed text-lg mb-6">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] min-h-[400px] mt-[72px]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="flex-1 max-w-3xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/#blog" className="hover:text-primary transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-primary" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-primary" /> {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag size={14} className="text-primary" /> {post.category}
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 mt-8 pb-8 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">{post.author.name}</p>
                <p className="text-muted-foreground text-xs">{post.author.role}</p>
              </div>
            </div>

            {/* Article Body */}
            <div className="mt-8 pb-16">
              {renderContent(post.content)}
            </div>

            {/* Back link */}
            <div className="pb-16">
              <button
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 font-medium"
              >
                <ArrowLeft size={16} /> Back to all articles
              </button>
            </div>
          </article>

          {/* Sidebar — Table of Contents */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                On this page
              </h3>
              <nav className="flex flex-col gap-2">
                {post.headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors py-1 border-l-2 border-border hover:border-primary pl-4"
                  >
                    {heading.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPost;
