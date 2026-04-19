import { s as useNavigate, Q as useAddProduct, r as reactExports, C as Category, j as jsxRuntimeExports, L as Link, a as Button, m as ue } from "./index-hW5YA60z.js";
import { I as Input } from "./input-BXnZ_Bi7.js";
import { L as Label } from "./label-QPu_859G.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ByzYM2Ri.js";
import { T as Textarea } from "./textarea-DqvEEs3Q.js";
import { A as ArrowLeft } from "./arrow-left-H1m7uGs5.js";
import "./index-B7Nwl-sE.js";
import "./Combination-ETGZR3MA.js";
function AdminProductNew() {
  const navigate = useNavigate();
  const addProduct = useAddProduct();
  const [form, setForm] = reactExports.useState({
    name: "",
    brand: "",
    description: "",
    imageUrl: "",
    category: Category.Football,
    price: "",
    stock: ""
  });
  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct.mutateAsync({
        name: form.name,
        brand: form.brand,
        description: form.description,
        imageUrl: form.imageUrl,
        category: form.category,
        price: BigInt(Math.round(Number.parseFloat(form.price) * 100)),
        stock: BigInt(Number.parseInt(form.stock, 10))
      });
      ue.success("Product added successfully!");
      navigate({ to: "/admin/products" });
    } catch {
      ue.error("Failed to add product");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", "data-ocid": "admin.product_new.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/admin/products",
          className: "text-muted-foreground hover:text-foreground transition-smooth",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Add New Product" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "bg-card border border-border rounded-xl p-6 space-y-5",
        "data-ocid": "admin.product_new.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-sm font-medium", children: "Product Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "name",
                  value: form.name,
                  onChange: (e) => set("name", e.target.value),
                  required: true,
                  className: "mt-1",
                  "data-ocid": "admin.product_new.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "brand", className: "text-sm font-medium", children: "Brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "brand",
                  value: form.brand,
                  onChange: (e) => set("brand", e.target.value),
                  required: true,
                  className: "mt-1",
                  "data-ocid": "admin.product_new.brand_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", className: "text-sm font-medium", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "description",
                value: form.description,
                onChange: (e) => set("description", e.target.value),
                required: true,
                className: "mt-1 min-h-24 resize-none",
                "data-ocid": "admin.product_new.description_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "imageUrl", className: "text-sm font-medium", children: "Image URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "imageUrl",
                value: form.imageUrl,
                onChange: (e) => set("imageUrl", e.target.value),
                placeholder: "https://...",
                className: "mt-1",
                "data-ocid": "admin.product_new.image_url_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "category", className: "text-sm font-medium", children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.category,
                  onValueChange: (v) => set("category", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "mt-1",
                        "data-ocid": "admin.product_new.category_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(Category).map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: cat }, cat)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "price", className: "text-sm font-medium", children: "Price (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "price",
                  type: "number",
                  min: "0",
                  step: "0.01",
                  value: form.price,
                  onChange: (e) => set("price", e.target.value),
                  required: true,
                  className: "mt-1",
                  "data-ocid": "admin.product_new.price_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "stock", className: "text-sm font-medium", children: "Stock" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "stock",
                  type: "number",
                  min: "0",
                  value: form.stock,
                  onChange: (e) => set("stock", e.target.value),
                  required: true,
                  className: "mt-1",
                  "data-ocid": "admin.product_new.stock_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: addProduct.isPending,
                className: "bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth",
                "data-ocid": "admin.product_new.submit_button",
                children: addProduct.isPending ? "Adding..." : "Add Product"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate({ to: "/admin/products" }),
                "data-ocid": "admin.product_new.cancel_button",
                children: "Cancel"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  AdminProductNew as default
};
