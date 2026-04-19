module {
  public type UserId = Principal;
  public type ProductId = Nat;
  public type OrderId = Nat;
  public type ReviewId = Nat;
  public type MessageId = Nat;
  public type Timestamp = Int;

  public type Category = {
    #Football;
    #Cricket;
    #Basketball;
    #Tennis;
    #Badminton;
  };

  public type OrderStatus = {
    #Placed;
    #Processing;
    #Shipped;
    #Delivered;
    #Cancelled;
  };

  public type PaymentMethod = {
    #UPI;
    #Card;
    #NetBanking;
  };

  public type UserRole = {
    #customer;
    #admin;
  };
};
