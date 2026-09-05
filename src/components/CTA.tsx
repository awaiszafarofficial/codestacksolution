import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight, Mail, Phone } from "lucide-react";
import ConsultationDialog from "@/components/ConsultationDialog";
import ScrollReveal from "./ScrollReveal";

const portfolioItems = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
  },
  {
    title: "Cloud Migration",
    category: "Cloud Solutions",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
  },
  {
    title: "Mobile Banking App",
    category: "Mobile Development",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=400&fit=crop",
  },
  {
    title: "AI Analytics Dashboard",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "Cybersecurity Audit",
    category: "Cybersecurity",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
  },
  {
    title: "Data Pipeline System",
    category: "Data Engineering",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
  },
];

const CTA = () => {
  const [consultOpen, setConsultOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-primary opacity-10" />
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Glowing Effects */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/30 rounded-full blur-[80px]" />

            <div className="relative z-10 p-12 md:p-20 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="text-gradient-animated">Transform</span> Your Business?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
                Let's discuss how our expertise can help you achieve your technology goals.
                Get in touch with our team today.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 transition-all glow-primary text-lg px-8 py-6"
                  onClick={() => setConsultOpen(true)}
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-6"
                  onClick={() => setGalleryOpen(true)}
                >
                  View Our Work
                </Button> */}
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-muted-foreground">
                <a href="mailto:codestacksolution@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                  codestacksolution@gmail.com
                </a>
                <a href="tel:+923352222042" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                  +92 335 2222 042
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ConsultationDialog open={consultOpen} onOpenChange={setConsultOpen} />

      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="sm:max-w-4xl bg-background border-border max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Our Recent Work</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              A showcase of projects we've delivered for our clients.
            </DialogDescription>
          </DialogHeader>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {portfolioItems.map((item) => (
              <div
                key={item.title}
                className="group relative rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-xs text-primary font-medium">{item.category}</span>
                  <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CTA;
