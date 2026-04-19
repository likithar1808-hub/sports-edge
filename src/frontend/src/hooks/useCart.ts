import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { ProductId } from "../backend";
import {
  useAddToCart,
  useCart as useCartQuery,
  useClearCart,
  useRemoveFromCart,
  useUpdateCartItem,
} from "./useBackend";

export function useCartState() {
  const { isAuthenticated } = useInternetIdentity();
  const cartQuery = useCartQuery();
  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();
  const updateCartItemMutation = useUpdateCartItem();
  const clearCartMutation = useClearCart();

  const cart = cartQuery.data;
  const itemCount =
    cart?.items?.reduce((sum, item) => sum + Number(item.quantity), 0) ?? 0;
  const cartTotal = cart ? Number(cart.total) : 0;

  const addToCart = async (productId: ProductId, quantity = BigInt(1)) => {
    if (!isAuthenticated) return;
    await addToCartMutation.mutateAsync({ productId, quantity });
  };

  const removeFromCart = async (productId: ProductId) => {
    await removeFromCartMutation.mutateAsync(productId);
  };

  const updateQuantity = async (productId: ProductId, quantity: bigint) => {
    if (quantity <= 0n) {
      await removeFromCartMutation.mutateAsync(productId);
    } else {
      await updateCartItemMutation.mutateAsync({ productId, quantity });
    }
  };

  const clearCart = async () => {
    await clearCartMutation.mutateAsync();
  };

  const isInCart = (productId: ProductId) => {
    return cart?.items?.some((item) => item.productId === productId) ?? false;
  };

  return {
    cart,
    itemCount,
    cartTotal,
    isLoading: cartQuery.isLoading,
    isAuthenticated,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    isAdding: addToCartMutation.isPending,
    isRemoving: removeFromCartMutation.isPending,
  };
}
