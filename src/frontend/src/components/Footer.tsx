import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin } from "lucide-react";
import { SiInstagram } from "react-icons/si";

const currentYear = new Date().getFullYear();
const hostname =
  typeof window !== "undefined" ? window.location.hostname : "sportsedge.app";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border" data-ocid="footer">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-baseline gap-0 mb-3">
              <span className="text-xl font-display font-black tracking-tight text-foreground">
                SPORTS
              </span>
              <span className="text-xl font-display font-black tracking-tight text-accent">
                &nbsp;EDGE
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium sports equipment for every athlete. Gear up for greatness.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://instagram.com/sports_edge"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.instagram_link"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-smooth text-sm"
                aria-label="Sports Edge on Instagram"
              >
                <SiInstagram size={18} />
                <span>@sports_edge</span>
              </a>
            </div>
          </div>

          {/* Store Info */}
          <div className="md:col-span-1">
            <h3 className="font-display font-semibold text-foreground mb-3 label-uppercase">
              Store
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  CK Nagar, Hosur Road,
                  <br />
                  E-City Post, Bangalore 560100
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={15} className="shrink-0 text-accent" />
                <a
                  href="mailto:sportsedge@gmail.com"
                  className="hover:text-foreground transition-smooth"
                >
                  sportsedge@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Instagram size={15} className="shrink-0 text-accent" />
                <a
                  href="https://instagram.com/sports_edge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-smooth"
                >
                  @sports_edge
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-display font-semibold text-foreground mb-3 label-uppercase">
              Shop
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/products", label: "All Products" },
                { to: "/products?category=Football", label: "Football" },
                { to: "/products?category=Cricket", label: "Cricket" },
                { to: "/products?category=Basketball", label: "Basketball" },
                { to: "/products?category=Tennis", label: "Tennis" },
                { to: "/products?category=Badminton", label: "Badminton" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    data-ocid={`footer.${link.label.toLowerCase().replace(/ /g, "_")}_link`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="md:col-span-1">
            <h3 className="font-display font-semibold text-foreground mb-3 label-uppercase">
              Help
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact Us" },
                { to: "/orders", label: "Track Order" },
                { to: "/profile", label: "My Account" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    data-ocid={`footer.${link.label.toLowerCase().replace(/ /g, "_")}_link`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Sports Edge. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-smooth underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
