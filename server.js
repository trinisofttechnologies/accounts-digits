Accounts.registerLoginHandler("loginWithDigits",function(options) {
    console.log(options)
    if(!options.loginWithDigits) {
        return undefined;
    }
    var userId = null;
    var user = Meteor.users.findOne({"userId": options.userId});
    if(!user){
        options._id = options.userId;
        options.userId = userId = Meteor.users.insert(options);
    }
    else
        options.userId = userId = user.userId;
    var stampedToken = Accounts._generateStampedLoginToken();
    var hashStampedToken = Accounts._hashStampedToken(stampedToken);
    Meteor.users.update(userId,
        {$push: {'services.resume.loginTokens': hashStampedToken}}
      );
    return {
        _id: userId,
        userId: userId,
        token: stampedToken.token
    };
});