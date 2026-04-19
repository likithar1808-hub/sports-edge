import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Heart,
  Home,
  Menu,
  Package,
  Search,
  Shield,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCartState } from "../hooks/useCart";

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isInitializing, isLoggingIn, isAdmin, handleLogin } =
    useAuth();
  const { itemCount } = useCartState();
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home", icon: <Home size={16} /> },
    { to: "/products", label: "Products", icon: <Search size={16} /> },
  ];

  const authLinks = isAuthenticated
    ? [
        {
          to: "/cart",
          label: "Cart",
          icon: <ShoppingCart size={16} />,
          badge: itemCount > 0 ? itemCount : undefined,
        },
        { to: "/wishlist", label: "Wishlist", icon: <Heart size={16} /> },
        { to: "/orders", label: "Orders", icon: <Package size={16} /> },
        { to: "/profile", label: "Profile", icon: <User size={16} /> },
      ]
    : [];

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <header className="header-sticky" data-ocid="navbar">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="navbar.brand_link"
          >
            <div className="flex items-center">
              <span className="text-2xl font-display font-black tracking-tight text-primary-foreground">
                SPORTS
              </span>
              <span className="text-2xl font-display font-black tracking-tight text-accent">
                &nbsp;EDGE
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`navbar.${link.label.toLowerCase()}_link`}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActive(link.to)
                    ? "bg-primary-foreground/10 text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && (
              <>
                <Link
                  to="/cart"
                  data-ocid="navbar.cart_button"
                  className="relative flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-smooth"
                >
                  <ShoppingCart size={18} />
                  <span className="hidden lg:inline">Cart</span>
                  {itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground border-0">
                      {itemCount}
                    </Badge>
                  )}
                </Link>
                <Link
                  to="/wishlist"
                  data-ocid="navbar.wishlist_button"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-smooth"
                >
                  <Heart size={18} />
                </Link>
                <Link
                  to="/orders"
                  data-ocid="navbar.orders_link"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-smooth"
                >
                  <Package size={18} />
                </Link>
                <Link
                  to="/profile"
                  data-ocid="navbar.profile_link"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-smooth"
                >
                  <User size={18} />
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    data-ocid="navbar.admin_link"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-accent hover:text-accent/80 hover:bg-primary-foreground/10 transition-smooth"
                  >
                    <Shield size={18} />
                    <span className="hidden lg:inline">Admin</span>
                  </Link>
                )}
              </>
            )}
            <Button
              onClick={handleLogin}
              disabled={isInitializing || isLoggingIn}
              data-ocid="navbar.auth_button"
              variant="outline"
              size="sm"
              className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:border-primary-foreground/50 transition-smooth disabled:opacity-50 ml-2"
            >
              {isInitializing
                ? "Loading..."
                : isLoggingIn
                  ? "Signing in..."
                  : isAuthenticated
                    ? "Sign Out"
                    : "Sign In"}
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            data-ocid="navbar.mobile_menu_toggle"
            className="md:hidden p-2 rounded-md text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-smooth"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-primary-foreground/20 bg-primary"
          data-ocid="navbar.mobile_menu"
        >
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {[...navLinks, ...authLinks].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                data-ocid={`navbar.mobile_${link.label.toLowerCase()}_link`}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth ${
                  isActive(link.to)
                    ? "bg-primary-foreground/10 text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {link.icon}
                {link.label}
                {"badge" in link && typeof link.badge === "number" && (
                  <Badge className="ml-auto bg-accent text-accent-foreground border-0 text-xs">
                    {String(link.badge)}
                  </Badge>
                )}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                data-ocid="navbar.mobile_admin_link"
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-accent hover:bg-primary-foreground/10 transition-smooth"
              >
                <Shield size={16} />
                Admin Dashboard
              </Link>
            )}
            <div className="pt-2 border-t border-primary-foreground/20">
              <Button
                onClick={() => {
                  handleLogin();
                  setMobileOpen(false);
                }}
                disabled={isInitializing || isLoggingIn}
                data-ocid="navbar.mobile_auth_button"
                variant="outline"
                size="sm"
                className="w-full border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 transition-smooth disabled:opacity-50"
              >
                {isInitializing
                  ? "Loading..."
                  : isLoggingIn
                    ? "Signing in..."
                    : isAuthenticated
                      ? "Sign Out"
                      : "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
