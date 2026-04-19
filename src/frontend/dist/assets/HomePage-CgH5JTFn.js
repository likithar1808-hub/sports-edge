import { c as createLucideIcon, u as useProducts, j as jsxRuntimeExports, B as Badge, a as Button, L as Link, C as Category, b as LoadingSpinner, S as Shield } from "./index-hW5YA60z.js";
import { P as ProductCard } from "./ProductCard-BiPru1-6.js";
import { S as ShoppingBag } from "./shopping-bag-rRFIDiuk.js";
import { A as ArrowRight } from "./arrow-right-BcSjNsK0.js";
import { C as ChevronRight } from "./chevron-right-DZPQJYPr.js";
import { S as Star } from "./star-_8WVkbzG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const categories = [
  {
    name: "Football",
    emoji: "⚽",
    color: "bg-green-600",
    value: Category.Football
  },
  {
    name: "Cricket",
    emoji: "🏏",
    color: "bg-amber-600",
    value: Category.Cricket
  },
  {
    name: "Basketball",
    emoji: "🏀",
    color: "bg-orange-600",
    value: Category.Basketball
  },
  {
    name: "Tennis",
    emoji: "🎾",
    color: "bg-yellow-600",
    value: Category.Tennis
  },
  {
    name: "Badminton",
    emoji: "🏸",
    color: "bg-blue-600",
    value: Category.Badminton
  }
];
const features = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 24 }),
    title: "Genuine Products",
    desc: "100% authentic equipment from top brands"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 24 }),
    title: "Fast Delivery",
    desc: "Delivered across Bangalore in 2-3 days"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 24 }),
    title: "Premium Quality",
    desc: "Curated for serious athletes and beginners alike"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 24 }),
    title: "Best Prices",
    desc: "Competitive pricing with no compromise on quality"
  }
];
function HomePage() {
  const { data: featuredProducts, isLoading } = useProducts();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[72vh] flex items-center bg-primary overflow-hidden",
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 opacity-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-10 left-10 text-[200px] leading-none select-none", children: "⚽" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 right-20 text-[150px] leading-none select-none", children: "🏏" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-10 left-1/3 text-[180px] leading-none select-none", children: "🏀" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/20 text-accent border-accent/30 mb-4 text-xs font-semibold tracking-widest uppercase", children: "Bangalore's Premier Sports Store" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "hero-text text-primary-foreground mb-4 leading-none", children: [
              "Gear Up For",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Greatness" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-lg mb-8 max-w-lg", children: "Premium sports equipment & apparel for every athlete. From football to badminton — we've got you covered." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "lg",
                  className: "bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth font-semibold",
                  "data-ocid": "home.shop_now_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18, className: "mr-2" }),
                    "Shop Now"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "outline",
                  size: "lg",
                  className: "border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 transition-smooth",
                  "data-ocid": "home.explore_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/about", children: [
                    "About Us ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "ml-2" })
                  ] })
                }
              )
            ] })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-12 bg-muted/30 border-b border-border",
        "data-ocid": "home.categories_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-heading mb-2", children: "Shop by Sport" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Find everything you need for your game" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-4", children: categories.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/products",
              search: { category: cat.name },
              "data-ocid": `home.category.item.${i + 1}`,
              className: "flex flex-col items-center gap-2 group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-20 h-20 rounded-full ${cat.color} flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-smooth`,
                    children: cat.emoji
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground group-hover:text-accent transition-smooth", children: cat.name })
              ]
            },
            cat.name
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-12 bg-background",
        "data-ocid": "home.featured_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-heading mb-1", children: "Featured Products" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Top picks from our collection" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", "data-ocid": "home.view_all_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
              "View All ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "ml-1" })
            ] }) })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid-cards", children: (featuredProducts ?? []).slice(0, 8).map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProductCard,
            {
              product,
              index: i + 1
            },
            product.id.toString()
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-12 bg-muted/30 border-t border-border",
        "data-ocid": "home.features_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: features.map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center text-center gap-3 bg-card border border-border rounded-lg p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center", children: feat.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: feat.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: feat.desc })
            ]
          },
          feat.title
        )) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-primary text-primary-foreground",
        "data-ocid": "home.cta_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-heading mb-4", children: "Visit Our Store" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 mb-2", children: "CK Nagar, Hosur Road, E-City Post, Bangalore 560100" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary-foreground/70 mb-8", children: [
            "📧 sportsedge@gmail.com  •  📸",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "https://instagram.com/sports_edge",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-accent hover:underline",
                children: "@sports_edge"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "lg",
              className: "bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth",
              "data-ocid": "home.contact_cta_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Get in Touch" })
            }
          )
        ] })
      }
    )
  ] });
}
export {
  HomePage as default
};
