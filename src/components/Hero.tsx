import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import ParticlesBackground from "./ParticlesBackground";
import ConsultationDialog from "./ConsultationDialog";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [consultOpen, setConsultOpen] = useState(false);
  const mouse = useMousePosition(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20"
    >
      {/* Particle Network Background */}
      <ParticlesBackground />

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" style={{ zIndex: 2 }} />

      {/* Mouse-following Glowing Orbs */}
      <div
        className="absolute w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow transition-transform duration-700 ease-out"
        style={{
          zIndex: 2,
          top: "20%",
          left: "20%",
          transform: `translate(${mouse.normalizedX * 40}px, ${mouse.normalizedY * 40}px)`,
        }}
      />
      <div
        className="absolute w-80 h-80 bg-accent/20 rounded-full blur-[128px] animate-pulse-glow transition-transform duration-700 ease-out"
        style={{
          zIndex: 2,
          bottom: "20%",
          right: "20%",
          animationDelay: "1.5s",
          transform: `translate(${mouse.normalizedX * -30}px, ${mouse.normalizedY * -30}px)`,
        }}
      />

      <div
        className="container mx-auto px-6 relative"
        style={{
          zIndex: 10,
          transform: `translate(${mouse.normalizedX * -5}px, ${mouse.normalizedY * -5}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-slide-up">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Innovating the Future of Technology</span>
          </div>

          {/* Main Heading with animated gradient */}
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Transforming Ideas Into{" "}
            <span className="text-gradient-animated">Digital Excellence</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            We build cutting-edge software solutions that empower businesses to thrive in the digital age.
            From cloud infrastructure to AI-powered applications.
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 transition-all glow-primary text-lg px-8 py-6"
              onClick={() => setConsultOpen(true)}
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-8 mt-20 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient-animated">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" style={{ zIndex: 10 }} />

      <ConsultationDialog open={consultOpen} onOpenChange={setConsultOpen} />
    </section>
  );
};

export default Hero;
