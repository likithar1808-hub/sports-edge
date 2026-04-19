import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { OrderStatus } from "../../backend";
import { EmptyState } from "../../components/EmptyState";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useAllOrders, useUpdateOrderStatus } from "../../hooks/useBackend";

const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.Placed]: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  [OrderStatus.Processing]:
    "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  [OrderStatus.Shipped]:
    "bg-purple-500/10 text-purple-600 border-purple-500/30",
  [OrderStatus.Delivered]: "bg-green-500/10 text-green-600 border-green-500/30",
  [OrderStatus.Cancelled]: "bg-red-500/10 text-red-600 border-red-500/30",
};

export default function AdminOrders() {
  const { data: orders, isLoading } = useAllOrders();
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (orderId: bigint, status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ orderId, status });
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <div data-ocid="admin.orders.page">
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/admin"
          className="text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-display font-bold text-foreground">
          All Orders
        </h1>
      </div>

      {(orders ?? []).length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="Orders will appear here once customers place them"
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm" data-ocid="admin.orders.table">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Order ID
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Date
                </th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">
                  Total
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Payment
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...(orders ?? [])]
                .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
                .map((order, i) => (
                  <tr
                    key={order.id.toString()}
                    className="bg-card hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.orders.item.${i + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-foreground">
                      #{order.id.toString()}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(
                        Number(order.timestamp) / 1_000_000,
                      ).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">
                      ₹{(Number(order.total) / 100).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {order.paymentMethod}
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={order.status}
                        onValueChange={(v) =>
                          handleStatusChange(order.id, v as OrderStatus)
                        }
                      >
                        <SelectTrigger
                          className="w-36 h-7 text-xs"
                          data-ocid={`admin.orders.status_select.${i + 1}`}
                        >
                          <Badge
                            className={`text-xs border mr-1 ${statusColors[order.status]}`}
                          >
                            {order.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(OrderStatus).map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
