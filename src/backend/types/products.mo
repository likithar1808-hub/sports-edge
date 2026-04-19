import Common "common";

module {
  public type Product = {
    id : Common.ProductId;
    name : Text;
    category : Common.Category;
    brand : Text;
    price : Nat;
    description : Text;
    imageUrl : Text;
    stock : Nat;
    rating : Nat;
    reviewCount : Nat;
  };

  public type Review = {
    id : Common.ReviewId;
    productId : Common.ProductId;
    userId : Common.UserId;
    rating : Nat;
    comment : Text;
    timestamp : Common.Timestamp;
  };

  public type AddProductRequest = {
    name : Text;
    category : Common.Category;
    brand : Text;
    price : Nat;
    description : Text;
    imageUrl : Text;
    stock : Nat;
  };

  public type UpdateProductRequest = {
    id : Common.ProductId;
    name : Text;
    category : Common.Category;
    brand : Text;
    price : Nat;
    description : Text;
    imageUrl : Text;
    stock : Nat;
  };

  public type AddReviewRequest = {
    productId : Common.ProductId;
    rating : Nat;
    comment : Text;
  };
};
