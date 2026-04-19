import { c as createLucideIcon, h as useCartState, u as useProducts, j as jsxRuntimeExports, b as LoadingSpinner, a as Button, L as Link } from "./index-hW5YA60z.js";
import { S as Separator } from "./separator-Bf1HTkBA.js";
import { E as EmptyState } from "./EmptyState-BZ58Forp.js";
import { S as ShoppingBag } from "./shopping-bag-rRFIDiuk.js";
import { P as Plus } from "./plus-BIT8LO49.js";
import { T as Trash2 } from "./trash-2-CJNm_G8J.js";
import { A as ArrowRight } from "./arrow-right-BcSjNsK0.js";
import "./index-B7Nwl-sE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
function CartPage() {
  const { cart, isLoading, updateQuantity, removeFromCart, isRemoving } = useCartState();
  const { data: products } = useProducts();
  const productNameMap = new Map(
    (products ?? []).map((p) => [p.id.toString(), p.name])
  );
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  const items = (cart == null ? void 0 : cart.items) ?? [];
  const total = Number((cart == null ? void 0 : cart.total) ?? 0) / 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "cart.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-6", children: "Your Cart" }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 36 }),
        title: "Your cart is empty",
        description: "Browse our products and add items to your cart",
        action: { label: "Shop Now", href: "/products" }
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-4", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-4 bg-card border border-border rounded-lg p-4",
          "data-ocid": `cart.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: productNameMap.get(item.productId.toString()) ?? `Product #${item.productId.toString()}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "₹",
                (Number(item.price) / 100).toLocaleString("en-IN"),
                " each"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => updateQuantity(item.productId, item.quantity - 1n),
                  className: "w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth",
                  "data-ocid": `cart.decrease_qty.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center font-semibold", children: Number(item.quantity) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => updateQuantity(item.productId, item.quantity + 1n),
                  className: "w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth",
                  "data-ocid": `cart.increase_qty.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground w-24 text-right", children: [
              "₹",
              (Number(item.price * item.quantity) / 100).toLocaleString(
                "en-IN"
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => removeFromCart(item.productId),
                disabled: isRemoving,
                className: "text-muted-foreground hover:text-destructive transition-smooth",
                "data-ocid": `cart.remove_item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 })
              }
            )
          ]
        },
        item.productId.toString()
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-6 sticky top-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-lg mb-4", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Subtotal (",
              items.length,
              " items)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              total.toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-medium", children: "Free" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-bold text-foreground text-lg mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "₹",
            total.toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth",
            "data-ocid": "cart.checkout_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/checkout", children: [
              "Proceed to Checkout ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "ml-2" })
            ] })
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  CartPage as default
};
