function mobileCallback(data){
    console.log("ok");
    console.log(data)
}


Meteor.loginWithDigits = function(loginResponse){
    console.log('Digits login succeeded.');
    // var oAuthHeaders = parseOAuthHeaders(loginResponse.oauth_echo_headers);
    console.log(loginResponse)
    var oAuthHeaders = loginResponse.oauth_echo_headers;
    var verifyData = {
      authHeader: oAuthHeaders['X-Verify-Credentials-Authorization'],
      apiUrl: oAuthHeaders['X-Auth-Service-Provider']
    };
    var fullstring = oAuthHeaders['X-Verify-Credentials-Authorization'];
    var string = fullstring.split(",")
    var listarray = string[5].split("=")
    var id = listarray[1];
    console.log(id)
    var obj = {};
    obj.id = id;
    obj.verifyData = verifyData;
    CreateUser(obj,mobileCallback,false)
}


function CreateUser(scope, callback, debugFlag ){
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