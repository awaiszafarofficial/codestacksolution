import { Linkedin, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logowhite.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const serviceLinks = [
    "Custom Software Development",
    "Cloud Solutions",
    "Mobile Development",
    "Data Engineering",
    "Cybersecurity",
    "AI & Automation",
    "UI/UX Design",
    "Web Development",
    "E-Commerce",
  ];

  const resourceLinks = ["Documentation", "Case Studies", "Support", "Contact"];

  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="CodeStackSol" className="h-10 w-auto" />
            </a>
            <p className="text-muted-foreground text-sm mb-6">
              Building innovative technology solutions for businesses worldwide.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/codestacksolution/" },
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61584920315205" },
                { icon: Instagram, href: "https://www.instagram.com/codestacksol/" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} CodeStackSol. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
