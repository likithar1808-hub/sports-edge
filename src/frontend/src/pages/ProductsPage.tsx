import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearch } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Category } from "../backend";
import { EmptyState } from "../components/EmptyState";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ProductCard } from "../components/ProductCard";
import { useProducts, useSearchProducts } from "../hooks/useBackend";

const CATEGORIES = [
  "All",
  "Football",
  "Cricket",
  "Basketball",
  "Tennis",
  "Badminton",
];

export default function ProductsPage() {
  const search = useSearch({ strict: false }) as { category?: string };
  const [selectedCategory, setSelectedCategory] = useState<string>(
    search.category ?? "All",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const categoryFilter =
    selectedCategory === "All" ? null : (selectedCategory as Category);
  const {
    data: allProducts,
    isLoading,
    error,
    refetch,
  } = useProducts(categoryFilter);
  const { data: searchResults, isLoading: searching } =
    useSearchProducts(searchTerm);

  const products = useMemo(() => {
    const base = searchTerm.trim()
      ? (searchResults ?? [])
      : (allProducts ?? []);
    return [...base].sort((a, b) => {
      if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
      if (sortBy === "rating") return Number(b.rating) - Number(a.rating);
      return 0;
    });
  }, [allProducts, searchResults, searchTerm, sortBy]);

  if (error) return <ErrorMessage onRetry={() => refetch()} />;

  return (
    <div data-ocid="products.page">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Products
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters((v) => !v)}
            data-ocid="products.filter_toggle"
          >
            <SlidersHorizontal size={16} className="mr-2" />
            Filters
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            data-ocid="products.search_input"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category + Sort */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 p-4 bg-card border border-border rounded-lg">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(cat)}
                  data-ocid={`products.category_filter.${cat.toLowerCase()}`}
                >
                  {cat}
                </Badge>
              ))}
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40" data-ocid="products.sort_select">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Category pills always visible */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "secondary"}
              className="cursor-pointer text-xs"
              onClick={() => setSelectedCategory(cat)}
              data-ocid={`products.category_pill.${cat.toLowerCase()}`}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {isLoading || searching ? (
        <LoadingSpinner />
      ) : products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try a different category or search term"
          action={{
            label: "Clear filters",
            onClick: () => {
              setSelectedCategory("All");
              setSearchTerm("");
            },
          }}
        />
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            {products.length} products found
          </p>
          <div className="grid-cards">
            {products.map((product, i) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={i + 1}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
