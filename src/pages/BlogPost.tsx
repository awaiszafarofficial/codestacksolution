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

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={idx} className="text-foreground font-semibold">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  const renderContent = (blocks: string[]) => {
    const elements: JSX.Element[] = [];
    let i = 0;
    while (i < blocks.length) {
      const block = blocks[i];

      if (block.startsWith("## ")) {
        const title = block.replace("## ", "");
        const heading = post.headings.find((h) => h.title === title);
        elements.push(
          <h2
            key={i}
            id={heading?.id}
            className="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4 scroll-mt-24"
          >
            {title}
          </h2>
        );
        i++;
        continue;
      }

      if (block.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3">
            {block.replace("### ", "")}
          </h3>
        );
        i++;
        continue;
      }

      // List grouping
      if (/^[-*]\s/.test(block)) {
        const items: string[] = [];
        while (i < blocks.length && /^[-*]\s/.test(blocks[i])) {
          items.push(blocks[i].replace(/^[-*]\s/, ""));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="list-disc pl-6 space-y-2 mb-6 text-muted-foreground text-lg">
            {items.map((it, k) => (
              <li key={k}>{renderInline(it)}</li>
            ))}
          </ul>
        );
        continue;
      }

      // Table: lines starting with |
      if (block.startsWith("|")) {
        const rows: string[] = [];
        while (i < blocks.length && blocks[i].startsWith("|")) {
          rows.push(blocks[i]);
          i++;
        }
        const parseRow = (r: string) =>
          r.split("|").slice(1, -1).map((c) => c.trim());
        const headers = parseRow(rows[0]);
        const bodyRows = rows.slice(rows[1]?.includes("---") ? 2 : 1).map(parseRow);
        elements.push(
          <div key={`tbl-${i}`} className="overflow-x-auto my-6 rounded-lg border border-border">
            <table className="w-full text-left">
              <thead className="bg-muted/40">
                <tr>
                  {headers.map((h, k) => (
                    <th key={k} className="px-4 py-3 text-foreground font-semibold text-sm">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((r, k) => (
                  <tr key={k} className="border-t border-border">
                    {r.map((c, j) => (
                      <td key={j} className="px-4 py-3 text-muted-foreground text-sm">
                        {renderInline(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      elements.push(
        <p key={i} className="text-muted-foreground leading-relaxed text-lg mb-6">
          {renderInline(block)}
        </p>
      );
      i++;
    }
    return elements;
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
