import { useState, useRef, useEffect } from "react";
import {
  Bot, Code, Layers, Cloud, Database, Palette,
  Globe, Smartphone, ShoppingCart, Settings, Wrench,
  Users, ShieldCheck, Cable, Brain, PenTool,
  ChevronDown, ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceInquiryDialog from "./ServiceInquiryDialog";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: Bot,
    title: "AI Automation & Intelligent Systems",
    description:
      "We design and deploy end-to-end AI automation pipelines that eliminate repetitive workflows, accelerate decision-making, and reduce operational costs. From intelligent document processing and predictive maintenance to conversational AI agents and robotic process automation, our solutions integrate seamlessly with your existing tech stack to deliver measurable efficiency gains across every department.",
  },
  {
    icon: Code,
    title: "Custom AI & Software Development",
    description:
      "Our engineers build bespoke software solutions powered by machine learning, natural language processing, and computer vision tailored to your specific business challenges. Whether you need a recommendation engine, fraud detection system, or a fully custom enterprise platform, we architect scalable, maintainable codebases that evolve with your growth.",
  },
  {
    icon: Layers,
    title: "SaaS Product Development",
    description:
      "We take your SaaS idea from concept to launch, building multi-tenant architectures with robust subscription management, role-based access control, and analytics dashboards. Our full-cycle approach covers product strategy, UI/UX design, development, testing, deployment, and iterative optimization to maximize user retention and revenue.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Engineering",
    description:
      "Accelerate your delivery pipeline with production-grade cloud infrastructure on AWS, Azure, or GCP. We implement CI/CD workflows, infrastructure-as-code, container orchestration with Kubernetes, and real-time monitoring — ensuring your applications are highly available, auto-scalable, and cost-optimized for peak performance.",
  },
  {
    icon: Database,
    title: "Data Engineering & AI Analytics",
    description:
      "Transform raw, siloed data into a strategic asset. We build modern data pipelines, lakehouse architectures, and real-time streaming platforms that feed AI-powered dashboards and predictive models — giving your leadership team the insights they need to make faster, smarter decisions with confidence.",
  },
  {
    icon: Palette,
    title: "UX/UI & Product Design",
    description:
      "Our design team crafts intuitive, visually stunning interfaces grounded in user research, journey mapping, and iterative prototyping. We blend aesthetic excellence with conversion-focused design thinking to create digital experiences that delight users, reduce friction, and drive measurable business outcomes.",
  },
  {
    icon: Globe,
    title: "Web Development & CMS",
    description:
      "We build high-performance, SEO-optimized websites and content management systems using modern frameworks like React, Next.js, and headless CMS platforms. From corporate portals to dynamic web applications, every project is responsive, accessible, and engineered for speed and scalability.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Deliver exceptional mobile experiences with native iOS, Android, or cross-platform apps built using React Native and Flutter. We handle everything from UX wireframing and backend API integration to App Store deployment and post-launch analytics — ensuring your app stands out in a crowded marketplace.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    description:
      "Launch and scale your online store with custom e-commerce solutions featuring secure payment gateways, real-time inventory management, personalized product recommendations, and optimized checkout flows. We build on Shopify, WooCommerce, or fully custom platforms to maximize conversions and customer lifetime value.",
  },
  {
    icon: Settings,
    title: "DevOps & Infrastructure Automation",
    description:
      "Streamline your software delivery with automated build, test, and deployment pipelines. We implement infrastructure-as-code, containerization, monitoring, alerting, and disaster recovery strategies that reduce downtime, improve release velocity, and give your engineering teams the confidence to ship faster.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description:
      "Keep your systems running at peak performance with our proactive maintenance and 24/7 support services. We provide bug fixes, security patches, performance tuning, feature enhancements, and technology upgrades — ensuring your applications remain reliable, secure, and aligned with evolving business needs.",
  },
  {
    icon: Users,
    title: "Staff Augmentation",
    description:
      "Scale your development capacity on demand with our vetted engineers, designers, and project managers who integrate seamlessly into your existing workflows. Whether you need a single specialist or an entire cross-functional team, we provide top-tier talent matched to your tech stack and culture.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity & Compliance",
    description:
      "Protect your digital assets with comprehensive security audits, penetration testing, vulnerability assessments, and compliance implementation for GDPR, HIPAA, SOC 2, and ISO 27001. We build security into every layer of your infrastructure so you can operate with confidence in an evolving threat landscape.",
  },
  {
    icon: Cable,
    title: "API Development & Integrations",
    description:
      "Connect your systems, third-party services, and data sources with robust, well-documented RESTful and GraphQL APIs. We design scalable integration architectures that enable real-time data exchange, webhook automation, and seamless interoperability across your entire technology ecosystem.",
  },
  {
    icon: Brain,
    title: "AI Consulting & Strategy",
    description:
      "Our AI strategists help you identify high-impact use cases, evaluate build-vs-buy decisions, and create actionable AI roadmaps aligned with your business goals. From feasibility assessments to model selection and governance frameworks, we guide your organization through every stage of AI adoption.",
  },
  {
    icon: PenTool,
    title: "Branding & Creative Design",
    description:
      "Establish a powerful brand identity with our creative design services — including logo design, brand guidelines, marketing collateral, motion graphics, and social media assets. We create cohesive visual narratives that resonate with your target audience and differentiate your brand in competitive markets.",
  },
];

const INITIAL_COUNT = 6;

const Services = () => {
  const [selectedService, setSelectedService] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const expandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expandRef.current) {
      setContentHeight(expandRef.current.scrollHeight);
    }
  }, [showAll]);

  const handleServiceClick = (title: string) => {
    setSelectedService(title);
    setDialogOpen(true);
  };

  const extraServices = services.slice(INITIAL_COUNT);

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
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

        {/* First 6 services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, INITIAL_COUNT).map((service, index) => (
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
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Expandable section */}
        <div
          ref={expandRef}
          className="overflow-hidden transition-all duration-700 ease-in-out"
          style={{
            maxHeight: showAll ? `${contentHeight}px` : "0px",
            opacity: showAll ? 1 : 0,
          }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {extraServices.map((service, index) => (
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
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="group border-primary/50 hover:bg-primary/10 transition-all duration-300"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </>
            ) : (
              <>
                View More Services
                <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5 animate-bounce" />
              </>
            )}
          </Button>
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
