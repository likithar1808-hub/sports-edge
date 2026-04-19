import { Navigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "./LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  adminOnly = false,
  redirectTo = "/",
}: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing, isAdmin } = useAuth();

  if (isInitializing) {
    return <LoadingSpinner fullPage text="Checking auth..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
