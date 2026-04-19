import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import ProductTypes "../types/products";

module {
  public func listProducts(
    products : List.List<ProductTypes.Product>,
    category : ?Common.Category,
  ) : [ProductTypes.Product] {
    switch (category) {
      case null { products.toArray() };
      case (?cat) {
        products.filter(func(p) { p.category == cat }).toArray()
      };
    };
  };

  public func getProduct(
    products : List.List<ProductTypes.Product>,
    id : Common.ProductId,
  ) : ?ProductTypes.Product {
    products.find(func(p) { p.id == id })
  };

  public func addProduct(
    products : List.List<ProductTypes.Product>,
    nextId : Nat,
    req : ProductTypes.AddProductRequest,
  ) : ProductTypes.Product {
    let product : ProductTypes.Product = {
      id = nextId;
      name = req.name;
      category = req.category;
      brand = req.brand;
      price = req.price;
      description = req.description;
      imageUrl = req.imageUrl;
      stock = req.stock;
      rating = 0;
      reviewCount = 0;
    };
    products.add(product);
    product
  };

  public func updateProduct(
    products : List.List<ProductTypes.Product>,
    req : ProductTypes.UpdateProductRequest,
  ) : Bool {
    let idx = products.findIndex(func(p) { p.id == req.id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = products.at(i);
        products.put(
          i,
          {
            existing with
            name = req.name;
            category = req.category;
            brand = req.brand;
            price = req.price;
            description = req.description;
            imageUrl = req.imageUrl;
            stock = req.stock;
          },
        );
        true
      };
    };
  };

  public func deleteProduct(
    products : List.List<ProductTypes.Product>,
    id : Common.ProductId,
  ) : Bool {
    let sizeBefore = products.size();
    let filtered = products.filter(func(p) { p.id != id });
    products.clear();
    products.append(filtered);
    products.size() < sizeBefore
  };

  public func searchProducts(
    products : List.List<ProductTypes.Product>,
    term : Text,
  ) : [ProductTypes.Product] {
    let lower = term.toLower();
    products.filter(func(p) {
      p.name.toLower().contains(#text lower) or
      p.brand.toLower().contains(#text lower) or
      p.description.toLower().contains(#text lower)
    }).toArray()
  };

  public func filterProducts(
    products : List.List<ProductTypes.Product>,
    category : ?Common.Category,
    brand : ?Text,
    minPrice : ?Nat,
    maxPrice : ?Nat,
  ) : [ProductTypes.Product] {
    products.filter(func(p) {
      let catOk = switch (category) {
        case null { true };
        case (?c) { p.category == c };
      };
      let brandOk = switch (brand) {
        case null { true };
        case (?b) { p.brand.toLower() == b.toLower() };
      };
      let minOk = switch (minPrice) {
        case null { true };
        case (?m) { p.price >= m };
      };
      let maxOk = switch (maxPrice) {
        case null { true };
        case (?m) { p.price <= m };
      };
      catOk and brandOk and minOk and maxOk
    }).toArray()
  };

  public func addReview(
    reviews : List.List<ProductTypes.Review>,
    products : List.List<ProductTypes.Product>,
    nextId : Nat,
    caller : Common.UserId,
    req : ProductTypes.AddReviewRequest,
  ) : ProductTypes.Review {
    let review : ProductTypes.Review = {
      id = nextId;
      productId = req.productId;
      userId = caller;
      rating = req.rating;
      comment = req.comment;
      timestamp = Time.now();
    };
    reviews.add(review);
    // Update product rating average
    let productReviews = reviews.filter(func(r) { r.productId == req.productId });
    let total = productReviews.foldLeft(0, func(acc : Nat, r : ProductTypes.Review) : Nat { acc + r.rating });
    let count = productReviews.size();
    let avgRating = if (count == 0) { 0 } else { total / count };
    let idx = products.findIndex(func(p) { p.id == req.productId });
    switch (idx) {
      case null {};
      case (?i) {
        let existing = products.at(i);
        products.put(i, { existing with rating = avgRating; reviewCount = count });
      };
    };
    review
  };

  public func getReviews(
    reviews : List.List<ProductTypes.Review>,
    productId : Common.ProductId,
  ) : [ProductTypes.Review] {
    reviews.filter(func(r) { r.productId == productId }).toArray()
  };

  public func preloadSampleProducts(products : List.List<ProductTypes.Product>) {
    let samples : [ProductTypes.Product] = [
      // Football
      {
        id = 1; name = "Nike Striker Football Jersey"; category = #Football;
        brand = "Nike"; price = 1299;
        description = "Lightweight, breathable football jersey for competitive play. Moisture-wicking fabric keeps you cool on the field.";
        imageUrl = "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&q=80";
        stock = 50; rating = 4; reviewCount = 12;
      },
      {
        id = 2; name = "Adidas Copa Football Boots"; category = #Football;
        brand = "Adidas"; price = 3499;
        description = "Professional football boots with firm ground studs. Synthetic leather upper for enhanced ball touch.";
        imageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80";
        stock = 30; rating = 5; reviewCount = 8;
      },
      {
        id = 3; name = "Cosco Premier Football"; category = #Football;
        brand = "Cosco"; price = 799;
        description = "FIFA-approved match ball with 32-panel design. Suitable for training and competitive matches.";
        imageUrl = "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&q=80";
        stock = 100; rating = 4; reviewCount = 25;
      },
      // Cricket
      {
        id = 4; name = "SS Ton Master Cricket Bat"; category = #Cricket;
        brand = "SS"; price = 2999;
        description = "English willow cricket bat with premium handle. Ideal for medium-pace bowlers on all wickets.";
        imageUrl = "https://images.unsplash.com/photo-1540747913346-19212a4e9a41?w=400&q=80";
        stock = 20; rating = 5; reviewCount = 18;
      },
      {
        id = 5; name = "SG Test Cricket Batting Gloves"; category = #Cricket;
        brand = "SG"; price = 899;
        description = "Premium batting gloves with reinforced fingers and superior grip. Available in all sizes.";
        imageUrl = "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400&q=80";
        stock = 40; rating = 4; reviewCount = 10;
      },
      {
        id = 6; name = "DSP Pro Cricket Helmet"; category = #Cricket;
        brand = "DSP"; price = 1799;
        description = "ABS shell cricket helmet with stainless steel grill. Lightweight and well-ventilated for comfort.";
        imageUrl = "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80";
        stock = 25; rating = 4; reviewCount = 7;
      },
      // Basketball
      {
        id = 7; name = "Spalding NBA Official Basketball"; category = #Basketball;
        brand = "Spalding"; price = 2499;
        description = "Official NBA game ball. Genuine leather construction for professional indoor play.";
        imageUrl = "https://images.unsplash.com/photo-1546519638405-a6a9d18e857e?w=400&q=80";
        stock = 35; rating = 5; reviewCount = 15;
      },
      {
        id = 8; name = "Nike Air Zoom Basketball Shoes"; category = #Basketball;
        brand = "Nike"; price = 4999;
        description = "High-performance basketball shoes with Air Zoom cushioning. Ankle support and traction optimized for court play.";
        imageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80";
        stock = 20; rating = 4; reviewCount = 22;
      },
      // Tennis
      {
        id = 9; name = "Wilson Pro Staff Tennis Racket"; category = #Tennis;
        brand = "Wilson"; price = 3999;
        description = "Professional tennis racket used by top ATP players. Graphite frame with control-oriented string pattern.";
        imageUrl = "https://images.unsplash.com/photo-1617083934555-ac7b4d500d35?w=400&q=80";
        stock = 15; rating = 5; reviewCount = 9;
      },
      {
        id = 10; name = "Penn Championship Tennis Balls (3-Pack)"; category = #Tennis;
        brand = "Penn"; price = 499;
        description = "High-altitude tennis balls with durable felt. Consistent bounce for all court surfaces.";
        imageUrl = "https://images.unsplash.com/photo-1560012057-4372e14c5085?w=400&q=80";
        stock = 200; rating = 4; reviewCount = 30;
      },
      // Badminton
      {
        id = 11; name = "Yonex Arcsaber Badminton Racket"; category = #Badminton;
        brand = "Yonex"; price = 2199;
        description = "Mid-flex badminton racket for all-court players. Carbon graphite frame with isometric head shape.";
        imageUrl = "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80";
        stock = 30; rating = 4; reviewCount = 14;
      },
      {
        id = 12; name = "Yonex Mavis 350 Shuttlecocks (6-Pack)"; category = #Badminton;
        brand = "Yonex"; price = 649;
        description = "Nylon shuttlecocks for durable all-weather play. Consistent flight trajectory for training and recreation.";
        imageUrl = "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80";
        stock = 150; rating = 4; reviewCount = 20;
      },
      {
        id = 13; name = "Li-Ning Windstorm Badminton Shoes"; category = #Badminton;
        brand = "Li-Ning"; price = 1899;
        description = "Lightweight court shoes with superior grip and ankle support for quick lateral movements.";
        imageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80";
        stock = 25; rating = 4; reviewCount = 6;
      },
    ];
    for (p in samples.values()) {
      products.add(p);
    };
  };
};
