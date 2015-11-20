/* global malarkey:false, moment:false */
(function() {
	'use strict';

	angular
		.module('friends')
		.constant('malarkey', malarkey)
		.constant('moment', moment)
		.constant('loginRedirectState', 'login')
		.constant('FBURL', 'https://oscars.firebaseio.com');

})();
