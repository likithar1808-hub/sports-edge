import { c as createLucideIcon, g as useAuth, z as useCallerProfile, A as useSaveProfile, D as useQueryClient, r as reactExports, j as jsxRuntimeExports, b as LoadingSpinner, U as User, E as Mail, a as Button, m as ue } from "./index-hW5YA60z.js";
import { I as Input } from "./input-BXnZ_Bi7.js";
import { L as Label } from "./label-QPu_859G.js";
import "./index-B7Nwl-sE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode);
function ProfilePage() {
  const { isAuthenticated, isInitializing, handleLogin, isAdmin } = useAuth();
  const { data: profile, isLoading } = useCallerProfile();
  const saveProfile = useSaveProfile();
  const qc = useQueryClient();
  const [name, setName] = reactExports.useState((profile == null ? void 0 : profile.name) ?? "");
  const [email, setEmail] = reactExports.useState((profile == null ? void 0 : profile.email) ?? "");
  const [saving, setSaving] = reactExports.useState(false);
  if (isInitializing || isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveProfile.mutateAsync({ name, email });
      ue.success("Profile saved!");
      qc.invalidateQueries({ queryKey: ["callerUserProfile"] });
    } catch {
      ue.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-6", children: "My Profile" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-6 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 28 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg", children: (profile == null ? void 0 : profile.name) || "Sports Fan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: (profile == null ? void 0 : profile.email) || "No email set" }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full mt-1 inline-block", children: "Admin" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "name",
              className: "flex items-center gap-1.5 text-sm font-medium mb-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14 }),
                " Full Name"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Your full name",
              "data-ocid": "profile.name_input",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "email",
              className: "flex items-center gap-1.5 text-sm font-medium mb-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14 }),
                " Email Address"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "your@email.com",
              "data-ocid": "profile.email_input",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: saving,
            className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth",
            "data-ocid": "profile.save_button",
            children: saving ? "Saving..." : "Save Profile"
          }
        )
      ] })
    ] }),
    isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        onClick: handleLogin,
        className: "w-full text-destructive border-destructive/30 hover:bg-destructive/10 transition-smooth",
        "data-ocid": "profile.sign_out_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 16, className: "mr-2" }),
          " Sign Out"
        ]
      }
    )
  ] });
}
export {
  ProfilePage as default
};
