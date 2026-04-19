import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { OrderStatus } from "../../backend";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useAdminStats } from "../../hooks/useBackend";

const statusLabels: Record<string, string> = {
  placed: "Placed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function AdminStats() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) return <LoadingSpinner fullPage />;
  if (!stats) return null;

  const totalRev = Number(stats.totalRevenue) / 100;
  const monthlyRev = Number(stats.monthlyRevenue) / 100;

  return (
    <div data-ocid="admin.stats.page">
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/admin"
          className="text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Statistics
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Revenue",
            value: `₹${totalRev.toLocaleString("en-IN")}`,
            icon: <TrendingUp size={20} />,
            sub: `₹${monthlyRev.toLocaleString("en-IN")} this month`,
          },
          {
            label: "Total Products",
            value: Number(stats.totalProducts),
            icon: <Package size={20} />,
            sub: "In catalog",
          },
          {
            label: "Total Orders",
            value: Number(stats.totalOrders),
            icon: <ShoppingBag size={20} />,
            sub: "All time",
          },
          {
            label: "Total Users",
            value: Number(stats.totalUsers),
            icon: <Users size={20} />,
            sub: "Registered",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-card border border-border rounded-lg p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-accent">{card.icon}</span>
              <span className="text-xs text-muted-foreground font-medium">
                {card.label}
              </span>
            </div>
            <p className="font-display font-black text-2xl text-foreground">
              {card.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Status */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display font-bold text-foreground mb-4">
            Orders by Status
          </h2>
          <div className="space-y-3">
            {Object.entries(stats.ordersByStatus).map(([status, count]) => {
              const total = Number(stats.totalOrders) || 1;
              const pct = Math.round((Number(count) / total) * 100);
              return (
                <div key={status} data-ocid={`admin.stats.status.${status}`}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">
                      {statusLabels[status] ?? status}
                    </span>
                    <span className="text-muted-foreground">
                      {Number(count)} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display font-bold text-foreground mb-4">
            Top Products
          </h2>
          {stats.topProducts.length === 0 ? (
            <p className="text-muted-foreground text-sm">No sales data yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.topProducts.slice(0, 5).map((product, i) => (
                <div
                  key={product.productId.toString()}
                  className="flex items-center justify-between"
                  data-ocid={`admin.stats.top_product.${i + 1}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-muted-foreground text-sm w-5 shrink-0">
                      #{i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {product.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Number(product.totalSold)} sold
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-foreground shrink-0 ml-2">
                    ₹{(Number(product.revenue) / 100).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
