import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Category } from "../../backend";
import { useAddProduct } from "../../hooks/useBackend";

export default function AdminProductNew() {
  const navigate = useNavigate();
  const addProduct = useAddProduct();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    description: "",
    imageUrl: "",
    category: Category.Football,
    price: "",
    stock: "",
  });

  const set = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct.mutateAsync({
        name: form.name,
        brand: form.brand,
        description: form.description,
        imageUrl: form.imageUrl,
        category: form.category,
        price: BigInt(Math.round(Number.parseFloat(form.price) * 100)),
        stock: BigInt(Number.parseInt(form.stock, 10)),
      });
      toast.success("Product added successfully!");
      navigate({ to: "/admin/products" });
    } catch {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto" data-ocid="admin.product_new.page">
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/admin/products"
          className="text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Add New Product
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl p-6 space-y-5"
        data-ocid="admin.product_new.form"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Product Name
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
              className="mt-1"
              data-ocid="admin.product_new.name_input"
            />
          </div>
          <div>
            <Label htmlFor="brand" className="text-sm font-medium">
              Brand
            </Label>
            <Input
              id="brand"
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}
              required
              className="mt-1"
              data-ocid="admin.product_new.brand_input"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            required
            className="mt-1 min-h-24 resize-none"
            data-ocid="admin.product_new.description_textarea"
          />
        </div>

        <div>
          <Label htmlFor="imageUrl" className="text-sm font-medium">
            Image URL
          </Label>
          <Input
            id="imageUrl"
            value={form.imageUrl}
            onChange={(e) => set("imageUrl", e.target.value)}
            placeholder="https://..."
            className="mt-1"
            data-ocid="admin.product_new.image_url_input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="category" className="text-sm font-medium">
              Category
            </Label>
            <Select
              value={form.category}
              onValueChange={(v) => set("category", v)}
            >
              <SelectTrigger
                className="mt-1"
                data-ocid="admin.product_new.category_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Category).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price" className="text-sm font-medium">
              Price (₹)
            </Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              required
              className="mt-1"
              data-ocid="admin.product_new.price_input"
            />
          </div>
          <div>
            <Label htmlFor="stock" className="text-sm font-medium">
              Stock
            </Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
              required
              className="mt-1"
              data-ocid="admin.product_new.stock_input"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            disabled={addProduct.isPending}
            className="bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
            data-ocid="admin.product_new.submit_button"
          >
            {addProduct.isPending ? "Adding..." : "Add Product"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/admin/products" })}
            data-ocid="admin.product_new.cancel_button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
