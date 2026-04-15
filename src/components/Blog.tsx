import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  return (
    <section id="blog" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Our Blog
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-foreground">
              Latest Insights
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Stay updated with the latest trends, tips, and insights from our team of experts.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.15}>
              <Link to={`/blog/${post.slug}`}>
                <article className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/40 transition-all duration-500">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary backdrop-blur-sm border border-primary/20">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
                      Read More <ArrowRight size={16} />
                    </div>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
