import Common "common";

module {
  public type UserProfile = {
    name : Text;
    email : Text;
  };

  public type User = {
    id : Common.UserId;
    name : Text;
    email : Text;
    createdAt : Common.Timestamp;
    addresses : [Text];
  };

  public type ContactMessage = {
    id : Common.MessageId;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Common.Timestamp;
  };

  public type SubmitContactRequest = {
    name : Text;
    email : Text;
    message : Text;
  };
};
