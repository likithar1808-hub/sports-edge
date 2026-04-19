import { Y as useListUsers, Z as useAssignRole, j as jsxRuntimeExports, b as LoadingSpinner, L as Link, _ as UserRole, B as Badge, m as ue } from "./index-hW5YA60z.js";
import { S as Select, a as SelectTrigger, c as SelectContent, d as SelectItem } from "./select-ByzYM2Ri.js";
import { E as EmptyState } from "./EmptyState-BZ58Forp.js";
import { A as ArrowLeft } from "./arrow-left-H1m7uGs5.js";
import "./Combination-ETGZR3MA.js";
const roleColors = {
  admin: "bg-accent/10 text-accent border-accent/30",
  user: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  guest: "bg-muted text-muted-foreground border-border"
};
function AdminUsers() {
  const { data: users, isLoading } = useListUsers();
  const assignRole = useAssignRole();
  const handleRoleChange = async (user, role) => {
    try {
      await assignRole.mutateAsync({ user, role });
      ue.success("Role updated");
    } catch {
      ue.error("Failed to update role");
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.users.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/admin",
          className: "text-muted-foreground hover:text-foreground transition-smooth",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Users" })
    ] }),
    (users ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "No users yet",
        description: "Users will appear here after they sign in"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "admin.users.table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Joined" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Role" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: (users ?? []).map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "bg-card hover:bg-muted/20 transition-colors",
          "data-ocid": `admin.users.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: user.name || "Anonymous" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
                user.id.toString().slice(0, 24),
                "..."
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: new Date(
              Number(user.createdAt) / 1e6
            ).toLocaleDateString("en-IN") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                defaultValue: UserRole.user,
                onValueChange: (v) => handleRoleChange(user.id, v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-28 h-7",
                      "data-ocid": `admin.users.role_select.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: `text-xs border ${roleColors[UserRole.user]}`,
                          children: "User"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(UserRole).map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: role, children: role }, role)) })
                ]
              }
            ) })
          ]
        },
        user.id.toString()
      )) })
    ] }) })
  ] });
}
export {
  AdminUsers as default
};
