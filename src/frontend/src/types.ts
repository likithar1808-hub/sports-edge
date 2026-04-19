// Re-export types from backend bindings for convenience
export type {
  Product,
  ProductId,
  Cart,
  CartItem,
  Order,
  OrderId,
  OrderItem,
  Address,
  Review,
  ReviewId,
  User,
  UserId,
  UserProfile,
  Wishlist,
  AdminStats,
  TopProduct,
  OrdersByStatus,
  ContactMessage,
  MessageId,
  Timestamp,
  AddProductRequest,
  UpdateProductRequest,
  AddToCartRequest,
  UpdateCartItemRequest,
  AddReviewRequest,
  PlaceOrderRequest,
  SubmitContactRequest,
} from "./backend";

export { Category, OrderStatus, PaymentMethod, UserRole } from "./backend";

// UI-only types
export interface FilterOptions {
  category: string | null;
  brand: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: "name" | "price-asc" | "price-desc" | "rating";
}
