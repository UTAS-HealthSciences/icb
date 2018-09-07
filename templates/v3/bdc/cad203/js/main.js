require.config({
	paths: {
		'common': 'https://health.utas.edu.au/templates/v3/bdc/common/js/main',
		'domReady': 'https://health.utas.edu.au/templates/common/vendor/requirejs/2.1.11/domReady'
	},

	waitSeconds: 600, //default is 7
	deps: ['common'] //load asap
});

require(['domReady'], function (domReady) {
	console.debug("main-cad203 running");

});