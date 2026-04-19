import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import OrderTypes "../types/orders";
import OrdersLib "../lib/orders";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : List.List<OrderTypes.Order>,
) {
  public shared ({ caller }) func placeOrder(req : OrderTypes.PlaceOrderRequest) : async OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to place an order");
    };
    let nextId = orders.foldLeft(0, func(acc : Nat, o : OrderTypes.Order) : Nat { if (o.id > acc) o.id else acc }) + 1;
    OrdersLib.placeOrder(orders, nextId, caller, req)
  };

  public query ({ caller }) func getOrder(orderId : Common.OrderId) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    OrdersLib.getOrder(orders, orderId, caller, isAdmin)
  };

  public query ({ caller }) func getMyOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    OrdersLib.getUserOrders(orders, caller)
  };

  public query ({ caller }) func getAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    OrdersLib.getAllOrders(orders)
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Common.OrderId, status : Common.OrderStatus) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrdersLib.updateOrderStatus(orders, orderId, status)
  };
};
