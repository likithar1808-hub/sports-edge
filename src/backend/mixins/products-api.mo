import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import ProductTypes "../types/products";
import ProductsLib "../lib/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : List.List<ProductTypes.Product>,
  reviews : List.List<ProductTypes.Review>,
) {
  public query func listProducts(category : ?Common.Category) : async [ProductTypes.Product] {
    ProductsLib.listProducts(products, category)
  };

  public query func getProduct(id : Common.ProductId) : async ?ProductTypes.Product {
    ProductsLib.getProduct(products, id)
  };

  public query func searchProducts(term : Text) : async [ProductTypes.Product] {
    ProductsLib.searchProducts(products, term)
  };

  public query func filterProducts(
    category : ?Common.Category,
    brand : ?Text,
    minPrice : ?Nat,
    maxPrice : ?Nat,
  ) : async [ProductTypes.Product] {
    ProductsLib.filterProducts(products, category, brand, minPrice, maxPrice)
  };

  public query func getProductReviews(productId : Common.ProductId) : async [ProductTypes.Review] {
    ProductsLib.getReviews(reviews, productId)
  };

  public shared ({ caller }) func addProduct(req : ProductTypes.AddProductRequest) : async ProductTypes.Product {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    // Use max(existing ids) + 1 for next id
    let nextId = products.foldLeft(0, func(acc : Nat, p : ProductTypes.Product) : Nat { if (p.id > acc) p.id else acc }) + 1;
    ProductsLib.addProduct(products, nextId, req)
  };

  public shared ({ caller }) func updateProduct(req : ProductTypes.UpdateProductRequest) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductsLib.updateProduct(products, req)
  };

  public shared ({ caller }) func deleteProduct(id : Common.ProductId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductsLib.deleteProduct(products, id)
  };

  public shared ({ caller }) func addReview(req : ProductTypes.AddReviewRequest) : async ProductTypes.Review {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to add a review");
    };
    let nextId = reviews.foldLeft(0, func(acc : Nat, r : ProductTypes.Review) : Nat { if (r.id > acc) r.id else acc }) + 1;
    ProductsLib.addReview(reviews, products, nextId, caller, req)
  };
};
