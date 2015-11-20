Package.describe({
  name: 'trinisofttechnologies:accounts-digits',
  git: 'https://github.com/trinisofttechnologies/accounts-digits.git',
  version: '1.0.6',
  summary: 'Login with digits using cordova native sdk.'
});

Npm.depends({
});

Cordova.depends({
  // 'phonegap-loginwithdigits-plugin': "0.12.0"
});

Package.on_use(function (api) {
  api.use('accounts-base@1.0.0');
  api.add_files('common.js', ['client', 'server']);
  api.add_files('client.js', ['client']);
  api.add_files('server.js', ['server']);
});