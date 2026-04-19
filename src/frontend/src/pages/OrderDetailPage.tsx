import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, MapPin, Package } from "lucide-react";
import { OrderStatus } from "../backend";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useOrder } from "../hooks/useBackend";

const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.Placed]: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  [OrderStatus.Processing]:
    "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  [OrderStatus.Shipped]:
    "bg-purple-500/10 text-purple-600 border-purple-500/30",
  [OrderStatus.Delivered]: "bg-green-500/10 text-green-600 border-green-500/30",
  [OrderStatus.Cancelled]: "bg-red-500/10 text-red-600 border-red-500/30",
};

export default function OrderDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { data: order, isLoading, error } = useOrder(BigInt(id));

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error || !order) return <ErrorMessage title="Order not found" />;

  const total = Number(order.total) / 100;

  return (
    <div data-ocid="order_detail.page">
      <Link
        to="/orders"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-smooth"
      >
        <ArrowLeft size={14} /> Back to Orders
      </Link>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Order #{order.id.toString()}
        </h1>
        <Badge className={`text-sm border ${statusColors[order.status]}`}>
          {order.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
              <Package size={18} /> Items Ordered
            </h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={`${item.productId.toString()}-${item.productName}`}
                  className="flex items-center justify-between"
                  data-ocid={`order_detail.item.${item.productId.toString()}`}
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {item.productName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {Number(item.quantity)} × ₹
                      {(Number(item.price) / 100).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <p className="font-bold text-foreground">
                    ₹
                    {(Number(item.price * item.quantity) / 100).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-bold text-foreground text-lg">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Address */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
              <MapPin size={18} /> Delivery Address
            </h2>
            <div className="text-sm text-foreground space-y-1">
              <p className="font-semibold">{order.deliveryAddress.fullName}</p>
              <p>{order.deliveryAddress.phone}</p>
              <p>{order.deliveryAddress.street}</p>
              <p>
                {order.deliveryAddress.city}, {order.deliveryAddress.state} -{" "}
                {order.deliveryAddress.pincode}
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
              <CreditCard size={18} /> Payment
            </h2>
            <p className="text-sm text-foreground">{order.paymentMethod}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Placed:{" "}
              {new Date(Number(order.timestamp) / 1_000_000).toLocaleString(
                "en-IN",
              )}
            </p>
            {order.couponCode && (
              <p className="text-xs text-muted-foreground mt-1">
                Coupon: {order.couponCode}
              </p>
            )}
            {Number(order.discountAmount) > 0 && (
              <p className="text-xs text-green-600 mt-1">
                Discount: -₹
                {(Number(order.discountAmount) / 100).toLocaleString("en-IN")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
