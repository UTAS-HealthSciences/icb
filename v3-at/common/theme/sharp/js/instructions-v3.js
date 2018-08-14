require.config({
	paths: {
		'domReady': 'https://dementia.health.utas.edu.au/templates/common/vendor/requirejs/2.1.11/domReady',
		'jquery': ["https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min", 'https://dementia.health.utas.edu.au/templates/common/vendor/jquery-1.10.2.min'],
		'plugins': 'https://dementia.health.utas.edu.au/templates/common/js/plugins',
		'bootstrap': 'https://dementia.health.utas.edu.au/templates/common/vendor/bootstrap/3.2.0/js/bootstrap.min',
        'jquery-ui': 'https://dementia.health.utas.edu.au/templates/v3-at/vendor/jquery-ui.min',
        'interactive': 'https://dementia.health.utas.edu.au/templates/v3-at/common/js/interactive'
	},
	shim: {
		'bootstrap': {
			deps: ['jquery']
		},
		'plugins': {
			deps: ['jquery']
		},
		'jquery-ui': {
            deps: ['jquery']
        },
        'interactive': {
            deps: ['jquery-ui']
        }
	},
	waitSeconds: 600, //default is 7
	deps: ['jquery', 'plugins', 'bootstrap', 'jquery-ui', 'interactive'] //load asap
});

require(['jquery', 'domReady', 'plugins', '../../vendor/jquery-ui'], function ($, domReady) {
	domReady(function () {
		Modernizr.addTest('mylo', function () {
			// return !!navigator.userAgent.match(/iPod/i);
			var hostStr = window.location.host;
//			console.debug("hostStr", hostStr);
			return !!(hostStr.match(/mylo.utas.edu.au|utas.edu.au/i));
		});

		Modernizr.addTest('firefox', function () {
			return !!navigator.userAgent.match(/Firefox/i);
		});

		// replace video splash screen with video on click (requires jquery library)

		$('.vid-splash')
			.click(function () {
				var video = '<iframe class="embed-responsive-item" src="' + $(this)
					.attr('data-video') + '" allowfullscreen=""></iframe>';
				$(this)
					.replaceWith(video);
			});

        $('.dit-spacer').addClass("invisible");



       // ensure tab heights are all the same: (requires jquery library)
       $('.nav-justified').find('a').each(function(){
	   				$(this).height($(this).parent().height()-22);
		})
      // trigger the tab height function if the window is resized

        $(window).resize(function(index){
			$('.nav-justified').find('a').removeAttr('style');
			$('.nav-justified').find('a').each(function(){
				$(this).height($(this).parent().height()-22);
			})
		});



    });
});