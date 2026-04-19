import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import UserTypes "../types/users";
import UsersLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
  createdAts : Map.Map<Common.UserId, Common.Timestamp>,
  contactMessages : List.List<UserTypes.ContactMessage>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    UsersLib.getOrCreateProfile(profiles, caller)
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserTypes.UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    UsersLib.saveProfile(profiles, createdAts, caller, profile)
  };

  public query ({ caller }) func getUserProfile(user : Common.UserId) : async ?UserTypes.UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    UsersLib.getOrCreateProfile(profiles, user)
  };

  public query ({ caller }) func listUsers() : async [UserTypes.User] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list users");
    };
    UsersLib.listUsers(profiles, createdAts)
  };

  public shared func submitContactMessage(req : UserTypes.SubmitContactRequest) : async UserTypes.ContactMessage {
    let nextId = contactMessages.foldLeft(0, func(acc : Nat, m : UserTypes.ContactMessage) : Nat { if (m.id > acc) m.id else acc }) + 1;
    UsersLib.submitContactMessage(contactMessages, nextId, req)
  };

  public query ({ caller }) func listContactMessages() : async [UserTypes.ContactMessage] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    UsersLib.listContactMessages(contactMessages)
  };
};
