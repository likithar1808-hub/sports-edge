import Map "mo:core/Map";
import List "mo:core/List";
import Common "../types/common";
import CartTypes "../types/cart";
import ProductTypes "../types/products";

module {
  func recalcTotal(items : [CartTypes.CartItem]) : Nat {
    items.foldLeft(0, func(acc : Nat, item : CartTypes.CartItem) : Nat { acc + item.price * item.quantity })
  };

  public func getCart(
    carts : Map.Map<Common.UserId, CartTypes.Cart>,
    userId : Common.UserId,
  ) : CartTypes.Cart {
    switch (carts.get(userId)) {
      case (?cart) { cart };
      case null { { userId; items = []; total = 0 } };
    }
  };

  public func addToCart(
    carts : Map.Map<Common.UserId, CartTypes.Cart>,
    products : List.List<ProductTypes.Product>,
    userId : Common.UserId,
    req : CartTypes.AddToCartRequest,
  ) {
    let product = switch (products.find(func(p) { p.id == req.productId })) {
      case (?p) { p };
      case null { return };
    };
    let current = getCart(carts, userId);
    let alreadyIn = current.items.find(func(i : CartTypes.CartItem) : Bool { i.productId == req.productId });
    let newItems : [CartTypes.CartItem] = switch (alreadyIn) {
      case (?_) {
        current.items.map(func(i : CartTypes.CartItem) : CartTypes.CartItem {
          if (i.productId == req.productId) {
            { i with quantity = i.quantity + req.quantity }
          } else { i }
        })
      };
      case null {
        let newItem : CartTypes.CartItem = { productId = req.productId; quantity = req.quantity; price = product.price };
        current.items.concat([newItem])
      };
    };
    carts.add(userId, { userId; items = newItems; total = recalcTotal(newItems) });
  };

  public func updateCartItem(
    carts : Map.Map<Common.UserId, CartTypes.Cart>,
    userId : Common.UserId,
    req : CartTypes.UpdateCartItemRequest,
  ) {
    let current = getCart(carts, userId);
    let newItems : [CartTypes.CartItem] = if (req.quantity == 0) {
      current.items.filter(func(i : CartTypes.CartItem) : Bool { i.productId != req.productId })
    } else {
      current.items.map(func(i : CartTypes.CartItem) : CartTypes.CartItem {
        if (i.productId == req.productId) { { i with quantity = req.quantity } } else { i }
      })
    };
    carts.add(userId, { userId; items = newItems; total = recalcTotal(newItems) });
  };

  public func removeFromCart(
    carts : Map.Map<Common.UserId, CartTypes.Cart>,
    userId : Common.UserId,
    productId : Common.ProductId,
  ) {
    let current = getCart(carts, userId);
    let newItems = current.items.filter(func(i : CartTypes.CartItem) : Bool { i.productId != productId });
    carts.add(userId, { userId; items = newItems; total = recalcTotal(newItems) });
  };

  public func clearCart(
    carts : Map.Map<Common.UserId, CartTypes.Cart>,
    userId : Common.UserId,
  ) {
    carts.add(userId, { userId; items = []; total = 0 });
  };

  public func getWishlist(
    wishlists : Map.Map<Common.UserId, CartTypes.Wishlist>,
    userId : Common.UserId,
  ) : CartTypes.Wishlist {
    switch (wishlists.get(userId)) {
      case (?w) { w };
      case null { { userId; productIds = [] } };
    }
  };

  public func toggleWishlist(
    wishlists : Map.Map<Common.UserId, CartTypes.Wishlist>,
    userId : Common.UserId,
    productId : Common.ProductId,
  ) : Bool {
    let current = getWishlist(wishlists, userId);
    let alreadyIn = current.productIds.find(func(id : Common.ProductId) : Bool { id == productId });
    switch (alreadyIn) {
      case (?_) {
        let newIds = current.productIds.filter(func(id : Common.ProductId) : Bool { id != productId });
        wishlists.add(userId, { userId; productIds = newIds });
        false
      };
      case null {
        let newIds = current.productIds.concat([productId]);
        wishlists.add(userId, { userId; productIds = newIds });
        true
      };
    };
  };
};
