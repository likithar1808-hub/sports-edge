import type { Principal } from "@icp-sdk/core/principal";
import type { backendInterface } from "../backend.d";
import {
  Category,
  OrderStatus,
  PaymentMethod,
  UserRole,
} from "../backend.d";

const sampleProducts = [
  {
    id: BigInt(1),
    name: "Adidas Predator Football Boots",
    description: "Professional-grade football boots with precision control.",
    stock: BigInt(25),
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: Category.Football,
    brand: "Adidas",
    rating: BigInt(5),
    price: BigInt(4999),
    reviewCount: BigInt(12),
  },
  {
    id: BigInt(2),
    name: "SG Cricket Bat - Premium Willow",
    description: "English willow cricket bat for professional play.",
    stock: BigInt(10),
    imageUrl:
      "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400",
    category: Category.Cricket,
    brand: "SG",
    rating: BigInt(4),
    price: BigInt(3499),
    reviewCount: BigInt(8),
  },
  {
    id: BigInt(3),
    name: "Wilson Tennis Racket Pro Staff",
    description: "Tour-level tennis racket for advanced players.",
    stock: BigInt(15),
    imageUrl:
      "https://images.unsplash.com/photo-1551773188-0801da12ddae?w=400",
    category: Category.Tennis,
    brand: "Wilson",
    rating: BigInt(5),
    price: BigInt(8999),
    reviewCount: BigInt(20),
  },
  {
    id: BigInt(4),
    name: "Yonex Badminton Racket Astrox",
    description: "Lightweight carbon fiber racket for smash power.",
    stock: BigInt(20),
    imageUrl:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400",
    category: Category.Badminton,
    brand: "Yonex",
    rating: BigInt(4),
    price: BigInt(5299),
    reviewCount: BigInt(15),
  },
  {
    id: BigInt(5),
    name: "Spalding NBA Basketball",
    description: "Official size NBA basketball for indoor/outdoor play.",
    stock: BigInt(30),
    imageUrl:
      "https://images.unsplash.com/photo-1546519638405-a9f44b8a3f12?w=400",
    category: Category.Basketball,
    brand: "Spalding",
    rating: BigInt(5),
    price: BigInt(2499),
    reviewCount: BigInt(18),
  },
  {
    id: BigInt(6),
    name: "Nike Football Training Jersey",
    description: "Breathable Dri-FIT training jersey for football players.",
    stock: BigInt(50),
    imageUrl:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
    category: Category.Football,
    brand: "Nike",
    rating: BigInt(4),
    price: BigInt(1799),
    reviewCount: BigInt(9),
  },
];

const fakePrincipal = {
  toText: () => "aaaaa-aa",
  toUint8Array: () => new Uint8Array(29),
  isAnonymous: () => false,
  compareTo: () => "eq" as const,
  toJSON: () => "aaaaa-aa",
  toString: () => "aaaaa-aa",
  _isPrincipal: true as const,
} as unknown as Principal;

export const mockBackend: backendInterface = {
  addProduct: async (req) => ({
    id: BigInt(99),
    ...req,
    rating: BigInt(0),
    reviewCount: BigInt(0),
  }),
  addReview: async (req) => ({
    id: BigInt(1),
    userId: fakePrincipal,
    productId: req.productId,
    comment: req.comment,
    timestamp: BigInt(Date.now()),
    rating: req.rating,
  }),
  addToCart: async () => undefined,
  assignCallerUserRole: async () => undefined,
  clearCart: async () => undefined,
  deleteProduct: async () => true,
  filterProducts: async (category) =>
    category
      ? sampleProducts.filter((p) => p.category === category)
      : sampleProducts,
  getAdminStats: async () => ({
    totalProducts: BigInt(6),
    ordersByStatus: {
      shipped: BigInt(2),
      cancelled: BigInt(0),
      placed: BigInt(3),
      delivered: BigInt(5),
      processing: BigInt(1),
    },
    totalOrders: BigInt(11),
    totalUsers: BigInt(4),
    topProducts: [
      {
        revenue: BigInt(44991),
        productId: BigInt(3),
        productName: "Wilson Tennis Racket Pro Staff",
        totalSold: BigInt(5),
      },
    ],
    totalRevenue: BigInt(123456),
    monthlyRevenue: BigInt(45000),
  }),
  getAllOrders: async () => [],
  getCallerUserProfile: async () => ({ name: "Guest User", email: "" }),
  getCallerUserRole: async () => UserRole.guest,
  getCart: async () => ({
    total: BigInt(0),
    userId: fakePrincipal,
    items: [],
  }),
  getMyOrders: async () => [],
  getOrder: async () => null,
  getProduct: async (id) =>
    sampleProducts.find((p) => p.id === id) ?? null,
  getProductReviews: async () => [],
  getUserProfile: async () => null,
  getWishlist: async () => ({ productIds: [], userId: fakePrincipal }),
  isCallerAdmin: async () => false,
  listContactMessages: async () => [],
  listProducts: async (category) =>
    category
      ? sampleProducts.filter((p) => p.category === category)
      : sampleProducts,
  listUsers: async () => [],
  placeOrder: async (req) => ({
    id: BigInt(1),
    status: OrderStatus.Placed,
    deliveryAddress: req.deliveryAddress,
    couponCode: req.couponCode,
    total: BigInt(0),
    paymentMethod: req.paymentMethod,
    userId: fakePrincipal,
    discountAmount: BigInt(0),
    timestamp: BigInt(Date.now()),
    items: req.items,
  }),
  removeFromCart: async () => undefined,
  saveCallerUserProfile: async () => undefined,
  searchProducts: async (term) =>
    sampleProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.brand.toLowerCase().includes(term.toLowerCase()),
    ),
  submitContactMessage: async (req) => ({
    id: BigInt(1),
    name: req.name,
    email: req.email,
    message: req.message,
    timestamp: BigInt(Date.now()),
  }),
  toggleWishlist: async () => true,
  updateCartItem: async () => undefined,
  updateOrderStatus: async () => true,
  updateProduct: async () => true,
};
