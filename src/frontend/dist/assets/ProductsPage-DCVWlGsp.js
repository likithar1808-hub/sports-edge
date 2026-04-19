import { c as createLucideIcon, d as useSearch, r as reactExports, u as useProducts, e as useSearchProducts, j as jsxRuntimeExports, a as Button, f as Search, X, B as Badge, b as LoadingSpinner } from "./index-hW5YA60z.js";
import { I as Input } from "./input-BXnZ_Bi7.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ByzYM2Ri.js";
import { E as EmptyState } from "./EmptyState-BZ58Forp.js";
import { E as ErrorMessage } from "./ErrorMessage-5ZKK7UMF.js";
import { P as ProductCard } from "./ProductCard-BiPru1-6.js";
import "./Combination-ETGZR3MA.js";
import "./star-_8WVkbzG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const CATEGORIES = [
  "All",
  "Football",
  "Cricket",
  "Basketball",
  "Tennis",
  "Badminton"
];
function ProductsPage() {
  const search = useSearch({ strict: false });
  const [selectedCategory, setSelectedCategory] = reactExports.useState(
    search.category ?? "All"
  );
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [sortBy, setSortBy] = reactExports.useState("default");
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const categoryFilter = selectedCategory === "All" ? null : selectedCategory;
  const {
    data: allProducts,
    isLoading,
    error,
    refetch
  } = useProducts(categoryFilter);
  const { data: searchResults, isLoading: searching } = useSearchProducts(searchTerm);
  const products = reactExports.useMemo(() => {
    const base = searchTerm.trim() ? searchResults ?? [] : allProducts ?? [];
    return [...base].sort((a, b) => {
      if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
      if (sortBy === "rating") return Number(b.rating) - Number(a.rating);
      return 0;
    });
  }, [allProducts, searchResults, searchTerm, sortBy]);
  if (error) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { onRetry: () => refetch() });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "products.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowFilters((v) => !v),
            "data-ocid": "products.filter_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 16, className: "mr-2" }),
              "Filters"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            size: 16,
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search products...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "pl-9",
            "data-ocid": "products.search_input"
          }
        ),
        searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSearchTerm(""),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
          }
        )
      ] }),
      showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 p-4 bg-card border border-border rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: selectedCategory === cat ? "default" : "outline",
            className: "cursor-pointer",
            onClick: () => setSelectedCategory(cat),
            "data-ocid": `products.category_filter.${cat.toLowerCase()}`,
            children: cat
          },
          cat
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortBy, onValueChange: setSortBy, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", "data-ocid": "products.sort_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sort by" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "default", children: "Default" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price-asc", children: "Price: Low to High" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price-desc", children: "Price: High to Low" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rating", children: "Top Rated" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: selectedCategory === cat ? "default" : "secondary",
          className: "cursor-pointer text-xs",
          onClick: () => setSelectedCategory(cat),
          "data-ocid": `products.category_pill.${cat.toLowerCase()}`,
          children: cat
        },
        cat
      )) })
    ] }),
    isLoading || searching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "No products found",
        description: "Try a different category or search term",
        action: {
          label: "Clear filters",
          onClick: () => {
            setSelectedCategory("All");
            setSearchTerm("");
          }
        }
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
        products.length,
        " products found"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid-cards", children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductCard,
        {
          product,
          index: i + 1
        },
        product.id.toString()
      )) })
    ] })
  ] });
}
export {
  ProductsPage as default
};
