import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Shield,
  ShoppingBag,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { Category } from "../backend";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useBackend";

const categories = [
  {
    name: "Football",
    emoji: "⚽",
    color: "bg-green-600",
    value: Category.Football,
  },
  {
    name: "Cricket",
    emoji: "🏏",
    color: "bg-amber-600",
    value: Category.Cricket,
  },
  {
    name: "Basketball",
    emoji: "🏀",
    color: "bg-orange-600",
    value: Category.Basketball,
  },
  {
    name: "Tennis",
    emoji: "🎾",
    color: "bg-yellow-600",
    value: Category.Tennis,
  },
  {
    name: "Badminton",
    emoji: "🏸",
    color: "bg-blue-600",
    value: Category.Badminton,
  },
];

const features = [
  {
    icon: <Shield size={24} />,
    title: "Genuine Products",
    desc: "100% authentic equipment from top brands",
  },
  {
    icon: <Truck size={24} />,
    title: "Fast Delivery",
    desc: "Delivered across Bangalore in 2-3 days",
  },
  {
    icon: <Star size={24} />,
    title: "Premium Quality",
    desc: "Curated for serious athletes and beginners alike",
  },
  {
    icon: <Zap size={24} />,
    title: "Best Prices",
    desc: "Competitive pricing with no compromise on quality",
  },
];

export default function HomePage() {
  const { data: featuredProducts, isLoading } = useProducts();

  return (
    <div data-ocid="home.page">
      {/* Hero */}
      <section
        className="relative min-h-[72vh] flex items-center bg-primary overflow-hidden"
        data-ocid="home.hero_section"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-[200px] leading-none select-none">
            ⚽
          </div>
          <div className="absolute top-20 right-20 text-[150px] leading-none select-none">
            🏏
          </div>
          <div className="absolute bottom-10 left-1/3 text-[180px] leading-none select-none">
            🏀
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4 text-xs font-semibold tracking-widest uppercase">
              Bangalore's Premier Sports Store
            </Badge>
            <h1 className="hero-text text-primary-foreground mb-4 leading-none">
              Gear Up For
              <br />
              <span className="text-accent">Greatness</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-lg">
              Premium sports equipment & apparel for every athlete. From
              football to badminton — we've got you covered.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth font-semibold"
                data-ocid="home.shop_now_button"
              >
                <Link to="/products">
                  <ShoppingBag size={18} className="mr-2" />
                  Shop Now
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 transition-smooth"
                data-ocid="home.explore_button"
              >
                <Link to="/about">
                  About Us <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        className="py-12 bg-muted/30 border-b border-border"
        data-ocid="home.categories_section"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="section-heading mb-2">Shop by Sport</h2>
            <p className="text-muted-foreground">
              Find everything you need for your game
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                to="/products"
                search={{ category: cat.name }}
                data-ocid={`home.category.item.${i + 1}`}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`w-20 h-20 rounded-full ${cat.color} flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-smooth`}
                >
                  {cat.emoji}
                </div>
                <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-smooth">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        className="py-12 bg-background"
        data-ocid="home.featured_section"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-heading mb-1">Featured Products</h2>
              <p className="text-muted-foreground">
                Top picks from our collection
              </p>
            </div>
            <Button asChild variant="outline" data-ocid="home.view_all_button">
              <Link to="/products">
                View All <ChevronRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid-cards">
              {(featuredProducts ?? []).slice(0, 8).map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i + 1}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section
        className="py-12 bg-muted/30 border-t border-border"
        data-ocid="home.features_section"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="flex flex-col items-center text-center gap-3 bg-card border border-border rounded-lg p-6"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                  {feat.icon}
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {feat.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-16 bg-primary text-primary-foreground"
        data-ocid="home.cta_section"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-heading mb-4">Visit Our Store</h2>
          <p className="text-primary-foreground/70 mb-2">
            CK Nagar, Hosur Road, E-City Post, Bangalore 560100
          </p>
          <p className="text-primary-foreground/70 mb-8">
            📧 sportsedge@gmail.com &nbsp;•&nbsp; 📸{" "}
            <a
              href="https://instagram.com/sports_edge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              @sports_edge
            </a>
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
            data-ocid="home.contact_cta_button"
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
