import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AddProductRequest,
  AddReviewRequest,
  AddToCartRequest,
  OrderId,
  PlaceOrderRequest,
  ProductId,
  SubmitContactRequest,
  UpdateCartItemRequest,
  UpdateProductRequest,
} from "../backend";
import { Category, OrderStatus, UserRole, createActor } from "../backend";

// Re-export enums
export { Category, OrderStatus, UserRole };

function useBackendActor() {
  return useActor(createActor);
}

// ─── Products ────────────────────────────────────────────────────────────────

export function useProducts(category: Category | null = null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(category);
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 30,
  });
}

export function useProduct(id: ProductId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useSearchProducts(term: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["searchProducts", term],
    queryFn: async () => {
      if (!actor || !term.trim()) return [];
      return actor.searchProducts(term);
    },
    enabled: !!actor && !isFetching && term.trim().length > 0,
  });
}

export function useFilterProducts(
  category: Category | null,
  brand: string | null,
  minPrice: bigint | null,
  maxPrice: bigint | null,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: [
      "filterProducts",
      category,
      brand,
      minPrice?.toString(),
      maxPrice?.toString(),
    ],
    queryFn: async () => {
      if (!actor) return [];
      return actor.filterProducts(category, brand, minPrice, maxPrice);
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 30,
  });
}

export function useProductReviews(productId: ProductId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["productReviews", productId?.toString()],
    queryFn: async () => {
      if (!actor || productId === null) return [];
      return actor.getProductReviews(productId);
    },
    enabled: !!actor && !isFetching && productId !== null,
  });
}

export function useAddProduct() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: AddProductRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.addProduct(req);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: UpdateProductRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProduct(req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["product"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: ProductId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useAddReview() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: AddReviewRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.addReview(req);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["productReviews", vars.productId.toString()],
      });
      qc.invalidateQueries({
        queryKey: ["product", vars.productId.toString()],
      });
    },
  });
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCart();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 15,
  });
}

export function useAddToCart() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: AddToCartRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.addToCart(req);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useUpdateCartItem() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: UpdateCartItemRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateCartItem(req);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useRemoveFromCart() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: ProductId) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeFromCart(productId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useClearCart() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.clearCart();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

// ─── Wishlist ─────────────────────────────────────────────────────────────────

export function useWishlist() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getWishlist();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useToggleWishlist() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: ProductId) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleWishlist(productId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wishlist"] }),
  });
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export function useMyOrders() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOrder(orderId: OrderId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["order", orderId?.toString()],
    queryFn: async () => {
      if (!actor || orderId === null) return null;
      return actor.getOrder(orderId);
    },
    enabled: !!actor && !isFetching && orderId !== null,
  });
}

export function useAllOrders() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: PlaceOrderRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeOrder(req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myOrders"] });
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: OrderId;
      status: OrderStatus;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(orderId, status);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allOrders"] });
      qc.invalidateQueries({ queryKey: ["myOrders"] });
      qc.invalidateQueries({ queryKey: ["order"] });
    },
  });
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export function useCallerProfile() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["callerUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useSaveProfile() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: { name: string; email: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["callerUserProfile"] }),
  });
}

export function useListUsers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["listUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAssignRole() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      user,
      role,
    }: {
      user: Principal;
      role: UserRole;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.assignCallerUserRole(user, role);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listUsers"] }),
  });
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export function useSubmitContact() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (req: SubmitContactRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactMessage(req);
    },
  });
}

export function useContactMessages() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listContactMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export function useAdminStats() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAdminStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60,
  });
}
