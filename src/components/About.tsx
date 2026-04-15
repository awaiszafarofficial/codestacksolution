import { CheckCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  "15+ years of industry experience",
  "Team of 100+ certified engineers",
  "Global presence in 20+ countries",
  "ISO 27001 & SOC 2 certified",
];

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-1/2 h-96 bg-primary/5 rounded-full blur-[128px] -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <ScrollReveal direction="right">
            <div>
              <span className="text-primary font-medium mb-4 block">About CodeStackSol</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Building Tomorrow's <span className="text-gradient-animated">Technology</span> Today
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Since 2009, we've been at the forefront of digital innovation, helping businesses 
                transform their operations and achieve unprecedented growth through technology.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our team of experts combines deep technical expertise with strategic business 
                insight to deliver solutions that don't just work—they excel.
              </p>

              {/* Features List */}
              <ul className="space-y-4">
                {features.map((feature, i) => (
                  <ScrollReveal key={feature} delay={i * 100} direction="right">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "$2B+", label: "Revenue Generated for Clients", color: "from-primary to-primary/50" },
              { value: "500+", label: "Successful Projects", color: "from-accent to-accent/50" },
              { value: "150+", label: "Enterprise Clients", color: "from-accent to-primary/50" },
              { value: "99.9%", label: "Uptime Guarantee", color: "from-primary to-accent/50" },
            ].map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 120} direction="left">
                <div className="p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-colors group">
                  <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
