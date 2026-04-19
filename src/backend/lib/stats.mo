import List "mo:core/List";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Common "../types/common";
import StatsTypes "../types/stats";
import OrderTypes "../types/orders";
import ProductTypes "../types/products";
import Time "mo:core/Time";

module {
  func isNotCancelled(status : Common.OrderStatus) : Bool {
    switch (status) { case (#Cancelled) false; case (_) true };
  };

  public func getAdminStats(
    orders : List.List<OrderTypes.Order>,
    products : List.List<ProductTypes.Product>,
    userCount : Nat,
  ) : StatsTypes.AdminStats {
    let allOrders = orders.toArray();
    let totalOrders = allOrders.size();

    var placed = 0;
    var processing = 0;
    var shipped = 0;
    var delivered = 0;
    var cancelled = 0;
    var totalRevenue = 0;

    for (order in allOrders.values()) {
      totalRevenue += order.total;
      switch (order.status) {
        case (#Placed) { placed += 1 };
        case (#Processing) { processing += 1 };
        case (#Shipped) { shipped += 1 };
        case (#Delivered) { delivered += 1 };
        case (#Cancelled) { cancelled += 1 };
      };
    };

    // Calculate top products by sales (exclude cancelled orders)
    let salesMap = Map.empty<Common.ProductId, Nat>();
    let revenueMap = Map.empty<Common.ProductId, Nat>();
    for (order in allOrders.values()) {
      if (isNotCancelled(order.status)) {
        for (item in order.items.values()) {
          let prevSales = switch (salesMap.get(item.productId)) { case (?n) n; case null 0 };
          let prevRev = switch (revenueMap.get(item.productId)) { case (?n) n; case null 0 };
          salesMap.add(item.productId, prevSales + item.quantity);
          revenueMap.add(item.productId, prevRev + item.price * item.quantity);
        };
      };
    };

    // Build top products list
    let allProducts = products.toArray();
    let topList = List.empty<StatsTypes.TopProduct>();
    for (product in allProducts.values()) {
      let totalSold = switch (salesMap.get(product.id)) { case (?n) n; case null 0 };
      let revenue = switch (revenueMap.get(product.id)) { case (?n) n; case null 0 };
      if (totalSold > 0) {
        topList.add({ productId = product.id; productName = product.name; totalSold; revenue });
      };
    };

    // Sort top products by totalSold descending, take top 5
    let sorted = topList.sort(func(a : StatsTypes.TopProduct, b : StatsTypes.TopProduct) : Order.Order {
      if (a.totalSold > b.totalSold) { #less }
      else if (a.totalSold < b.totalSold) { #greater }
      else { #equal }
    });
    let sortedArr = sorted.toArray();
    let topProducts = if (sortedArr.size() > 5) {
      sortedArr.sliceToArray(0, 5)
    } else {
      sortedArr
    };

    // Monthly revenue (last 30 days, exclude cancelled)
    let thirtyDaysNs : Int = 30 * 24 * 60 * 60 * 1_000_000_000;
    let cutoff = Time.now() - thirtyDaysNs;
    var monthlyRevenue = 0;
    for (order in allOrders.values()) {
      if (order.timestamp >= cutoff and isNotCancelled(order.status)) {
        monthlyRevenue += order.total;
      };
    };

    {
      totalOrders;
      totalRevenue;
      totalProducts = allProducts.size();
      totalUsers = userCount;
      ordersByStatus = { placed; processing; shipped; delivered; cancelled };
      topProducts;
      monthlyRevenue;
    }
  };
};
