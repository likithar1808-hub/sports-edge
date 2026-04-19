import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PaymentMethod } from "../backend";
import type { Address } from "../backend";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { usePlaceOrder, useProducts } from "../hooks/useBackend";
import { useCartState } from "../hooks/useCart";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, isLoading } = useCartState();
  const placeOrder = usePlaceOrder();
  const { data: products } = useProducts();

  const productNameMap = new Map(
    (products ?? []).map((p) => [p.id.toString(), p.name]),
  );

  const [address, setAddress] = useState<Address>({
    fullName: "",
    phone: "",
    street: "",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.UPI,
  );
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) return <LoadingSpinner fullPage />;
  const items = cart?.items ?? [];
  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag size={36} />}
        title="Your cart is empty"
        description="Add items to cart before checking out"
        action={{ label: "Shop Now", href: "/products" }}
      />
    );
  }

  const total = Number(cart?.total ?? 0) / 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const order = await placeOrder.mutateAsync({
        deliveryAddress: address,
        paymentMethod,
        items: items.map((item) => ({
          productId: item.productId,
          productName:
            productNameMap.get(item.productId.toString()) ??
            `Product #${item.productId.toString()}`,
          quantity: item.quantity,
          price: item.price,
        })),
      });
      toast.success("Order placed successfully!");
      navigate({ to: "/orders/$id", params: { id: order.id.toString() } });
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const field = (label: string, id: keyof Address, placeholder?: string) => (
    <div>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        value={address[id]}
        onChange={(e) =>
          setAddress((prev) => ({ ...prev, [id]: e.target.value }))
        }
        placeholder={placeholder}
        required
        className="mt-1"
        data-ocid={`checkout.${id}_input`}
      />
    </div>
  );

  return (
    <div data-ocid="checkout.page">
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">
        Checkout
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display font-bold text-foreground mb-4">
                Delivery Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field("Full Name", "fullName", "Your full name")}
                {field("Phone", "phone", "10-digit mobile number")}
                {field("Street Address", "street", "House/Flat, Street, Area")}
                {field("City", "city", "City")}
                {field("State", "state", "State")}
                {field("Pincode", "pincode", "6-digit pincode")}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display font-bold text-foreground mb-4">
                Payment Method
              </h2>
              <Select
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
              >
                <SelectTrigger data-ocid="checkout.payment_method_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PaymentMethod.UPI}>UPI</SelectItem>
                  <SelectItem value={PaymentMethod.Card}>
                    Credit / Debit Card
                  </SelectItem>
                  <SelectItem value={PaymentMethod.NetBanking}>
                    Net Banking
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Payment is simulated — no real transaction occurs.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              <h2 className="font-display font-bold text-foreground mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div
                    key={item.productId.toString()}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground truncate">
                      {productNameMap.get(item.productId.toString()) ??
                        `#${item.productId.toString()}`}{" "}
                      × {Number(item.quantity)}
                    </span>
                    <span>
                      ₹
                      {(
                        Number(item.price * item.quantity) / 100
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="mb-4" />
              <div className="flex justify-between font-bold text-foreground text-lg mb-6">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
                data-ocid="checkout.place_order_button"
              >
                {submitting ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
