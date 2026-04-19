import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import UserTypes "../types/users";

module {
  public func getOrCreateProfile(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
  ) : ?UserTypes.UserProfile {
    profiles.get(userId)
  };

  public func saveProfile(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    createdAts : Map.Map<Common.UserId, Common.Timestamp>,
    userId : Common.UserId,
    profile : UserTypes.UserProfile,
  ) {
    if (not createdAts.containsKey(userId)) {
      createdAts.add(userId, Time.now());
    };
    profiles.add(userId, profile);
  };

  public func listUsers(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    createdAts : Map.Map<Common.UserId, Common.Timestamp>,
  ) : [UserTypes.User] {
    let users = List.empty<UserTypes.User>();
    for ((userId, profile) in profiles.entries()) {
      let createdAt = switch (createdAts.get(userId)) {
        case (?t) { t };
        case null { 0 };
      };
      users.add({
        id = userId;
        name = profile.name;
        email = profile.email;
        createdAt;
        addresses = [];
      });
    };
    users.toArray()
  };

  public func submitContactMessage(
    messages : List.List<UserTypes.ContactMessage>,
    nextId : Nat,
    req : UserTypes.SubmitContactRequest,
  ) : UserTypes.ContactMessage {
    let msg : UserTypes.ContactMessage = {
      id = nextId;
      name = req.name;
      email = req.email;
      message = req.message;
      timestamp = Time.now();
    };
    messages.add(msg);
    msg
  };

  public func listContactMessages(
    messages : List.List<UserTypes.ContactMessage>,
  ) : [UserTypes.ContactMessage] {
    messages.toArray()
  };
};
