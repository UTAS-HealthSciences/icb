require.config({
	paths: {
		'common': 'https://dementia.health.utas.edu.au/templates/v3/common/js/main-v3',
		'domReady': 'https://dementia.health.utas.edu.au/templates/common/vendor/requirejs/2.1.11/domReady',
        'plugins': 'https://dementia.health.utas.edu.au/templates/common/js/plugins',
	},

	waitSeconds: 600, //default is 7
	deps: ['common'] //load asap
});

require(['domReady','plugins'], function (domReady) {
	console.debug("main-learning_and_teaching-v3 running");

});