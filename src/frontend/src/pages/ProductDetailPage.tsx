import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  Package,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { StarRating } from "../components/StarRating";
import { useAuth } from "../hooks/useAuth";
import {
  useAddReview,
  useProduct,
  useProductReviews,
  useToggleWishlist,
  useWishlist,
} from "../hooks/useBackend";
import { useCartState } from "../hooks/useCart";

export default function ProductDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const productId = BigInt(id);

  const { data: product, isLoading, error } = useProduct(productId);
  const { data: reviews } = useProductReviews(productId);
  const wishlistQuery = useWishlist();
  const toggleWishlist = useToggleWishlist();
  const { addToCart, isAdding } = useCartState();
  const { isAuthenticated } = useAuth();
  const addReview = useAddReview();

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error || !product) return <ErrorMessage title="Product not found" />;

  const priceINR = Number(product.price) / 100;
  const rating = Number(product.rating) / 10;
  const isWishlisted =
    wishlistQuery.data?.productIds?.some((pid) => pid === product.id) ?? false;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in");
      return;
    }
    try {
      await addToCart(product.id, BigInt(1));
      toast.success("Added to cart!");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in");
      return;
    }
    try {
      await toggleWishlist.mutateAsync(product.id);
    } catch {
      toast.error("Error");
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please sign in");
      return;
    }
    setSubmittingReview(true);
    try {
      await addReview.mutateAsync({
        productId: product.id,
        rating: BigInt(reviewRating),
        comment: reviewComment,
      });
      setReviewComment("");
      setReviewRating(5);
      toast.success("Review submitted!");
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div data-ocid="product_detail.page">
      <Link
        to="/products"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-smooth"
      >
        <ArrowLeft size={14} /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {/* Image */}
        <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Package size={80} />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              {Number(product.stock) === 0 && (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              {product.brand}
            </p>
            <h1 className="text-3xl font-display font-bold text-foreground mt-1">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <StarRating rating={rating} size={18} />
            <span className="text-sm text-muted-foreground">
              {rating.toFixed(1)} ({Number(product.reviewCount)} reviews)
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="text-4xl font-display font-black text-foreground">
            ₹{priceINR.toLocaleString("en-IN")}
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Package size={14} />
            {Number(product.stock)} in stock
          </p>

          <Separator />

          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
              onClick={handleAddToCart}
              disabled={isAdding || Number(product.stock) === 0}
              data-ocid="product_detail.add_to_cart_button"
            >
              <ShoppingCart size={18} className="mr-2" />
              {Number(product.stock) === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleToggleWishlist}
              data-ocid="product_detail.wishlist_button"
              className={
                isWishlisted ? "border-destructive text-destructive" : ""
              }
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
            </Button>
          </div>

          <Button
            asChild
            variant="outline"
            size="lg"
            data-ocid="product_detail.buy_now_button"
          >
            <Link to="/checkout">
              Buy Now <ChevronRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Reviews */}
      <Separator className="mb-8" />
      <div data-ocid="product_detail.reviews_section">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">
          Customer Reviews
        </h2>

        {isAuthenticated && (
          <form
            onSubmit={handleSubmitReview}
            className="bg-card border border-border rounded-lg p-6 mb-8"
            data-ocid="product_detail.review_form"
          >
            <h3 className="font-display font-semibold text-foreground mb-4">
              Write a Review
            </h3>
            <div className="mb-3">
              <label
                htmlFor="review-rating"
                className="text-sm font-medium text-foreground mb-2 block"
              >
                Rating
              </label>
              <div id="review-rating">
                <StarRating
                  rating={reviewRating}
                  size={24}
                  interactive
                  onChange={setReviewRating}
                />
              </div>
            </div>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full p-3 rounded-md border border-input bg-background text-foreground text-sm min-h-24 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="product_detail.review_textarea"
              required
            />
            <Button
              type="submit"
              disabled={submittingReview}
              className="mt-3"
              data-ocid="product_detail.review_submit_button"
            >
              {submittingReview ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        )}

        <div className="space-y-4">
          {(reviews ?? []).length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            (reviews ?? []).map((review, i) => (
              <div
                key={review.id.toString()}
                className="bg-card border border-border rounded-lg p-4"
                data-ocid={`product_detail.review.item.${i + 1}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <StarRating rating={Number(review.rating)} size={14} />
                  <span className="text-xs text-muted-foreground">
                    {new Date(
                      Number(review.timestamp) / 1_000_000,
                    ).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <p className="text-sm text-foreground">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
