import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Package } from "lucide-react";
import { OrderStatus } from "../backend";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useMyOrders } from "../hooks/useBackend";

const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.Placed]: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  [OrderStatus.Processing]:
    "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  [OrderStatus.Shipped]:
    "bg-purple-500/10 text-purple-600 border-purple-500/30",
  [OrderStatus.Delivered]: "bg-green-500/10 text-green-600 border-green-500/30",
  [OrderStatus.Cancelled]: "bg-red-500/10 text-red-600 border-red-500/30",
};

export default function OrdersPage() {
  const { data: orders, isLoading } = useMyOrders();

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <div data-ocid="orders.page">
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">
        My Orders
      </h1>
      {(orders ?? []).length === 0 ? (
        <EmptyState
          icon={<Package size={36} />}
          title="No orders yet"
          description="Start shopping to see your orders here"
          action={{ label: "Shop Now", href: "/products" }}
        />
      ) : (
        <div className="space-y-4">
          {[...(orders ?? [])]
            .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
            .map((order, i) => (
              <Link
                key={order.id.toString()}
                to="/orders/$id"
                params={{ id: order.id.toString() }}
                data-ocid={`orders.item.${i + 1}`}
                className="flex items-center justify-between bg-card border border-border rounded-lg p-5 hover:border-accent/50 transition-smooth group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-display font-semibold text-foreground">
                      Order #{order.id.toString()}
                    </span>
                    <Badge
                      className={`text-xs border ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""} • ₹
                    {(Number(order.total) / 100).toLocaleString("en-IN")} •{" "}
                    {order.paymentMethod}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(
                      Number(order.timestamp) / 1_000_000,
                    ).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="text-muted-foreground group-hover:text-foreground transition-smooth shrink-0"
                />
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
