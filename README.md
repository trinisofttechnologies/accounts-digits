# Summary
Login with digits on web

# Adding package
```meteor add trinisofttechnologies:accounts-digits```

```javascript
Meteor.loginWithDigits("+17278287040", 'consumerKey_digits', function(err){
  console.log(err, Meteor.user());
});
```