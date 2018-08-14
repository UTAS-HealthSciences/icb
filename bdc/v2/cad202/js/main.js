require.config({
	paths: {
		'common': 'https://dementia.health.utas.edu.au/templates/bdc/v2/common/js/main',
		'domReady': 'https://dementia.health.utas.edu.au/templates/common/vendor/requirejs/2.1.11/domReady'
	},

	waitSeconds: 600, //default is 7
	deps: ['common'] //load asap
});

require(['domReady'], function (domReady) {
	console.debug("main-cad202 running");

});