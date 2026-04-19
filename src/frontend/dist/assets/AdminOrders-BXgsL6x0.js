import { V as useAllOrders, W as useUpdateOrderStatus, j as jsxRuntimeExports, b as LoadingSpinner, L as Link, B as Badge, O as OrderStatus, m as ue } from "./index-hW5YA60z.js";
import { S as Select, a as SelectTrigger, c as SelectContent, d as SelectItem } from "./select-ByzYM2Ri.js";
import { E as EmptyState } from "./EmptyState-BZ58Forp.js";
import { A as ArrowLeft } from "./arrow-left-H1m7uGs5.js";
import "./Combination-ETGZR3MA.js";
const statusColors = {
  [OrderStatus.Placed]: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  [OrderStatus.Processing]: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  [OrderStatus.Shipped]: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  [OrderStatus.Delivered]: "bg-green-500/10 text-green-600 border-green-500/30",
  [OrderStatus.Cancelled]: "bg-red-500/10 text-red-600 border-red-500/30"
};
function AdminOrders() {
  const { data: orders, isLoading } = useAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const handleStatusChange = async (orderId, status) => {
    try {
      await updateStatus.mutateAsync({ orderId, status });
      ue.success("Order status updated");
    } catch {
      ue.error("Failed to update status");
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.orders.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/admin",
          className: "text-muted-foreground hover:text-foreground transition-smooth",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "All Orders" })
    ] }),
    (orders ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "No orders yet",
        description: "Orders will appear here once customers place them"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "admin.orders.table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Order ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-foreground", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Payment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: [...orders ?? []].sort((a, b) => Number(b.timestamp) - Number(a.timestamp)).map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "bg-card hover:bg-muted/20 transition-colors",
          "data-ocid": `admin.orders.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-foreground", children: [
              "#",
              order.id.toString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: new Date(
              Number(order.timestamp) / 1e6
            ).toLocaleDateString("en-IN") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-medium text-foreground", children: [
              "₹",
              (Number(order.total) / 100).toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: order.paymentMethod }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: order.status,
                onValueChange: (v) => handleStatusChange(order.id, v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-36 h-7 text-xs",
                      "data-ocid": `admin.orders.status_select.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: `text-xs border mr-1 ${statusColors[order.status]}`,
                          children: order.status
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(OrderStatus).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                ]
              }
            ) })
          ]
        },
        order.id.toString()
      )) })
    ] }) })
  ] });
}
export {
  AdminOrders as default
};
