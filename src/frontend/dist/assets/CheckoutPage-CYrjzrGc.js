import { s as useNavigate, h as useCartState, t as usePlaceOrder, u as useProducts, r as reactExports, v as PaymentMethod, j as jsxRuntimeExports, b as LoadingSpinner, a as Button, m as ue } from "./index-hW5YA60z.js";
import { I as Input } from "./input-BXnZ_Bi7.js";
import { L as Label } from "./label-QPu_859G.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ByzYM2Ri.js";
import { S as Separator } from "./separator-Bf1HTkBA.js";
import { E as EmptyState } from "./EmptyState-BZ58Forp.js";
import { S as ShoppingBag } from "./shopping-bag-rRFIDiuk.js";
import "./index-B7Nwl-sE.js";
import "./Combination-ETGZR3MA.js";
function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, isLoading } = useCartState();
  const placeOrder = usePlaceOrder();
  const { data: products } = useProducts();
  const productNameMap = new Map(
    (products ?? []).map((p) => [p.id.toString(), p.name])
  );
  const [address, setAddress] = reactExports.useState({
    fullName: "",
    phone: "",
    street: "",
    city: "Bangalore",
    state: "Karnataka",
    pincode: ""
  });
  const [paymentMethod, setPaymentMethod] = reactExports.useState(
    PaymentMethod.UPI
  );
  const [submitting, setSubmitting] = reactExports.useState(false);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { fullPage: true });
  const items = (cart == null ? void 0 : cart.items) ?? [];
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 36 }),
        title: "Your cart is empty",
        description: "Add items to cart before checking out",
        action: { label: "Shop Now", href: "/products" }
      }
    );
  }
  const total = Number((cart == null ? void 0 : cart.total) ?? 0) / 100;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const order = await placeOrder.mutateAsync({
        deliveryAddress: address,
        paymentMethod,
        items: items.map((item) => ({
          productId: item.productId,
          productName: productNameMap.get(item.productId.toString()) ?? `Product #${item.productId.toString()}`,
          quantity: item.quantity,
          price: item.price
        }))
      });
      ue.success("Order placed successfully!");
      navigate({ to: "/orders/$id", params: { id: order.id.toString() } });
    } catch {
      ue.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  const field = (label, id, placeholder) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, className: "text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id,
        value: address[id],
        onChange: (e) => setAddress((prev) => ({ ...prev, [id]: e.target.value })),
        placeholder,
        required: true,
        className: "mt-1",
        "data-ocid": `checkout.${id}_input`
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "checkout.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-6", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground mb-4", children: "Delivery Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            field("Full Name", "fullName", "Your full name"),
            field("Phone", "phone", "10-digit mobile number"),
            field("Street Address", "street", "House/Flat, Street, Area"),
            field("City", "city", "City"),
            field("State", "state", "State"),
            field("Pincode", "pincode", "6-digit pincode")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground mb-4", children: "Payment Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: paymentMethod,
              onValueChange: (v) => setPaymentMethod(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "checkout.payment_method_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMethod.UPI, children: "UPI" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMethod.Card, children: "Credit / Debit Card" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PaymentMethod.NetBanking, children: "Net Banking" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Payment is simulated — no real transaction occurs." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-6 sticky top-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground mb-4", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground truncate", children: [
                productNameMap.get(item.productId.toString()) ?? `#${item.productId.toString()}`,
                " ",
                "× ",
                Number(item.quantity)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                (Number(item.price * item.quantity) / 100).toLocaleString("en-IN")
              ] })
            ]
          },
          item.productId.toString()
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground text-lg mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "₹",
            total.toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: submitting,
            className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth",
            "data-ocid": "checkout.place_order_button",
            children: submitting ? "Placing Order..." : "Place Order"
          }
        )
      ] }) })
    ] }) })
  ] });
}
export {
  CheckoutPage as default
};
