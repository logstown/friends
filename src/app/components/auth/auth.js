(function() {
	'use strict';

	angular
		.module('friends')
		.factory('Auth', Auth);

	Auth.$inject = ['$firebaseAuth', 'fbutil'];

	/* @ngInject */
	function Auth($firebaseAuth, fbutil) {
		return $firebaseAuth(fbutil.ref());
	}
})();
