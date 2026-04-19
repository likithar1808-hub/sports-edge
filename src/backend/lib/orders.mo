import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import OrderTypes "../types/orders";

module {
  func applyCoupon(subtotal : Nat, couponCode : ?Text) : (Nat, Nat) {
    switch (couponCode) {
      case (?code) {
        if (code == "SPORT10") {
          let discount = subtotal / 10;
          (discount, subtotal - discount)
        } else if (code == "EDGE20") {
          let discount = subtotal / 5;
          (discount, subtotal - discount)
        } else {
          (0, subtotal)
        }
      };
      case null { (0, subtotal) };
    }
  };

  public func placeOrder(
    orders : List.List<OrderTypes.Order>,
    nextId : Nat,
    userId : Common.UserId,
    req : OrderTypes.PlaceOrderRequest,
  ) : OrderTypes.Order {
    let subtotal = req.items.foldLeft(0, func(acc : Nat, item : OrderTypes.OrderItem) : Nat {
      acc + item.price * item.quantity
    });
    let (discountAmount, finalTotal) = applyCoupon(subtotal, req.couponCode);
    let order : OrderTypes.Order = {
      id = nextId;
      userId;
      items = req.items;
      total = finalTotal;
      status = #Placed;
      deliveryAddress = req.deliveryAddress;
      paymentMethod = req.paymentMethod;
      timestamp = Time.now();
      couponCode = req.couponCode;
      discountAmount;
    };
    orders.add(order);
    order
  };

  public func getOrder(
    orders : List.List<OrderTypes.Order>,
    orderId : Common.OrderId,
    userId : Common.UserId,
    isAdmin : Bool,
  ) : ?OrderTypes.Order {
    orders.find(func(o) {
      o.id == orderId and (isAdmin or o.userId == userId)
    })
  };

  public func getUserOrders(
    orders : List.List<OrderTypes.Order>,
    userId : Common.UserId,
  ) : [OrderTypes.Order] {
    orders.filter(func(o) { o.userId == userId }).toArray()
  };

  public func getAllOrders(
    orders : List.List<OrderTypes.Order>,
  ) : [OrderTypes.Order] {
    orders.toArray()
  };

  public func updateOrderStatus(
    orders : List.List<OrderTypes.Order>,
    orderId : Common.OrderId,
    status : Common.OrderStatus,
  ) : Bool {
    let idx = orders.findIndex(func(o) { o.id == orderId });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = orders.at(i);
        orders.put(i, { existing with status });
        true
      };
    };
  };
};
