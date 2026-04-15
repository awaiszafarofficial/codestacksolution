import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const allServices = [
  "AI Automation & Intelligent Systems",
  "Custom AI & Software Development",
  "SaaS Product Development",
  "Cloud & DevOps Engineering",
  "Data Engineering & AI Analytics",
  "UX/UI & Product Design",
  "Web Development & CMS",
  "Mobile App Development",
  "E-Commerce Development",
  "DevOps & Infrastructure Automation",
  "Maintenance & Support",
  "Staff Augmentation",
  "Cybersecurity & Compliance",
  "API Development & Integrations",
  "AI Consulting & Strategy",
  "Branding & Creative Design",
];

const resourceOptions = ["1", "2", "3", "4", "5", "6-10", "10+"];
const experienceOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

interface ServiceInquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService: string;
}

const ServiceInquiryDialog = ({ open, onOpenChange, selectedService }: ServiceInquiryDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDetail: "",
    resources: "",
    experience: "3",
    service: selectedService,
  });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  // Sync selectedService when dialog opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedDetail = formData.projectDetail.trim();

    if (!trimmedName || !trimmedEmail || !trimmedDetail || !formData.resources || !formData.service) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-email", {
        body: {
          type: "service-inquiry",
          name: trimmedName,
          email: trimmedEmail,
          service: formData.service,
          resources: formData.resources,
          experience: formData.experience,
          projectDetail: trimmedDetail,
        },
      });

      if (error) throw error;

      onOpenChange(false);
      setFormData({ name: "", email: "", projectDetail: "", resources: "", experience: "3", service: "" });
      toast({
        title: "Inquiry submitted!",
        description: "We'll get back to you shortly.",
      });
    } catch (err: any) {
      console.error("Send email error:", err);
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg bg-background border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Service Inquiry</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tell us about your project and we'll get back to you shortly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="inquiry-name">Full Name *</Label>
            <Input
              id="inquiry-name"
              placeholder="Your full name"
              maxLength={100}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiry-email">Email *</Label>
            <Input
              id="inquiry-email"
              type="email"
              placeholder="you@example.com"
              maxLength={255}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiry-service">Service *</Label>
            <Select
              value={formData.service}
              onValueChange={(value) => setFormData({ ...formData, service: value })}
            >
              <SelectTrigger id="inquiry-service">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-[100]">
                {allServices.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiry-resources">How Many Resources *</Label>
            <Select
              value={formData.resources}
              onValueChange={(value) => setFormData({ ...formData, resources: value })}
            >
              <SelectTrigger id="inquiry-resources">
                <SelectValue placeholder="Select number of resources" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-[100]">
                {resourceOptions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiry-experience">Total Years of Experience</Label>
            <Select
              value={formData.experience}
              onValueChange={(value) => setFormData({ ...formData, experience: value })}
            >
              <SelectTrigger id="inquiry-experience">
                <SelectValue placeholder="Select years" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-[100]">
                {experienceOptions.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y} {y === "1" ? "year" : "years"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiry-detail">Project Details *</Label>
            <Textarea
              id="inquiry-detail"
              placeholder="Describe your project requirements..."
              maxLength={2000}
              rows={4}
              value={formData.projectDetail}
              onChange={(e) => setFormData({ ...formData, projectDetail: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            disabled={sending}
          >
            {sending ? "Sending..." : "Submit Inquiry"}
            {!sending && <Send className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceInquiryDialog;
