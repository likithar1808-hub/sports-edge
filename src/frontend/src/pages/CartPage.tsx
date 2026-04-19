import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useProducts } from "../hooks/useBackend";
import { useCartState } from "../hooks/useCart";

export default function CartPage() {
  const { cart, isLoading, updateQuantity, removeFromCart, isRemoving } =
    useCartState();
  const { data: products } = useProducts();

  const productNameMap = new Map(
    (products ?? []).map((p) => [p.id.toString(), p.name]),
  );

  if (isLoading) return <LoadingSpinner fullPage />;

  const items = cart?.items ?? [];
  const total = Number(cart?.total ?? 0) / 100;

  return (
    <div data-ocid="cart.page">
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={36} />}
          title="Your cart is empty"
          description="Browse our products and add items to your cart"
          action={{ label: "Shop Now", href: "/products" }}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <div
                key={item.productId.toString()}
                className="flex items-center gap-4 bg-card border border-border rounded-lg p-4"
                data-ocid={`cart.item.${i + 1}`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {productNameMap.get(item.productId.toString()) ??
                      `Product #${item.productId.toString()}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ₹{(Number(item.price) / 100).toLocaleString("en-IN")} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1n)
                    }
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                    data-ocid={`cart.decrease_qty.${i + 1}`}
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {Number(item.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1n)
                    }
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                    data-ocid={`cart.increase_qty.${i + 1}`}
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <p className="font-bold text-foreground w-24 text-right">
                  ₹
                  {(Number(item.price * item.quantity) / 100).toLocaleString(
                    "en-IN",
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.productId)}
                  disabled={isRemoving}
                  className="text-muted-foreground hover:text-destructive transition-smooth"
                  data-ocid={`cart.remove_item.${i + 1}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              <h2 className="font-display font-bold text-foreground text-lg mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-accent font-medium">Free</span>
                </div>
              </div>
              <Separator className="mb-4" />
              <div className="flex justify-between font-display font-bold text-foreground text-lg mb-6">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <Button
                asChild
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
                data-ocid="cart.checkout_button"
              >
                <Link to="/checkout">
                  Proceed to Checkout <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
