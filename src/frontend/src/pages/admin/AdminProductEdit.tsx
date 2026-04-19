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
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Category } from "../../backend";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useProduct, useUpdateProduct } from "../../hooks/useBackend";

export default function AdminProductEdit() {
  const { id } = useParams({ strict: false }) as { id: string };
  const productId = BigInt(id);
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(productId);
  const updateProduct = useUpdateProduct();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    description: "",
    imageUrl: "",
    category: Category.Football,
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        brand: product.brand,
        description: product.description,
        imageUrl: product.imageUrl,
        category: product.category,
        price: (Number(product.price) / 100).toString(),
        stock: Number(product.stock).toString(),
      });
    }
  }, [product]);

  const set = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
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
        stock: BigInt(Number.parseInt(form.stock, 10)),
      });
      toast.success("Product updated!");
      navigate({ to: "/admin/products" });
    } catch {
      toast.error("Failed to update product");
    }
  };

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <div className="max-w-2xl mx-auto" data-ocid="admin.product_edit.page">
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/admin/products"
          className="text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Edit Product
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl p-6 space-y-5"
        data-ocid="admin.product_edit.form"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="edit-name" className="text-sm font-medium">
              Product Name
            </Label>
            <Input
              id="edit-name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
              className="mt-1"
              data-ocid="admin.product_edit.name_input"
            />
          </div>
          <div>
            <Label htmlFor="edit-brand" className="text-sm font-medium">
              Brand
            </Label>
            <Input
              id="edit-brand"
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}
              required
              className="mt-1"
              data-ocid="admin.product_edit.brand_input"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="edit-description" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="edit-description"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            required
            className="mt-1 min-h-24 resize-none"
            data-ocid="admin.product_edit.description_textarea"
          />
        </div>

        <div>
          <Label htmlFor="edit-imageUrl" className="text-sm font-medium">
            Image URL
          </Label>
          <Input
            id="edit-imageUrl"
            value={form.imageUrl}
            onChange={(e) => set("imageUrl", e.target.value)}
            className="mt-1"
            data-ocid="admin.product_edit.image_url_input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="edit-category" className="text-sm font-medium">
              Category
            </Label>
            <Select
              value={form.category}
              onValueChange={(v) => set("category", v)}
            >
              <SelectTrigger
                className="mt-1"
                data-ocid="admin.product_edit.category_select"
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
            <Label htmlFor="edit-price" className="text-sm font-medium">
              Price (₹)
            </Label>
            <Input
              id="edit-price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              required
              className="mt-1"
              data-ocid="admin.product_edit.price_input"
            />
          </div>
          <div>
            <Label htmlFor="edit-stock" className="text-sm font-medium">
              Stock
            </Label>
            <Input
              id="edit-stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
              required
              className="mt-1"
              data-ocid="admin.product_edit.stock_input"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            disabled={updateProduct.isPending}
            className="bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
            data-ocid="admin.product_edit.submit_button"
          >
            {updateProduct.isPending ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/admin/products" })}
            data-ocid="admin.product_edit.cancel_button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
