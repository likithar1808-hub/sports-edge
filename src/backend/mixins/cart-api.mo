import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import CartTypes "../types/cart";
import ProductTypes "../types/products";
import CartLib "../lib/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : Map.Map<Common.UserId, CartTypes.Cart>,
  wishlists : Map.Map<Common.UserId, CartTypes.Wishlist>,
  products : List.List<ProductTypes.Product>,
) {
  public query ({ caller }) func getCart() : async CartTypes.Cart {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.getCart(carts, caller)
  };

  public shared ({ caller }) func addToCart(req : CartTypes.AddToCartRequest) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.addToCart(carts, products, caller, req)
  };

  public shared ({ caller }) func updateCartItem(req : CartTypes.UpdateCartItemRequest) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.updateCartItem(carts, caller, req)
  };

  public shared ({ caller }) func removeFromCart(productId : Common.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.removeFromCart(carts, caller, productId)
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.clearCart(carts, caller)
  };

  public query ({ caller }) func getWishlist() : async CartTypes.Wishlist {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.getWishlist(wishlists, caller)
  };

  public shared ({ caller }) func toggleWishlist(productId : Common.ProductId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.toggleWishlist(wishlists, caller, productId)
  };
};
