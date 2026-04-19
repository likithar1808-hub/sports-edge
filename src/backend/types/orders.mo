import Common "common";
import CartTypes "cart";

module {
  public type Address = {
    fullName : Text;
    phone : Text;
    street : Text;
    city : Text;
    state : Text;
    pincode : Text;
  };

  public type OrderItem = {
    productId : Common.ProductId;
    productName : Text;
    quantity : Nat;
    price : Nat;
  };

  public type Order = {
    id : Common.OrderId;
    userId : Common.UserId;
    items : [OrderItem];
    total : Nat;
    status : Common.OrderStatus;
    deliveryAddress : Address;
    paymentMethod : Common.PaymentMethod;
    timestamp : Common.Timestamp;
    couponCode : ?Text;
    discountAmount : Nat;
  };

  public type PlaceOrderRequest = {
    items : [OrderItem];
    deliveryAddress : Address;
    paymentMethod : Common.PaymentMethod;
    couponCode : ?Text;
  };
};
