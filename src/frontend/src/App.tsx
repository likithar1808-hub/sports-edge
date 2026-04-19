import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy-load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const OrderDetailPage = lazy(() => import("./pages/OrderDetailPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminProductNew = lazy(() => import("./pages/admin/AdminProductNew"));
const AdminProductEdit = lazy(() => import("./pages/admin/AdminProductEdit"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminStats = lazy(() => import("./pages/admin/AdminStats"));

function PageLoader() {
  return <LoadingSpinner fullPage />;
}

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Layout fullWidth>
      <Suspense fallback={<PageLoader />}>
        <HomePage />
      </Suspense>
    </Layout>
  ),
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <ProductsPage />
      </Suspense>
    </Layout>
  ),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <ProductDetailPage />
      </Suspense>
    </Layout>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <AboutPage />
      </Suspense>
    </Layout>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <ContactPage />
      </Suspense>
    </Layout>
  ),
});

// Protected routes
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => (
    <Layout>
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <CartPage />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wishlist",
  component: () => (
    <Layout>
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <WishlistPage />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <Layout>
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <CheckoutPage />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: () => (
    <Layout>
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <OrdersPage />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/$id",
  component: () => (
    <Layout>
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <OrderDetailPage />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <Layout>
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <ProfilePage />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

// Admin routes
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Layout>
      <ProtectedRoute adminOnly>
        <Suspense fallback={<PageLoader />}>
          <AdminDashboard />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  component: () => (
    <Layout>
      <ProtectedRoute adminOnly>
        <Suspense fallback={<PageLoader />}>
          <AdminProducts />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const adminProductNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products/new",
  component: () => (
    <Layout>
      <ProtectedRoute adminOnly>
        <Suspense fallback={<PageLoader />}>
          <AdminProductNew />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const adminProductEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products/$id",
  component: () => (
    <Layout>
      <ProtectedRoute adminOnly>
        <Suspense fallback={<PageLoader />}>
          <AdminProductEdit />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: () => (
    <Layout>
      <ProtectedRoute adminOnly>
        <Suspense fallback={<PageLoader />}>
          <AdminOrders />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  component: () => (
    <Layout>
      <ProtectedRoute adminOnly>
        <Suspense fallback={<PageLoader />}>
          <AdminUsers />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const adminStatsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/stats",
  component: () => (
    <Layout>
      <ProtectedRoute adminOnly>
        <Suspense fallback={<PageLoader />}>
          <AdminStats />
        </Suspense>
      </ProtectedRoute>
    </Layout>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
  aboutRoute,
  contactRoute,
  cartRoute,
  wishlistRoute,
  checkoutRoute,
  ordersRoute,
  orderDetailRoute,
  profileRoute,
  adminRoute,
  adminProductsRoute,
  adminProductNewRoute,
  adminProductEditRoute,
  adminOrdersRoute,
  adminUsersRoute,
  adminStatsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
