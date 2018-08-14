window.parent.document.querySelector('iframe').setAttribute('allowfullscreen', true);

var contentframe;
require.config({
    paths: {
        'domReady': 'https://health.utas.edu.au/templates/common/vendor/requirejs/2.1.11/domReady',
        'jquery': ["https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min", 'https://health.utas.edu.au/templates/common/vendor/jquery-1.10.2.min'],
        'plugins': 'https://health.utas.edu.au/templates/common/js/plugins',
        'bootstrap': 'https://health.utas.edu.au/templates/common/vendor/bootstrap/3.2.0/js/bootstrap.min',
        'jquery-ui': 'https://health.utas.edu.au/templates/v3-at/vendor/jquery-ui.min',
        'interactive': 'https://health.utas.edu.au/templates/v3-at/common/js/interactive'
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
        },
        'printing': {
            deps: ['jquery']
        }
    },
    waitSeconds: 600, //default is 7
    deps: ['jquery', 'plugins', 'bootstrap', 'jquery-ui', 'interactive'] //load asap
});

require(['jquery', 'domReady', 'plugins', '../../../v3-at/vendor/jquery-ui'], function ($, domReady) {
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

        // add video 'component' box below embedded videos for print versions, provided that the video does not have a 'nodownload' class
        $(".embed-responsive:not(.nodownload)").each(function () {
            if ($(this).closest('.nodownload').length == 0) { /* only add this panel if the embed-responsive item is not a child of an element with a nodownload class */
                $(this).after("<div class='printonly'><div class='panel panel-printvideo'><div class='panel-heading'><h3 class='panel-title'>Video</h3></div><div class='panel-body'><div class='media'><div class='pull-left media-object'><div class='icon-printvideo'><p class='zero-height'></p></div><p class='zero-height'></p></div><div class='media-body'><p style='text-align:center'> Video source: " + $(this).find("iframe[src]").attr("src") + "</p></div></div></div></div>")
            }
        });
        // ensure that the link to the video is not printed for videos that have a 'nodownload' class set.
        $(".nodownload .embed-responsive, .nodownload.embed-responsive").each(function () {
            $(this).after("<div class='printonly'><div class='panel panel-printvideo'><div class='panel-heading'><h3 class='panel-title'>Secure Video</h3></div><div class='panel-body'><div class='media'><div class='pull-left media-object'><div class='icon-printvideo'><p class='zero-height'></p></div><p class='zero-height'></p></div><div class='media-body'><p style='text-align:center'> This is a secure video and can only be viewed online via MyLO</p></div></div></div></div>")
        });


// capture the ctrl-P print command and trigger the correct print function instead

        $(window.top.document).keydown(function (event) {
            if ((event.ctrlKey || event.metaKey) && (event.which == 80)) { //cntrl + p
                event.preventDefault();
                printContent();
            }

            function printContent() {
                var pageTitle=$(".d2l-page-main .d2l-page-header .d2l-page-title-c form:first-of-type > label",window.top.document).text();
				var contentframe = $('iframe', window.top.document)[0];
				contentframe.contentDocument.title=pageTitle;
				pageTitle="<div class='col-xs-12 pageTitlePrint'><h2>"+pageTitle+"</h2></div>";
				contentframe.contentWindow.focus();
				contentframe.contentWindow.print();
                $(".pageTitlePrint").remove();
            }
        });

        $(document).keydown(function (event) {
            if ((event.ctrlKey || event.metaKey) && (event.which == 80)) { //cntrl + p or command-p on mac
                event.preventDefault();
                printContent();
            }

            function printContent() {
				var pageTitle=$(".d2l-page-main .d2l-page-header .d2l-page-title-c form:first-of-type > label",window.top.document).text();
				//console.log('printContent called');
                var contentframe = $('iframe', window.top.document)[0];
               	contentframe.contentDocument.title=pageTitle;
				pageTitle="<div class='col-xs-12 pageTitlePrint'><h2>"+pageTitle+"</h2></div>";
	        	$(".pdf-link").parent().parent().append(pageTitle);
                contentframe.contentWindow.focus();
                contentframe.contentWindow.print();
                $(".pageTitlePrint").remove();
            }
        });

        $('.pdf-link').click(function () {
            var pageTitle=$(".d2l-page-main .d2l-page-header .d2l-page-title-c form:first-of-type > label",window.top.document).text();
            var contentframe = $('iframe', window.top.document)[0];
            pageTitle="<div class='col-xs-12 pageTitlePrint'><h2>"+pageTitle+"</h2></div>";
			$(".pdf-link").parent().parent().append(pageTitle);
			contentframe.contentWindow.focus();
			contentframe.contentWindow.print();
            $(".pageTitlePrint").remove();
            return false;

        });
        $('.pdf-link').html('Print this page');


        $('.dit-spacer').addClass("invisible");

        $(function () {
            // DOM Ready

            //Note: does not wait for iframe to load. There is another version of this function in customise.js that will wait.
            $.fn.traverse = function (func) {

                for (var i = 0; i < this.length; i++) {
                    var from = this[i];

                    func.apply(from); // pre-order

                    //from is modified in case of frames/iframes/etc which keep their children in contentWindow, etc.
                    from = ( (from.contentWindow && from.contentWindow.document) || from.contentDocument || from.contentWindow || from);

                    $(from).children().traverse(func);

                    //func.apply(from); // post-order
                }
            };

            // clean up checklist


            var mooc_traverse = function (from, objects, callback) {

                from.each(function () {

                    var t = $(this);  // this must be here for correct scoping!

                    function work() {

                        // reset
                        for (var i = 0; i < objects.length; i++) {
                            (objects[i]).found = 0; // hopefully this will add found...
                        }

                        t.traverse(function () {
                            for (var i = 0; i < objects.length; i++) {
                                //                    console.log("this is:", this);
                                //                    console.log("checking: " + i + ", this[(objects[i]).property]: " + this[(objects[i]).property] + ", (objects[i]).value: " + (objects[i]).value);

                                //TODO: deal with array of properties
                                if (this[(objects[i]).property] == (objects[i]).value) {
                                    (objects[i]).task(this);
                                    (objects[i]).found++;
                                }
                            }
                        });

                        // checking required count
                        var pass = true;
                        for (var i = 0; i < objects.length; i++) {
                            //                console.log(objects[i]);

                            if ((objects[i]).require && (objects[i]).found < (objects[i]).require) {
                                pass = false;
                            }
                        }

                        //            console.log("pass: " + pass);
                        if (!pass) {
                            setTimeout(work, 100);
                        }
                    }

                    work();

                });

                if (callback)
                    callback();
            };  // end of mooc_traverse

            // fix width. Inefficient - hopefully this will be changed to a function that will work with mooc_traverse
            var mooc_adjustWidth = function (frame) {
                frame.traverse(function () {
                    var tmp = $(this).css('min-width');
                    if (tmp != '0px' || tmp != '-webkit-min-content') {
                        $(this).css('min-width', 0);
                    }
                });
            };

            var mooc_hide = function (object) {
                //console.log("mooc_hide()");
                $(object).hide();
            };

            var adjustTextarea = function (object) {
                console.log("adjustTextarea()");
                $(object).css('width', '100%');
            };

            var mooc_rename_to_save = function (object) {
                console.log("mooc_rename_to_save()");
                $(object).html('Save');
            };

            var mooc_adjustFonts = function (object) {
                console.log("mooc_adjustFonts()");
                $(object).css('font-size', '16px');
                $(object).css('font-family', 'Istok Web, Arial, Helvetica, sans-serif');
            };

            var callOnBlurTasks = function (object) {
                console.log("helper injected");
                $(object).css('font-size', '16px');
                $(object).css('font-family', 'Istok Web, Arial, Helvetica, sans-serif');
            };

            var cleanChecklist = function () {
                mooc_traverse($('.frame_checklist'), [
                    //{property: 'tagName', value: 'BODY', task: callOnBlurTasks},
                    {property: 'className', value: 'dhdg_1', task: mooc_hide, require: 1},
                    {property: 'id', value: 'd_page_title', task: mooc_hide, require: 1},
                    {property: 'id', value: 'z_b', task: mooc_hide, require: 1},
                    {property: 'className', value: 'D2LSeparator', task: mooc_hide, require: 1}
                ], function () {
                    //callback function
                    mooc_adjustWidth($('.frame_checklist'));
                    console.debug('adjusted checklist width');
                });

            };


            var $checklist = $('iframe.frame_checklist');
            if ($checklist.length > 0) {
                cleanChecklist();
            }


        });  // end of $(function){}




/* hack to insert page title into printed page when the D2L "print" button is pressed */

	// tell d2l the page isn't printable .... this will prevent it attaching its own print routine to the print button */

	var printdiv=$("[data-isprintable=True]", window.top.document)[0];

	$(printdiv).attr("data-isprintable","False");

	//find all the d2l "buttons".  Note these may be of class 'vui-button' (pre-Daylight) or of class 'd2l-button' (Daylight) */

	var buttonsList=$('.vui-button, .d2l-button', window.top.document);
	// grab the "Print" button -- the button in the list above that has the text "Print"
	var printbutton=buttonsList.filter(':contains("Print")');


	//attach the PrintContent() routine to the D2L printbutton


	printbutton.click(function() {
			var pageTitle=$(".d2l-page-main .d2l-page-header .d2l-page-title-c form:first-of-type > label",window.top.document).text();
			var contentframe = $('iframe', window.top.document)[0];
			contentframe.contentDocument.title=pageTitle;
			var pageTitle="<div class='col-xs-12 pageTitlePrint'><h2>"+pageTitle+"</h2></div>";
			$(".pdf-link").parent().parent().append(pageTitle);
		   	contentframe.contentWindow.focus();
		   	contentframe.contentWindow.print();
          	$(".pageTitlePrint").remove();
    });


/* show/hide year options as per tickboxes set in edit mode */

	$(".level1check").hide();
	$(".level1check").parent().hide();
	$(".level1check:checked").parent().show();


    });  // end of domReady
});  // end of require
