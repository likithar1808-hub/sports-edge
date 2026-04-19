import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Mail,
  MapPin,
  ShoppingBag,
  Star,
  Trophy,
  Users,
} from "lucide-react";

const stats = [
  { icon: <Trophy size={24} />, value: "5+", label: "Sports Categories" },
  { icon: <ShoppingBag size={24} />, value: "500+", label: "Products" },
  { icon: <Users size={24} />, value: "1000+", label: "Happy Customers" },
  { icon: <Star size={24} />, value: "4.8", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <div data-ocid="about.page">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="section-heading mb-4">About Sports Edge</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bangalore's premier destination for premium sports equipment and
            athletic gear. We're passionate about helping every athlete perform
            at their best.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-lg p-6 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3">
                {stat.icon}
              </div>
              <p className="font-display font-black text-2xl text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="bg-muted/30 border border-border rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Our Story
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Sports Edge was founded with a simple mission: to make premium
              sports equipment accessible to every athlete in Bangalore. Whether
              you're a weekend warrior or a professional player, we believe you
              deserve the best gear for your game.
            </p>
            <p>
              Located in CK Nagar, Hosur Road, E-City Post, we serve athletes
              from across Bangalore with a carefully curated selection of
              Football, Cricket, Basketball, Tennis, and Badminton equipment
              from world-class brands.
            </p>
            <p>
              We partner with leading brands to bring you genuine products at
              competitive prices, backed by our expert team who can help you
              find exactly what you need to elevate your game.
            </p>
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-card border border-border rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            Find Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">
                  Store Location
                </p>
                <p className="text-sm text-muted-foreground">
                  CK Nagar, Hosur Road
                  <br />
                  E-City Post, Bangalore 560100
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Email Us</p>
                <a
                  href="mailto:sportsedge@gmail.com"
                  className="text-sm text-muted-foreground hover:text-accent transition-smooth"
                >
                  sportsedge@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <Instagram size={18} />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Follow Us</p>
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

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
            data-ocid="about.shop_now_button"
          >
            <Link to="/products">Shop Our Collection</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
