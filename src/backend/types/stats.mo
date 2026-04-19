import Common "common";
import OrderTypes "orders";

module {
  public type OrdersByStatus = {
    placed : Nat;
    processing : Nat;
    shipped : Nat;
    delivered : Nat;
    cancelled : Nat;
  };

  public type TopProduct = {
    productId : Common.ProductId;
    productName : Text;
    totalSold : Nat;
    revenue : Nat;
  };

  public type AdminStats = {
    totalOrders : Nat;
    totalRevenue : Nat;
    totalProducts : Nat;
    totalUsers : Nat;
    ordersByStatus : OrdersByStatus;
    topProducts : [TopProduct];
    monthlyRevenue : Nat;
  };
};
