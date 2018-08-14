require.config({
    paths: {
        'domReady': 'https://health.utas.edu.au/templates/common/vendor/requirejs/2.1.11/domReady',
        'jquery': ["https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min", 'https://health.utas.edu.au/templates/common/vendor/jquery-1.10.2.min'],
        'plugins': 'https://health.utas.edu.au/templates/common/js/plugins',
        'bootstrap': 'https://health.utas.edu.au/templates/common/vendor/bootstrap/3.2.0/js/bootstrap.min',
        'bootstrap-combobox': 'https://health.utas.edu.au/templates/common/vendor/bootstrap-combobox/1.1.6/js/bootstrap-combobox',
        'bootstrap-datepicker': 'https://health.utas.edu.au/templates/common/vendor/bootstrap-datepicker/1.3.0/js/bootstrap-datepicker',
        'bootstrap-datetimepicker': 'https://health.utas.edu.au/templates/common/vendor/bootstrap-datetimepicker/3.0.0/js/bootstrap-datetimepicker.min',
        'bootstrapValidator': 'https://health.utas.edu.au/templates/common/vendor/bootstrap-validator/0.4.5/js/bootstrapValidator',
        'fuelux': 'https://health.utas.edu.au/templates/common/vendor/fuelux/2.6.1/',
        'mask': 'https://health.utas.edu.au/templates/common/vendor/mask/1.6.4/jquery.mask.min',
        'select2': 'https://health.utas.edu.au/templates/common/vendor/select2/3.4.8/select2.min',
        'moment': 'https://health.utas.edu.au/templates/common/vendor/moment/2.6.0/min/moment.min',
        'icheck': '/common/vendor/iCheck/1.0.2/icheck.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'plugins': {
            deps: ['jquery']
        },
        'bootstrap-combobox': {
            deps: ['bootstrap']
        },
        'bootstrap-datepicker': {
            deps: ['bootstrap']
        },
        'bootstrap-datetimepicker': {
            deps: ['bootstrap', 'moment']
        },
        'bootstrapValidator': {
            deps: ['jquery', 'bootstrap']
        },
        'wizard': {
            deps: ['bootstrap']
        },
        'modal-adm': {
            deps: ['bootstrap']
        },
        'fuelux': {
            deps: ['jquery']
        },
        'mask': {
            deps: ['jquery']
        },
        'select2': {
            deps: ['jquery']
        },
        'icheck': {
            deps: ['jquery']
        }



    },
    waitSeconds: 600, //default is 7
    deps: ['jquery', 'plugins', 'bootstrap'] //load asap
});

require(['jquery', 'domReady', 'plugins'], function ($, domReady) {
    console.debug("main running");

    domReady(function () {
        Modernizr.addTest('mylo', function () {
            // return !!navigator.userAgent.match(/iPod/i);
            var hostStr = window.location.host;
            console.debug("hostStr", hostStr);
            return !!hostStr.match(/mylo.utas.edu.au/i);
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

                console.debug("splash screen replaced")
            });

    });

    var addCSS = function (url) {
        //var cssId = 'myCss';  // you could encode the css path itself to generate id..
        var cssId = url;
        if (!document.getElementById(cssId)) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            // link.id   = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            link.media = 'all';
            head.appendChild(link);
        }
    };

    // addCSS("https://health.utas.edu.au/templates/common/vendor/bootstrap/3.1.1/css/bootstrap.min.css");
    // addCSS("https://health.utas.edu.au/templates/v3/bdc/css/layout.css");
    // addCSS("https://health.utas.edu.au/templates/v3/bdc/css/style.css");
});