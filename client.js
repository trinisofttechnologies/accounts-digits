Meteor.loginWithDigits = function(phoneNumber, consumerKey, callback){
    if(window.Digits){
        onLoadDigits(phoneNumber, consumerKey, callback);
    }
    else{
        $("head")
            .append('<script id="digits-sdk" src="https://cdn.digits.com/1/sdk.js"></script>');
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.digits.com/1/sdk.js';
        head.appendChild(script);
        script.onload = function(){
            onLoadDigits(phoneNumber, consumerKey, callback);
        };
    }
}

function onLoadDigits(phoneNumber, consumerKey, callback) {
    Digits.init({ consumerKey: consumerKey});
    Digits.logIn({
        phoneNumber: phoneNumber
    })
        .done(function(loginResponse){onLogin(loginResponse, callback);})
        .fail(function(loginResponse){callback({err: loginResponse})});
};
function onLogin(loginResponse, callback){
    console.log('Digits login succeeded.');
    var oAuthHeaders = loginResponse.oauth_echo_headers;
    var verifyData = {
      authHeader: oAuthHeaders['X-Verify-Credentials-Authorization'],
      apiUrl: oAuthHeaders['X-Auth-Service-Provider']
    };
    var fullstring = oAuthHeaders['X-Verify-Credentials-Authorization'];
    var string = fullstring.split(",")
    var listarray = string[5].split("=")
    var id = listarray[1];
    var obj = {};
    obj.id = id;
    obj.verifyData = verifyData;
    createUser(obj,callback)
}

function createUser(scope, callback){
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

// Digits.init({ consumerKey: 'G96W4vvFmTE0zXoByFQdPkG0Z' });