import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ProductId } from "../../backend";
import { EmptyState } from "../../components/EmptyState";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useDeleteProduct, useProducts } from "../../hooks/useBackend";

export default function AdminProducts() {
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  const [deleting, setDeleting] = useState<ProductId | null>(null);

  const handleDelete = async (id: ProductId) => {
    setDeleting(id);
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(null);
    }
  };

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <div data-ocid="admin.products.page">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Products
          </h1>
        </div>
        <Button
          asChild
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="admin.products.add_button"
        >
          <Link to="/admin/products/new">
            <Plus size={16} className="mr-2" /> Add Product
          </Link>
        </Button>
      </div>

      {(products ?? []).length === 0 ? (
        <EmptyState
          title="No products yet"
          action={{ label: "Add First Product", href: "/admin/products/new" }}
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm" data-ocid="admin.products.table">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Product
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Category
                </th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">
                  Price
                </th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">
                  Stock
                </th>
                <th className="text-center px-4 py-3 font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(products ?? []).map((product, i) => (
                <tr
                  key={product.id.toString()}
                  className="bg-card hover:bg-muted/20 transition-colors"
                  data-ocid={`admin.products.item.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-10 h-10 rounded-md object-cover border border-border"
                        />
                      )}
                      <div>
                        <p className="font-medium text-foreground">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.brand}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{product.category}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">
                    ₹{(Number(product.price) / 100).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={
                        Number(product.stock) === 0
                          ? "text-destructive font-semibold"
                          : "text-foreground"
                      }
                    >
                      {Number(product.stock)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        data-ocid={`admin.products.edit_button.${i + 1}`}
                      >
                        <Link
                          to="/admin/products/$id"
                          params={{ id: product.id.toString() }}
                        >
                          <Pencil size={14} />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            data-ocid={`admin.products.delete_button.${i + 1}`}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent data-ocid="admin.products.delete_dialog">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove &quot;{product.name}
                              &quot; from the store.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel data-ocid="admin.products.delete_cancel_button">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(product.id)}
                              disabled={deleting === product.id}
                              data-ocid="admin.products.delete_confirm_button"
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              {deleting === product.id
                                ? "Deleting..."
                                : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
