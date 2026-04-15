import { useState } from "react";
import { Cloud, Code, Database, Lock, Smartphone, Zap, Palette, Globe, ShoppingCart } from "lucide-react";
import ServiceInquiryDialog from "./ServiceInquiryDialog";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Tailored solutions built from the ground up to meet your unique business requirements.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and migration services for modern enterprises.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Transform raw data into actionable insights with our advanced analytics solutions.",
  },
  {
    icon: Lock,
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your digital assets and infrastructure.",
  },
  {
    icon: Zap,
    title: "AI & Automation",
    description: "Leverage artificial intelligence to automate processes and drive innovation.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that combines intuitive interfaces with compelling visuals to boost engagement and conversion rates.",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "High-performance, responsive websites and web applications built with modern frameworks like React, Next.js, and Node.js.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "End-to-end online store solutions with secure payment gateways, inventory management, and optimized checkout experiences.",
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleServiceClick = (title: string) => {
    setSelectedService(title);
    setDialogOpen(true);
  };

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-medium mb-4 block">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Solutions That Drive <span className="text-gradient-animated">Growth</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              We offer comprehensive IT services designed to accelerate your digital transformation journey.
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 80}>
              <div
                className="group p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-500 hover:glow-primary cursor-pointer h-full"
                onClick={() => handleServiceClick(service.title)}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ServiceInquiryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        selectedService={selectedService}
      />
    </section>
  );
};

export default Services;
