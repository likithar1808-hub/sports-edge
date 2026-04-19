import { w as useMyOrders, j as jsxRuntimeExports, b as LoadingSpinner, P as Package, L as Link, B as Badge, O as OrderStatus } from "./index-hW5YA60z.js";
import { E as EmptyState } from "./EmptyState-BZ58Forp.js";
import { C as ChevronRight } from "./chevron-right-DZPQJYPr.js";
const statusColors = {
  [OrderStatus.Placed]: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  [OrderStatus.Processing]: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  [OrderStatus.Shipped]: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  [OrderStatus.Delivered]: "bg-green-500/10 text-green-600 border-green-500/30",
  [OrderStatus.Cancelled]: "bg-red-500/10 text-red-600 border-red-500/30"
};
function OrdersPage() {
  const { data: orders, isLoading } = useMyOrders();
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "orders.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-6", children: "My Orders" }),
    (orders ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 36 }),
        title: "No orders yet",
        description: "Start shopping to see your orders here",
        action: { label: "Shop Now", href: "/products" }
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [...orders ?? []].sort((a, b) => Number(b.timestamp) - Number(a.timestamp)).map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/orders/$id",
        params: { id: order.id.toString() },
        "data-ocid": `orders.item.${i + 1}`,
        className: "flex items-center justify-between bg-card border border-border rounded-lg p-5 hover:border-accent/50 transition-smooth group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-foreground", children: [
                "Order #",
                order.id.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs border ${statusColors[order.status]}`,
                  children: order.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              order.items.length,
              " item",
              order.items.length !== 1 ? "s" : "",
              " • ₹",
              (Number(order.total) / 100).toLocaleString("en-IN"),
              " •",
              " ",
              order.paymentMethod
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: new Date(
              Number(order.timestamp) / 1e6
            ).toLocaleDateString("en-IN", { dateStyle: "medium" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronRight,
            {
              size: 18,
              className: "text-muted-foreground group-hover:text-foreground transition-smooth shrink-0"
            }
          )
        ]
      },
      order.id.toString()
    )) })
  ] });
}
export {
  OrdersPage as default
};
