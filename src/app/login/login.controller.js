(function() {
	'use strict';

	angular
		.module('friends')
		.controller('LoginController', LoginController);

	LoginController.$inject = [];

	/* @ngInject */
	function LoginController() {
		var vm = this;
		vm.title = 'login';

		activate();

		////////////////

		function activate() {}
	}
})();
