import { c as createLucideIcon, n as useParams, x as useOrder, j as jsxRuntimeExports, b as LoadingSpinner, L as Link, B as Badge, P as Package, M as MapPin, O as OrderStatus } from "./index-hW5YA60z.js";
import { S as Separator } from "./separator-Bf1HTkBA.js";
import { E as ErrorMessage } from "./ErrorMessage-5ZKK7UMF.js";
import { A as ArrowLeft } from "./arrow-left-H1m7uGs5.js";
import "./index-B7Nwl-sE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
const statusColors = {
  [OrderStatus.Placed]: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  [OrderStatus.Processing]: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  [OrderStatus.Shipped]: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  [OrderStatus.Delivered]: "bg-green-500/10 text-green-600 border-green-500/30",
  [OrderStatus.Cancelled]: "bg-red-500/10 text-red-600 border-red-500/30"
};
function OrderDetailPage() {
  const { id } = useParams({ strict: false });
  const { data: order, isLoading, error } = useOrder(BigInt(id));
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  if (error || !order) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { title: "Order not found" });
  const total = Number(order.total) / 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "order_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/orders",
        className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-smooth",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
          " Back to Orders"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-display font-bold text-foreground", children: [
        "Order #",
        order.id.toString()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-sm border ${statusColors[order.status]}`, children: order.status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 18 }),
            " Items Ordered"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: order.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between",
              "data-ocid": `order_detail.item.${item.productId.toString()}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: item.productName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    "Qty: ",
                    Number(item.quantity),
                    " × ₹",
                    (Number(item.price) / 100).toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground", children: [
                  "₹",
                  (Number(item.price * item.quantity) / 100).toLocaleString(
                    "en-IN"
                  )
                ] })
              ]
            },
            `${item.productId.toString()}-${item.productName}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground text-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₹",
              total.toLocaleString("en-IN")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18 }),
            " Delivery Address"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: order.deliveryAddress.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.deliveryAddress.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.deliveryAddress.street }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              order.deliveryAddress.city,
              ", ",
              order.deliveryAddress.state,
              " -",
              " ",
              order.deliveryAddress.pincode
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 18 }),
          " Payment"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: order.paymentMethod }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          "Placed:",
          " ",
          new Date(Number(order.timestamp) / 1e6).toLocaleString(
            "en-IN"
          )
        ] }),
        order.couponCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          "Coupon: ",
          order.couponCode
        ] }),
        Number(order.discountAmount) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-600 mt-1", children: [
          "Discount: -₹",
          (Number(order.discountAmount) / 100).toLocaleString("en-IN")
        ] })
      ] }) })
    ] })
  ] });
}
export {
  OrderDetailPage as default
};
