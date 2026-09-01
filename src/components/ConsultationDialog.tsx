import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitFormEmail } from "@/lib/submitFormEmail";

interface ConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConsultationDialog = ({ open, onOpenChange }: ConsultationDialogProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields before sending.",
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
      await submitFormEmail({
        type: "consultation",
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      });

      onOpenChange(false);
      setFormData({ name: "", email: "", message: "" });
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (err: unknown) {
      console.error("Send email error:", err);
      toast({
        title: "Failed to send",
        description: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Schedule a Consultation</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in your details and we'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="consult-name">Name</Label>
            <Input
              id="consult-name"
              placeholder="Your full name"
              maxLength={100}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="consult-email">Email</Label>
            <Input
              id="consult-email"
              type="email"
              placeholder="you@example.com"
              maxLength={255}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="consult-message">Message</Label>
            <Textarea
              id="consult-message"
              placeholder="Tell us about your project..."
              maxLength={1000}
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Message"}
            {!sending && <Send className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationDialog;
