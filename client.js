Meteor.loginWithDigits = function(scope, callback, debugFlag){
    var obj = {}
    obj.userId = scope.id;
    obj.profile = {};
    obj.profile.mobile = scope.id;
    obj.profile.createdAt = new Date().getTime();
    obj.services = scope.verifyData
    loginWithDigits(obj, callback)
}

var loginWithDigits = function(options,callback){
    options.loginWithDigits = true;
        Accounts.callLoginMethod({
        methodArguments: [options],
        userCallback: callback
    });
}