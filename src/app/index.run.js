(function() {
	'use strict';

	angular
		.module('friends')
		.run(runBlock);

	/** @ngInject */
	function runBlock($log, $rootScope, Auth) {

		Auth.$onAuth(function(user) {
			$rootScope.loggedIn = !!user;
		});

		$log.debug('runBlock end');
	}

})();
