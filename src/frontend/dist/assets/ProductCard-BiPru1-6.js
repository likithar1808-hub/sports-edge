import { g as useAuth, h as useCartState, i as useToggleWishlist, k as useWishlist, j as jsxRuntimeExports, H as Heart, L as Link, l as ShoppingCart, B as Badge, a as Button, m as ue } from "./index-hW5YA60z.js";
import { S as Star } from "./star-_8WVkbzG.js";
function ProductCard({ product, index = 1 }) {
  var _a, _b;
  const { isAuthenticated } = useAuth();
  const { addToCart, isAdding } = useCartState();
  const toggleWishlist = useToggleWishlist();
  const wishlistQuery = useWishlist();
  const isWishlisted = ((_b = (_a = wishlistQuery.data) == null ? void 0 : _a.productIds) == null ? void 0 : _b.some((id) => id === product.id)) ?? false;
  const priceINR = Number(product.price) / 100;
  const rating = Number(product.rating) / 10;
  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      ue.error("Please sign in to add items to cart");
      return;
    }
    try {
      await addToCart(product.id, 1n);
      ue.success(`${product.name} added to cart`);
    } catch {
      ue.error("Failed to add to cart");
    }
  };
  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      ue.error("Please sign in to save items");
      return;
    }
    try {
      await toggleWishlist.mutateAsync(product.id);
    } catch {
      ue.error("Failed to update wishlist");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated group relative flex flex-col overflow-hidden",
      "data-ocid": `product.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleToggleWishlist,
            "data-ocid": `product.wishlist_toggle.${index}`,
            "aria-label": isWishlisted ? "Remove from wishlist" : "Add to wishlist",
            className: `absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full transition-smooth shadow-sm ${isWishlisted ? "bg-destructive text-destructive-foreground" : "bg-card/80 text-muted-foreground hover:text-destructive"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 16, fill: isWishlisted ? "currentColor" : "none" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/products/$id",
            params: { id: product.id.toString() },
            className: "block aspect-square overflow-hidden bg-muted",
            children: product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: product.imageUrl,
                alt: product.name,
                className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
                loading: "lazy"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 48 }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs mb-1.5", children: product.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium truncate", children: product.brand }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: product.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground leading-tight line-clamp-2 hover:text-accent transition-smooth mt-0.5", children: product.name }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 13, className: "text-yellow-500 fill-yellow-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: rating.toFixed(1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "(",
              Number(product.reviewCount),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-foreground", children: [
              "₹",
              priceINR.toLocaleString("en-IN")
            ] }),
            Number(product.stock) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-xs", children: "Out of Stock" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: handleAddToCart,
              disabled: isAdding || Number(product.stock) === 0,
              "data-ocid": `product.add_to_cart.${index}`,
              className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth text-xs font-semibold",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 13, className: "mr-1.5" }),
                Number(product.stock) === 0 ? "Out of Stock" : "Add to Cart"
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  ProductCard as P
};
