import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PlaceOrderRequest {
    deliveryAddress: Address;
    couponCode?: string;
    paymentMethod: PaymentMethod;
    items: Array<OrderItem>;
}
export interface Address {
    street: string;
    city: string;
    fullName: string;
    state: string;
    phone: string;
    pincode: string;
}
export type Timestamp = bigint;
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    stock: bigint;
    imageUrl: string;
    category: Category;
    brand: string;
    rating: bigint;
    price: bigint;
    reviewCount: bigint;
}
export interface OrderItem {
    productId: ProductId;
    productName: string;
    quantity: bigint;
    price: bigint;
}
export interface AddReviewRequest {
    productId: ProductId;
    comment: string;
    rating: bigint;
}
export interface TopProduct {
    revenue: bigint;
    productId: ProductId;
    productName: string;
    totalSold: bigint;
}
export interface Wishlist {
    productIds: Array<ProductId>;
    userId: UserId;
}
export interface ContactMessage {
    id: MessageId;
    name: string;
    email: string;
    message: string;
    timestamp: Timestamp;
}
export interface AddProductRequest {
    name: string;
    description: string;
    stock: bigint;
    imageUrl: string;
    category: Category;
    brand: string;
    price: bigint;
}
export interface Cart {
    total: bigint;
    userId: UserId;
    items: Array<CartItem>;
}
export type ReviewId = bigint;
export interface UpdateProductRequest {
    id: ProductId;
    name: string;
    description: string;
    stock: bigint;
    imageUrl: string;
    category: Category;
    brand: string;
    price: bigint;
}
export interface Review {
    id: ReviewId;
    userId: UserId;
    productId: ProductId;
    comment: string;
    timestamp: Timestamp;
    rating: bigint;
}
export interface User {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    email: string;
    addresses: Array<string>;
}
export interface UpdateCartItemRequest {
    productId: ProductId;
    quantity: bigint;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    deliveryAddress: Address;
    couponCode?: string;
    total: bigint;
    paymentMethod: PaymentMethod;
    userId: UserId;
    discountAmount: bigint;
    timestamp: Timestamp;
    items: Array<OrderItem>;
}
export type UserId = Principal;
export interface AdminStats {
    totalProducts: bigint;
    ordersByStatus: OrdersByStatus;
    totalOrders: bigint;
    totalUsers: bigint;
    topProducts: Array<TopProduct>;
    totalRevenue: bigint;
    monthlyRevenue: bigint;
}
export type MessageId = bigint;
export interface AddToCartRequest {
    productId: ProductId;
    quantity: bigint;
}
export interface OrdersByStatus {
    shipped: bigint;
    cancelled: bigint;
    placed: bigint;
    delivered: bigint;
    processing: bigint;
}
export type ProductId = bigint;
export interface CartItem {
    productId: ProductId;
    quantity: bigint;
    price: bigint;
}
export interface SubmitContactRequest {
    name: string;
    email: string;
    message: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export type OrderId = bigint;
export enum Category {
    Basketball = "Basketball",
    Tennis = "Tennis",
    Football = "Football",
    Cricket = "Cricket",
    Badminton = "Badminton"
}
export enum OrderStatus {
    Delivered = "Delivered",
    Placed = "Placed",
    Cancelled = "Cancelled",
    Processing = "Processing",
    Shipped = "Shipped"
}
export enum PaymentMethod {
    UPI = "UPI",
    Card = "Card",
    NetBanking = "NetBanking"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(req: AddProductRequest): Promise<Product>;
    addReview(req: AddReviewRequest): Promise<Review>;
    addToCart(req: AddToCartRequest): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    deleteProduct(id: ProductId): Promise<boolean>;
    filterProducts(category: Category | null, brand: string | null, minPrice: bigint | null, maxPrice: bigint | null): Promise<Array<Product>>;
    getAdminStats(): Promise<AdminStats>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Cart>;
    getMyOrders(): Promise<Array<Order>>;
    getOrder(orderId: OrderId): Promise<Order | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    getProductReviews(productId: ProductId): Promise<Array<Review>>;
    getUserProfile(user: UserId): Promise<UserProfile | null>;
    getWishlist(): Promise<Wishlist>;
    isCallerAdmin(): Promise<boolean>;
    listContactMessages(): Promise<Array<ContactMessage>>;
    listProducts(category: Category | null): Promise<Array<Product>>;
    listUsers(): Promise<Array<User>>;
    placeOrder(req: PlaceOrderRequest): Promise<Order>;
    removeFromCart(productId: ProductId): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProducts(term: string): Promise<Array<Product>>;
    submitContactMessage(req: SubmitContactRequest): Promise<ContactMessage>;
    toggleWishlist(productId: ProductId): Promise<boolean>;
    updateCartItem(req: UpdateCartItemRequest): Promise<void>;
    updateOrderStatus(orderId: OrderId, status: OrderStatus): Promise<boolean>;
    updateProduct(req: UpdateProductRequest): Promise<boolean>;
}
