import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { ProductId } from "../backend";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {
  useProduct,
  useToggleWishlist,
  useWishlist,
} from "../hooks/useBackend";
import { useCartState } from "../hooks/useCart";

function WishlistItem({
  productId,
  index,
}: { productId: ProductId; index: number }) {
  const { data: product } = useProduct(productId);
  const toggleWishlist = useToggleWishlist();
  const { addToCart } = useCartState();

  if (!product) return null;
  const priceINR = Number(product.price) / 100;

  return (
    <div
      className="flex items-center gap-4 bg-card border border-border rounded-lg p-4"
      data-ocid={`wishlist.item.${index}`}
    >
      <Link
        to="/products/$id"
        params={{ id: product.id.toString() }}
        className="w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0"
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl">
            🏆
          </div>
        )}
      </Link>
      <div className="flex-1 min-w-0">
        <Link to="/products/$id" params={{ id: product.id.toString() }}>
          <h3 className="font-medium text-foreground truncate hover:text-accent transition-smooth">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">{product.brand}</p>
        <p className="font-bold text-foreground mt-1">
          ₹{priceINR.toLocaleString("en-IN")}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => {
            addToCart(product.id, 1n);
            toast.success("Added to cart");
          }}
          data-ocid={`wishlist.add_to_cart.${index}`}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <ShoppingCart size={14} className="mr-1" /> Add
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => toggleWishlist.mutateAsync(product.id)}
          data-ocid={`wishlist.remove.${index}`}
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const { data: wishlist, isLoading } = useWishlist();

  if (isLoading) return <LoadingSpinner fullPage />;

  const productIds = wishlist?.productIds ?? [];

  return (
    <div data-ocid="wishlist.page">
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">
        Wishlist
      </h1>
      {productIds.length === 0 ? (
        <EmptyState
          icon={<Heart size={36} />}
          title="Your wishlist is empty"
          description="Save your favourite products to buy later"
          action={{ label: "Browse Products", href: "/products" }}
        />
      ) : (
        <div className="space-y-4">
          {productIds.map((pid, i) => (
            <WishlistItem key={pid.toString()} productId={pid} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
