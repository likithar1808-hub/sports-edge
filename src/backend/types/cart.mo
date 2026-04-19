import Common "common";

module {
  public type CartItem = {
    productId : Common.ProductId;
    quantity : Nat;
    price : Nat;
  };

  public type Cart = {
    userId : Common.UserId;
    items : [CartItem];
    total : Nat;
  };

  public type Wishlist = {
    userId : Common.UserId;
    productIds : [Common.ProductId];
  };

  public type AddToCartRequest = {
    productId : Common.ProductId;
    quantity : Nat;
  };

  public type UpdateCartItemRequest = {
    productId : Common.ProductId;
    quantity : Nat;
  };
};
