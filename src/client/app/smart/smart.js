(function () {
  'use strict';

  /* @ngInject */
  angular
    .module('app.smart')
    .controller('smartCtrl', smartCtrl);

  // smartCtrl.$inject = ['$fhir'];

  function smartCtrl() {
    var vm = this;

    vm.servers = [];
    vm.server = [];
    vm.setServer = setServer;
    vm.authorize = authorize;
    vm.clientId = "";
    vm.scopes = [];
    vm.state = 0;

    initialize();

    function initialize() {
      vm.servers = [
        'https://fhir-api-dstu2.smarthealthit.org',
        'https://fhir-open-api-dstu2.smarthealthit.org'
      ];
      vm.server = vm.servers[0];

      vm.clientId = 'd5f2524c-bb6b-45b6-927c-09648b6636b5';

      // The scopes that the app will request from the authorization server
      // encoded in a space-separated string:
      //      1. permission to read all of the patient's record
      //      2. permission to launch the app in the specific context
      vm.scopes = [
        "patient/*.read",
        "launch"
      ];

      // Generate a unique session key string (here we just generate a random number
      // for simplicity, but this is not 100% collision-proof)
      vm.state = Math.round(Math.random() * 100000000).toString();

      setServer();
    }

    function setServer() {
    }

    function authorize() {
      FHIR.oauth2.authorize(
        {
          "client_id": "my_web_app",
          "scope": "patient/*.read"
        }
      );
    }

  }

})();