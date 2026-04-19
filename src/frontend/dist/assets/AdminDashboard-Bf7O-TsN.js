import { c as createLucideIcon, G as useAdminStats, j as jsxRuntimeExports, b as LoadingSpinner, P as Package, L as Link } from "./index-hW5YA60z.js";
import { S as ShoppingBag } from "./shopping-bag-rRFIDiuk.js";
import { U as Users } from "./users-LyZwDvIy.js";
import { T as TrendingUp } from "./trending-up-ClnXgLgA.js";
import { A as ArrowRight } from "./arrow-right-BcSjNsK0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode);
const adminNav = [
  {
    to: "/admin/stats",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { size: 20 }),
    label: "Statistics",
    desc: "Revenue & analytics"
  },
  {
    to: "/admin/products",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 20 }),
    label: "Products",
    desc: "Manage inventory"
  },
  {
    to: "/admin/orders",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 20 }),
    label: "Orders",
    desc: "View & update orders"
  },
  {
    to: "/admin/users",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20 }),
    label: "Users",
    desc: "Manage users & roles"
  }
];
function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Admin Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Sports Edge management panel" })
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : stats && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: [
      {
        label: "Total Products",
        value: Number(stats.totalProducts),
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 20 })
      },
      {
        label: "Total Orders",
        value: Number(stats.totalOrders),
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 20 })
      },
      {
        label: "Total Users",
        value: Number(stats.totalUsers),
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20 })
      },
      {
        label: "Monthly Revenue",
        value: `₹${(Number(stats.monthlyRevenue) / 100).toLocaleString("en-IN")}`,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 20 })
      }
    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-lg p-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: stat.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: stat.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-2xl text-foreground", children: stat.value })
        ]
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: adminNav.map((nav) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: nav.to,
        "data-ocid": `admin.nav.${nav.label.toLowerCase()}_link`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 hover:border-accent/50 hover:shadow-md transition-smooth group h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-smooth", children: nav.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: nav.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: nav.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs text-accent font-medium", children: [
            "Manage ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12, className: "ml-1" })
          ] })
        ] })
      },
      nav.to
    )) })
  ] });
}
export {
  AdminDashboard as default
};
