(function() {
	'use strict';

	angular
		.module('friends')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['Auth'];

	/* @ngInject */
	function LoginController(Auth) {
		var vm = this;
		vm.title = 'login';
		console.log(Auth)
		vm.auth = Auth;

		vm.login = login

		activate();

		////////////////

		function activate() {
			vm.auth.$onAuth(function(authData) {
				vm.authData = authData;
				console.log(authData)
			});
		}

		function login() {
			console.log('dudd')
			Auth.$authWithOAuthPopup('facebook')
				.then(function(result) {
					console.log(result)
				});
		}
	}
})();
