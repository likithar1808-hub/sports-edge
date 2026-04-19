import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { useToggleWishlist, useWishlist } from "../hooks/useBackend";
import { useCartState } from "../hooks/useCart";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 1 }: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const { addToCart, isAdding } = useCartState();
  const toggleWishlist = useToggleWishlist();
  const wishlistQuery = useWishlist();

  const isWishlisted =
    wishlistQuery.data?.productIds?.some((id) => id === product.id) ?? false;
  const priceINR = Number(product.price) / 100;
  const rating = Number(product.rating) / 10;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart");
      return;
    }
    try {
      await addToCart(product.id, 1n);
      toast.success(`${product.name} added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please sign in to save items");
      return;
    }
    try {
      await toggleWishlist.mutateAsync(product.id);
    } catch {
      toast.error("Failed to update wishlist");
    }
  };

  return (
    <div
      className="card-elevated group relative flex flex-col overflow-hidden"
      data-ocid={`product.item.${index}`}
    >
      {/* Wishlist button */}
      <button
        type="button"
        onClick={handleToggleWishlist}
        data-ocid={`product.wishlist_toggle.${index}`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full transition-smooth shadow-sm ${
          isWishlisted
            ? "bg-destructive text-destructive-foreground"
            : "bg-card/80 text-muted-foreground hover:text-destructive"
        }`}
      >
        <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      {/* Image */}
      <Link
        to="/products/$id"
        params={{ id: product.id.toString() }}
        className="block aspect-square overflow-hidden bg-muted"
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingCart size={48} />
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <div>
          <Badge variant="secondary" className="text-xs mb-1.5">
            {product.category}
          </Badge>
          <p className="text-xs text-muted-foreground font-medium truncate">
            {product.brand}
          </p>
          <Link to="/products/$id" params={{ id: product.id.toString() }}>
            <h3 className="font-display font-semibold text-sm text-foreground leading-tight line-clamp-2 hover:text-accent transition-smooth mt-0.5">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-1 mt-auto">
          <Star size={13} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-medium text-foreground">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            ({Number(product.reviewCount)})
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="font-display font-bold text-foreground">
            ₹{priceINR.toLocaleString("en-IN")}
          </span>
          {Number(product.stock) === 0 && (
            <Badge variant="destructive" className="text-xs">
              Out of Stock
            </Badge>
          )}
        </div>

        <Button
          size="sm"
          onClick={handleAddToCart}
          disabled={isAdding || Number(product.stock) === 0}
          data-ocid={`product.add_to_cart.${index}`}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth text-xs font-semibold"
        >
          <ShoppingCart size={13} className="mr-1.5" />
          {Number(product.stock) === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
