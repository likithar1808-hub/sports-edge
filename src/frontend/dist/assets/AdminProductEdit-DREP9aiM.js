import { n as useParams, s as useNavigate, o as useProduct, R as useUpdateProduct, r as reactExports, C as Category, j as jsxRuntimeExports, b as LoadingSpinner, L as Link, a as Button, m as ue } from "./index-hW5YA60z.js";
import { I as Input } from "./input-BXnZ_Bi7.js";
import { L as Label } from "./label-QPu_859G.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ByzYM2Ri.js";
import { T as Textarea } from "./textarea-DqvEEs3Q.js";
import { A as ArrowLeft } from "./arrow-left-H1m7uGs5.js";
import "./index-B7Nwl-sE.js";
import "./Combination-ETGZR3MA.js";
function AdminProductEdit() {
  const { id } = useParams({ strict: false });
  const productId = BigInt(id);
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(productId);
  const updateProduct = useUpdateProduct();
  const [form, setForm] = reactExports.useState({
    name: "",
    brand: "",
    description: "",
    imageUrl: "",
    category: Category.Football,
    price: "",
    stock: ""
  });
  reactExports.useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        brand: product.brand,
        description: product.description,
        imageUrl: product.imageUrl,
        category: product.category,
        price: (Number(product.price) / 100).toString(),
        stock: Number(product.stock).toString()
      });
    }
  }, [product]);
  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct.mutateAsync({
        id: productId,
        name: form.name,
        brand: form.brand,
        description: form.description,
        imageUrl: form.imageUrl,
        category: form.category,
        price: BigInt(Math.round(Number.parseFloat(form.price) * 100)),
        stock: BigInt(Number.parseInt(form.stock, 10))
      });
      ue.success("Product updated!");
      navigate({ to: "/admin/products" });
    } catch {
      ue.error("Failed to update product");
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", "data-ocid": "admin.product_edit.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/admin/products",
          className: "text-muted-foreground hover:text-foreground transition-smooth",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Edit Product" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "bg-card border border-border rounded-xl p-6 space-y-5",
        "data-ocid": "admin.product_edit.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-name", className: "text-sm font-medium", children: "Product Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-name",
                  value: form.name,
                  onChange: (e) => set("name", e.target.value),
                  required: true,
                  className: "mt-1",
                  "data-ocid": "admin.product_edit.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-brand", className: "text-sm font-medium", children: "Brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-brand",
                  value: form.brand,
                  onChange: (e) => set("brand", e.target.value),
                  required: true,
                  className: "mt-1",
                  "data-ocid": "admin.product_edit.brand_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-description", className: "text-sm font-medium", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "edit-description",
                value: form.description,
                onChange: (e) => set("description", e.target.value),
                required: true,
                className: "mt-1 min-h-24 resize-none",
                "data-ocid": "admin.product_edit.description_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-imageUrl", className: "text-sm font-medium", children: "Image URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-imageUrl",
                value: form.imageUrl,
                onChange: (e) => set("imageUrl", e.target.value),
                className: "mt-1",
                "data-ocid": "admin.product_edit.image_url_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-category", className: "text-sm font-medium", children: "Category" }),
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
                        "data-ocid": "admin.product_edit.category_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(Category).map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: cat }, cat)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-price", className: "text-sm font-medium", children: "Price (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-price",
                  type: "number",
                  min: "0",
                  step: "0.01",
                  value: form.price,
                  onChange: (e) => set("price", e.target.value),
                  required: true,
                  className: "mt-1",
                  "data-ocid": "admin.product_edit.price_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-stock", className: "text-sm font-medium", children: "Stock" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-stock",
                  type: "number",
                  min: "0",
                  value: form.stock,
                  onChange: (e) => set("stock", e.target.value),
                  required: true,
                  className: "mt-1",
                  "data-ocid": "admin.product_edit.stock_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: updateProduct.isPending,
                className: "bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth",
                "data-ocid": "admin.product_edit.submit_button",
                children: updateProduct.isPending ? "Saving..." : "Save Changes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate({ to: "/admin/products" }),
                "data-ocid": "admin.product_edit.cancel_button",
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
  AdminProductEdit as default
};
