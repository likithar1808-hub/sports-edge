import { j as jsxRuntimeExports, n as useParams, o as useProduct, p as useProductReviews, k as useWishlist, i as useToggleWishlist, h as useCartState, g as useAuth, q as useAddReview, r as reactExports, b as LoadingSpinner, L as Link, P as Package, B as Badge, a as Button, l as ShoppingCart, H as Heart, m as ue } from "./index-hW5YA60z.js";
import { S as Separator } from "./separator-Bf1HTkBA.js";
import { E as ErrorMessage } from "./ErrorMessage-5ZKK7UMF.js";
import { S as Star } from "./star-_8WVkbzG.js";
import { A as ArrowLeft } from "./arrow-left-H1m7uGs5.js";
import { C as ChevronRight } from "./chevron-right-DZPQJYPr.js";
import "./index-B7Nwl-sE.js";
function StarRating({
  rating,
  maxStars = 5,
  size = 16,
  interactive = false,
  onChange
}) {
  const stars = Array.from({ length: maxStars }, (_, i) => i + 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: stars.map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: interactive ? "button" : void 0,
      onClick: interactive && onChange ? () => onChange(star) : void 0,
      disabled: !interactive,
      "aria-label": interactive ? `Rate ${star} stars` : void 0,
      className: `${interactive ? "cursor-pointer hover:scale-110 transition-smooth" : "cursor-default"} disabled:pointer-events-none`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          size,
          className: star <= Math.round(rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
        }
      )
    },
    star
  )) });
}
function ProductDetailPage() {
  var _a, _b;
  const { id } = useParams({ strict: false });
  const productId = BigInt(id);
  const { data: product, isLoading, error } = useProduct(productId);
  const { data: reviews } = useProductReviews(productId);
  const wishlistQuery = useWishlist();
  const toggleWishlist = useToggleWishlist();
  const { addToCart, isAdding } = useCartState();
  const { isAuthenticated } = useAuth();
  const addReview = useAddReview();
  const [reviewRating, setReviewRating] = reactExports.useState(5);
  const [reviewComment, setReviewComment] = reactExports.useState("");
  const [submittingReview, setSubmittingReview] = reactExports.useState(false);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  if (error || !product) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { title: "Product not found" });
  const priceINR = Number(product.price) / 100;
  const rating = Number(product.rating) / 10;
  const isWishlisted = ((_b = (_a = wishlistQuery.data) == null ? void 0 : _a.productIds) == null ? void 0 : _b.some((pid) => pid === product.id)) ?? false;
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      ue.error("Please sign in");
      return;
    }
    try {
      await addToCart(product.id, BigInt(1));
      ue.success("Added to cart!");
    } catch {
      ue.error("Failed to add to cart");
    }
  };
  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      ue.error("Please sign in");
      return;
    }
    try {
      await toggleWishlist.mutateAsync(product.id);
    } catch {
      ue.error("Error");
    }
  };
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      ue.error("Please sign in");
      return;
    }
    setSubmittingReview(true);
    try {
      await addReview.mutateAsync({
        productId: product.id,
        rating: BigInt(reviewRating),
        comment: reviewComment
      });
      setReviewComment("");
      setReviewRating(5);
      ue.success("Review submitted!");
    } catch {
      ue.error("Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "product_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/products",
        className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-smooth",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
          " Back to Products"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-xl overflow-hidden bg-muted border border-border", children: product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: product.imageUrl,
          alt: product.name,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 80 }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: product.category }),
            Number(product.stock) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "Out of Stock" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: product.brand }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mt-1", children: product.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating, size: 18 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            rating.toFixed(1),
            " (",
            Number(product.reviewCount),
            " reviews)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: product.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-4xl font-display font-black text-foreground", children: [
          "₹",
          priceINR.toLocaleString("en-IN")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 14 }),
          Number(product.stock),
          " in stock"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "flex-1 bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth",
              onClick: handleAddToCart,
              disabled: isAdding || Number(product.stock) === 0,
              "data-ocid": "product_detail.add_to_cart_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 18, className: "mr-2" }),
                Number(product.stock) === 0 ? "Out of Stock" : "Add to Cart"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              variant: "outline",
              onClick: handleToggleWishlist,
              "data-ocid": "product_detail.wishlist_button",
              className: isWishlisted ? "border-destructive text-destructive" : "",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 18, fill: isWishlisted ? "currentColor" : "none" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            size: "lg",
            "data-ocid": "product_detail.buy_now_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/checkout", children: [
              "Buy Now ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "ml-1" })
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "product_detail.reviews_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-6", children: "Customer Reviews" }),
      isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmitReview,
          className: "bg-card border border-border rounded-lg p-6 mb-8",
          "data-ocid": "product_detail.review_form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "Write a Review" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "review-rating",
                  className: "text-sm font-medium text-foreground mb-2 block",
                  children: "Rating"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "review-rating", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                StarRating,
                {
                  rating: reviewRating,
                  size: 24,
                  interactive: true,
                  onChange: setReviewRating
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: reviewComment,
                onChange: (e) => setReviewComment(e.target.value),
                placeholder: "Share your experience with this product...",
                className: "w-full p-3 rounded-md border border-input bg-background text-foreground text-sm min-h-24 resize-none focus:outline-none focus:ring-2 focus:ring-ring",
                "data-ocid": "product_detail.review_textarea",
                required: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: submittingReview,
                className: "mt-3",
                "data-ocid": "product_detail.review_submit_button",
                children: submittingReview ? "Submitting..." : "Submit Review"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: (reviews ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No reviews yet. Be the first to review!" }) : (reviews ?? []).map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-lg p-4",
          "data-ocid": `product_detail.review.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: Number(review.rating), size: 14 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(
                Number(review.timestamp) / 1e6
              ).toLocaleDateString("en-IN") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: review.comment })
          ]
        },
        review.id.toString()
      )) })
    ] })
  ] });
}
export {
  ProductDetailPage as default
};
