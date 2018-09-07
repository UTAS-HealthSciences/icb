require.config({
	paths: {
		'common': 'https://health.utas.edu.au/templates/v3/bdc/common/js/main',
		'domReady': 'https://health.utas.edu.au/templates/common/vendor/requirejs/2.1.11/domReady',
		'jquery': ["https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min", 'https://health.utas.edu.au/templates/common/vendor/jquery-1.10.2.min'],
		'jsPlumb': 'https://health.utas.edu.au/templates/common/vendor/jsPlumb/1.6.2/js/jquery.jsPlumb-1.6.2-min'
	},
	shim: {
		'jsPlumb': {
			deps: ['jquery']
		}
	},
	waitSeconds: 600, //default is 7
	deps: ['common'] //load asap
});

require(['jquery','domReady'], function ($, domReady) {
	console.debug("main-cad110 running");

	// replace video splash screen with video on click (requires jquery library)
	$(function () {
		$('.vid-splash')
			.click(function () {
				var video = '<iframe class="embed-responsive-item" src="' + $(this)
					.attr('data-video') + '" allowfullscreen=""></iframe>';
				$(this)
					.replaceWith(video);
			});
	});


});

require(['jquery', 'domReady','jsPlumb' ], function ($, domReady) {
	var JSPInstance;


	domReady(function () {
		$(window).resize(function () {
			JSPInstance.repaintEverything();
		});

		var beforePrint = function () {
			console.log('onbeforeprint equivalent');
			JSPInstance.repaintEverything();
		};
		var afterPrint = function () {
			console.log('onafterprint equivalent');
			JSPInstance.repaintEverything();
		};

		if (window.top.matchMedia) {
			var mediaQueryList = window.top.matchMedia('print');
			mediaQueryList.addListener(function (mql) {
				if (mql.matches) {
					beforePrint();
				} else {
					afterPrint();
				}
			});
		}

		window.top.onbeforeprint = beforePrint;
		window.top.onafterprint = afterPrint;

		// DOM Ready
		$('select').change(function () {
			var id = $(this).attr('id');

			var index = $(this).prop("selectedIndex");

			var selector = '#q' + id;

			if (index == 0) {
				// deselection

				$(selector).removeClass('fa-check');
				$(selector).removeClass('fa-times');
				$(selector).addClass('fa-minus');

			} else if ($(this).hasClass(index)) {
				// correct

				$(selector).removeClass('fa-times');
				$(selector).removeClass('fa-minus');
				$(selector).addClass('fa-check');

			} else {
				// incorrect

				$(selector).removeClass('fa-check');
				$(selector).removeClass('fa-minus');
				$(selector).addClass('fa-times');
			}
		});
	});

	jsPlumb.bind("ready", function () {

		//Create an instance:
		JSPInstance = jsPlumb.getInstance();

		//Set default styles as a baseline:
		JSPInstance.importDefaults({
			PaintStyle: { lineWidth: 2, strokeStyle: "#777" },
			Connector: ["Straight", { gap: 0 }],
			Endpoint: "Blank",
			EndpointStyle: {fillStyle: "#777", outlineColor: "#777", outlineWidth: 1}
		});

		JSPInstance.connect({
			source: "node-1-1",
			target: "node-2-1",
			anchors: ["BottomCenter", "TopCenter" ],
			overlays: [
				[ "Arrow", { location: 1 } ]
			]
		});

		JSPInstance.connect({
			source: "node-2-1",
			target: "node-2-2",
			anchors: ["Right", [ 0, 0, 0, 0, 0, 40 ] ],
			overlays: [
				[ "Arrow", { location: 1 } ]
			]

		});

		JSPInstance.connect({
			source: "node-2-2",
			target: "node-2-2-1",
			anchors: [
				[0, 1, 0, 0, 45, 0],
				"TopCenter"
			],
			overlays: [
				[ "Arrow", { location: 1} ]
			]
		});

		JSPInstance.connect({
			source: "node-2-2-1",
			target: "node-2-2-2",
			anchors: ["Right", "Left" ],
			overlays: [
				[ "Arrow", { location: 1} ]
			]
		});

		JSPInstance.connect({
			source: "node-2-1",
			target: "node-3-1",
			anchors: ["BottomCenter", "TopCenter" ],
			overlays: [
				[ "Arrow", { location: 1} ]
			]
		});

		JSPInstance.connect({
			source: "node-3-1",
			target: "node-3-2",
			anchors: ["Right", [ 0, 0, 0, 0, 0, 40 ] ],
			overlays: [
				[ "Arrow", { location: 1} ]
			]
		});

		JSPInstance.connect({
			source: "node-3-1",
			target: "node-4-1",
			anchors: ["BottomCenter", "TopCenter" ],
			overlays: [
				[ "Arrow", { location: 1} ]
			]
		});

		JSPInstance.connect({
			source: "node-4-1",
			target: "node-4-2",
			anchors: ["Right", [ 0, 0, 0, 0, 0, 40 ] ],
			overlays: [
				[ "Arrow", { location: 1} ]
			]
		});

		JSPInstance.connect({
			source: "node-4-1",
			target: "node-5-1",
			anchors: ["BottomCenter", "TopCenter" ],

			overlays: [
				[ "Arrow", { location: 1} ]
			]
		});

		JSPInstance.connect({
			source: "node-5-1",
			target: "node-5-2",
			anchors: ["Right", [ 0, 0, 0, 0, 0, 40 ] ],
			overlays: [
				[ "Arrow", { location: 1} ]
			]
		});

	});

});