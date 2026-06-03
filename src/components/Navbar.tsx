import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logowhite.png";
import ConsultationDialog from "@/components/ConsultationDialog";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="CodeStackSol" className="h-10 w-auto" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Theme Toggle + CTA */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="default"
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
                onClick={() => setConsultOpen(true)}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile: Theme Toggle + Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="text-foreground"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <Button
                  variant="default"
                  className="bg-gradient-primary w-full"
                  onClick={() => { setConsultOpen(true); setIsOpen(false); }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <ConsultationDialog open={consultOpen} onOpenChange={setConsultOpen} />
    </>
  );
};

export default Navbar;
