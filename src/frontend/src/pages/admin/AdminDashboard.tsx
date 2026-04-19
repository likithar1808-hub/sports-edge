import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useAdminStats } from "../../hooks/useBackend";

const adminNav = [
  {
    to: "/admin/stats",
    icon: <BarChart2 size={20} />,
    label: "Statistics",
    desc: "Revenue & analytics",
  },
  {
    to: "/admin/products",
    icon: <Package size={20} />,
    label: "Products",
    desc: "Manage inventory",
  },
  {
    to: "/admin/orders",
    icon: <ShoppingBag size={20} />,
    label: "Orders",
    desc: "View & update orders",
  },
  {
    to: "/admin/users",
    icon: <Users size={20} />,
    label: "Users",
    desc: "Manage users & roles",
  },
];

export default function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats();

  return (
    <div data-ocid="admin.dashboard.page">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Sports Edge management panel
          </p>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Total Products",
                value: Number(stats.totalProducts),
                icon: <Package size={20} />,
              },
              {
                label: "Total Orders",
                value: Number(stats.totalOrders),
                icon: <ShoppingBag size={20} />,
              },
              {
                label: "Total Users",
                value: Number(stats.totalUsers),
                icon: <Users size={20} />,
              },
              {
                label: "Monthly Revenue",
                value: `₹${(Number(stats.monthlyRevenue) / 100).toLocaleString("en-IN")}`,
                icon: <TrendingUp size={20} />,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-lg p-5"
              >
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <span className="text-accent">{stat.icon}</span>
                  <span className="text-xs font-medium">{stat.label}</span>
                </div>
                <p className="font-display font-black text-2xl text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        )
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminNav.map((nav) => (
          <Link
            key={nav.to}
            to={nav.to}
            data-ocid={`admin.nav.${nav.label.toLowerCase()}_link`}
          >
            <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 hover:shadow-md transition-smooth group h-full">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                {nav.icon}
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">
                {nav.label}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{nav.desc}</p>
              <div className="flex items-center text-xs text-accent font-medium">
                Manage <ArrowRight size={12} className="ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
