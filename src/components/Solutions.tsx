import { useState } from "react";
import { Rocket, Building2, RefreshCw, TrendingUp, Layers, ShieldCheck } from "lucide-react";
import ServiceInquiryDialog from "./ServiceInquiryDialog";
import ScrollReveal from "./ScrollReveal";

const solutions = [
  {
    icon: Rocket,
    title: "Startup Launch Package",
    description: "End-to-end product development for startups — from MVP to market-ready product with UI/UX design, development, cloud deployment, and post-launch support.",
  },
  {
    icon: Building2,
    title: "Enterprise Digital Transformation",
    description: "Comprehensive modernization of legacy systems, workflow automation, and cloud migration tailored for large-scale enterprise operations.",
  },
  {
    icon: RefreshCw,
    title: "Legacy System Modernization",
    description: "Upgrade outdated software to modern architectures with zero downtime migration, improved performance, and enhanced security compliance.",
  },
  {
    icon: TrendingUp,
    title: "Business Intelligence & Analytics",
    description: "Custom dashboards, data pipelines, and AI-driven insights that turn your raw data into strategic business decisions.",
  },
  {
    icon: Layers,
    title: "Full-Stack Product Development",
    description: "Complete product lifecycle management — strategy, design, frontend, backend, DevOps, QA, and ongoing maintenance under one roof.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Security Solutions",
    description: "GDPR, HIPAA, and SOC 2 compliance implementation with continuous monitoring, penetration testing, and security audits.",
  },
];

const Solutions = () => {
  const [selectedService, setSelectedService] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = (title: string) => {
    setSelectedService(title);
    setDialogOpen(true);
  };

  return (
    <section id="solutions" className="py-24 relative">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-medium mb-4 block">Our Solutions</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Outcome-Driven <span className="text-gradient-animated">Solutions</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Tailored, goal-oriented packages that solve specific business challenges and deliver measurable results.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <ScrollReveal key={solution.title} delay={index * 80}>
              <div
                className="group p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-500 hover:glow-primary cursor-pointer h-full"
                onClick={() => handleClick(solution.title)}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <solution.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {solution.description}
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

export default Solutions;
