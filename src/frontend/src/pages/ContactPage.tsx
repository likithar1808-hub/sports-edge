import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Instagram, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useBackend";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submitContact = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutateAsync({ name, email, message });
      setSubmitted(true);
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto" data-ocid="contact.page">
      <div className="text-center mb-10">
        <h1 className="section-heading mb-3">Contact Us</h1>
        <p className="text-muted-foreground">
          Have a question? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-card border border-border rounded-xl p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                <CheckCircle size={32} />
              </div>
              <h3 className="font-display font-bold text-foreground text-xl">
                Message Sent!
              </h3>
              <p className="text-muted-foreground text-sm">
                We'll get back to you at {email} soon.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
                data-ocid="contact.send_another_button"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="contact.form"
            >
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="mt-1"
                  data-ocid="contact.name_input"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="mt-1"
                  data-ocid="contact.email_input"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  required
                  className="mt-1 min-h-32 resize-none"
                  data-ocid="contact.message_textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={submitContact.isPending}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
                data-ocid="contact.submit_button"
              >
                {submitContact.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="bg-muted/30 border border-border rounded-xl p-6">
            <h2 className="font-display font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Visit Store
                  </p>
                  <p className="text-sm text-muted-foreground">
                    CK Nagar, Hosur Road, E-City Post
                    <br />
                    Bangalore 560100
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <a
                    href="mailto:sportsedge@gmail.com"
                    className="text-sm text-muted-foreground hover:text-accent transition-smooth"
                  >
                    sportsedge@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Instagram size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Instagram
                  </p>
                  <a
                    href="https://instagram.com/sports_edge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-accent transition-smooth"
                  >
                    @sports_edge
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary text-primary-foreground rounded-xl p-6">
            <h3 className="font-display font-bold text-lg mb-2">Store Hours</h3>
            <div className="space-y-1 text-sm text-primary-foreground/80">
              <div className="flex justify-between">
                <span>Monday – Saturday</span>
                <span>9:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>10:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
