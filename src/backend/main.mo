import List "mo:core/List";
import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Common "types/common";
import ProductTypes "types/products";
import CartTypes "types/cart";
import OrderTypes "types/orders";
import UserTypes "types/users";
import ProductsApiMixin "mixins/products-api";
import CartApiMixin "mixins/cart-api";
import OrdersApiMixin "mixins/orders-api";
import UsersApiMixin "mixins/users-api";
import StatsApiMixin "mixins/stats-api";
import ProductsLib "lib/products";

actor {
  // Authorization state (first login becomes admin)
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Product & review state
  let products = List.empty<ProductTypes.Product>();
  let reviews = List.empty<ProductTypes.Review>();

  // Cart & wishlist state
  let carts = Map.empty<Common.UserId, CartTypes.Cart>();
  let wishlists = Map.empty<Common.UserId, CartTypes.Wishlist>();

  // Order state
  let orders = List.empty<OrderTypes.Order>();

  // User profile & contact state
  let profiles = Map.empty<Common.UserId, UserTypes.UserProfile>();
  let createdAts = Map.empty<Common.UserId, Common.Timestamp>();
  let contactMessages = List.empty<UserTypes.ContactMessage>();

  // Preload sample products on first init
  if (products.size() == 0) {
    ProductsLib.preloadSampleProducts(products);
  };

  // Include domain mixins
  include ProductsApiMixin(accessControlState, products, reviews);
  include CartApiMixin(accessControlState, carts, wishlists, products);
  include OrdersApiMixin(accessControlState, orders);
  include UsersApiMixin(accessControlState, profiles, createdAts, contactMessages);
  include StatsApiMixin(accessControlState, orders, products, profiles);
};
