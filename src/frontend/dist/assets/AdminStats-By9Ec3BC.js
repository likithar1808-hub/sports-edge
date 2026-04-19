import { G as useAdminStats, j as jsxRuntimeExports, b as LoadingSpinner, L as Link, P as Package } from "./index-hW5YA60z.js";
import { A as ArrowLeft } from "./arrow-left-H1m7uGs5.js";
import { T as TrendingUp } from "./trending-up-ClnXgLgA.js";
import { S as ShoppingBag } from "./shopping-bag-rRFIDiuk.js";
import { U as Users } from "./users-LyZwDvIy.js";
const statusLabels = {
  placed: "Placed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled"
};
function AdminStats() {
  const { data: stats, isLoading } = useAdminStats();
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  if (!stats) return null;
  const totalRev = Number(stats.totalRevenue) / 100;
  const monthlyRev = Number(stats.monthlyRevenue) / 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.stats.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/admin",
          className: "text-muted-foreground hover:text-foreground transition-smooth",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Statistics" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [
      {
        label: "Total Revenue",
        value: `₹${totalRev.toLocaleString("en-IN")}`,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 20 }),
        sub: `₹${monthlyRev.toLocaleString("en-IN")} this month`
      },
      {
        label: "Total Products",
        value: Number(stats.totalProducts),
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 20 }),
        sub: "In catalog"
      },
      {
        label: "Total Orders",
        value: Number(stats.totalOrders),
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 20 }),
        sub: "All time"
      },
      {
        label: "Total Users",
        value: Number(stats.totalUsers),
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20 }),
        sub: "Registered"
      }
    ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-lg p-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: card.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: card.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-2xl text-foreground", children: card.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: card.sub })
        ]
      },
      card.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground mb-4", children: "Orders by Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Object.entries(stats.ordersByStatus).map(([status, count]) => {
          const total = Number(stats.totalOrders) || 1;
          const pct = Math.round(Number(count) / total * 100);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": `admin.stats.status.${status}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: statusLabels[status] ?? status }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                Number(count),
                " (",
                pct,
                "%)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-accent rounded-full transition-all",
                style: { width: `${pct}%` }
              }
            ) })
          ] }, status);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground mb-4", children: "Top Products" }),
        stats.topProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No sales data yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: stats.topProducts.slice(0, 5).map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between",
            "data-ocid": `admin.stats.top_product.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm w-5 shrink-0", children: [
                  "#",
                  i + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: product.productName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    Number(product.totalSold),
                    " sold"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground shrink-0 ml-2", children: [
                "₹",
                (Number(product.revenue) / 100).toLocaleString("en-IN")
              ] })
            ]
          },
          product.productId.toString()
        )) })
      ] })
    ] })
  ] });
}
export {
  AdminStats as default
};
