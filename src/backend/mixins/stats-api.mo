import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import UserTypes "../types/users";
import OrderTypes "../types/orders";
import ProductTypes "../types/products";
import StatsTypes "../types/stats";
import StatsLib "../lib/stats";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : List.List<OrderTypes.Order>,
  products : List.List<ProductTypes.Product>,
  profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
) {
  public query ({ caller }) func getAdminStats() : async StatsTypes.AdminStats {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view stats");
    };
    StatsLib.getAdminStats(orders, products, profiles.size())
  };
};
