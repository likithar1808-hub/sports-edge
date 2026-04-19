import { k as useWishlist, j as jsxRuntimeExports, b as LoadingSpinner, H as Heart, o as useProduct, i as useToggleWishlist, h as useCartState, L as Link, a as Button, l as ShoppingCart, m as ue } from "./index-hW5YA60z.js";
import { E as EmptyState } from "./EmptyState-BZ58Forp.js";
import { T as Trash2 } from "./trash-2-CJNm_G8J.js";
function WishlistItem({
  productId,
  index
}) {
  const { data: product } = useProduct(productId);
  const toggleWishlist = useToggleWishlist();
  const { addToCart } = useCartState();
  if (!product) return null;
  const priceINR = Number(product.price) / 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-4 bg-card border border-border rounded-lg p-4",
      "data-ocid": `wishlist.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/products/$id",
            params: { id: product.id.toString() },
            className: "w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0",
            children: product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: product.imageUrl,
                alt: product.name,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground text-2xl", children: "🏆" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: product.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-foreground truncate hover:text-accent transition-smooth", children: product.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: product.brand }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground mt-1", children: [
            "₹",
            priceINR.toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => {
                addToCart(product.id, 1n);
                ue.success("Added to cart");
              },
              "data-ocid": `wishlist.add_to_cart.${index}`,
              className: "bg-accent text-accent-foreground hover:bg-accent/90",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 14, className: "mr-1" }),
                " Add"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => toggleWishlist.mutateAsync(product.id),
              "data-ocid": `wishlist.remove.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
            }
          )
        ] })
      ]
    }
  );
}
function WishlistPage() {
  const { data: wishlist, isLoading } = useWishlist();
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  const productIds = (wishlist == null ? void 0 : wishlist.productIds) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "wishlist.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-6", children: "Wishlist" }),
    productIds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 36 }),
        title: "Your wishlist is empty",
        description: "Save your favourite products to buy later",
        action: { label: "Browse Products", href: "/products" }
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: productIds.map((pid, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(WishlistItem, { productId: pid, index: i + 1 }, pid.toString())) })
  ] });
}
export {
  WishlistPage as default
};
