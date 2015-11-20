(function() {
  'use strict';

  var securedRoutes = [];

  angular
    .module('friends')
    .config(routerConfig)
    .run(stateChangeError);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $stateProvider.whenAuthenticated = function(state, config) {
      securedRoutes.push(state); // store all secured routes for use with authRequired() below
      config.resolve = config.resolve || {};
      config.resolve.user = ['Auth', function(Auth) {
        return Auth.$requireAuth();
      }];
      $stateProvider.state(state, config);
      return this;
    };

    $stateProvider
      .whenAuthenticated('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });

    $urlRouterProvider.otherwise('/');
  }

  function stateChangeError($rootScope, $state, Auth, loginRedirectState) {
    // watch for login status changes and redirect if appropriate
    Auth.$onAuth(check);

    // some of our routes may reject resolve promises with the special {authRequired: true} error
    // this redirects to the login page whenever that is encountered
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      if (error === 'AUTH_REQUIRED') {
        $state.go(loginRedirectState);
      }
    });

    function check(user) {
      if (!user && authRequired($state.current.name)) {
        console.log('check failed', user, $state.current.name); //debug
        $state.go(loginRedirectState);
      }
    }

    function authRequired(state) {
      console.log('authRequired?', state, securedRoutes.indexOf(state)); //debug
      return securedRoutes.indexOf(state) !== -1;
    }
  }

})();
