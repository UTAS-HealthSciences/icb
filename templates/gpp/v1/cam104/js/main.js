require.config({
	paths: {
		'common': 'https://dementia.health.utas.edu.au/templates/gpp/v1/common/js/main',
		'domReady': 'https://dementia.health.utas.edu.au/templates/common/vendor/requirejs/2.1.11/domReady',
        'plugins': 'https://dementia.health.utas.edu.au/templates/common/js/plugins',
	},

	waitSeconds: 600, //default is 7
	deps: ['common'] //load asap
});

require(['domReady','plugins'], function (domReady) {
	console.debug("main-cam104 running");

});