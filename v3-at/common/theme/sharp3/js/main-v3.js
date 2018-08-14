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
        'printing':{
			deps:['jquery']
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

		// add url below embedded videos for print versions
		$(".embed-responsive").each( function(){
			$(this).after("<p class='printonly'>"+$(this).find("iframe[src]").attr("src")+"</p>")
		});


// capture the ctrl-P print command and trigger the correct print function instead

 	$(window.top.document).keydown(function(event) {
         if ((event.ctrlKey||event.metaKey) && (event.which == 80)) { //cntrl + p
      	     event.preventDefault();
             printContent();
         }

        function printContent() {
		var contentframe=$('iframe',window.top.document)[0];
		console.log(contentframe);
		contentframe.contentWindow.focus();
		contentframe.contentWindow.print();
    	}
     });

	$(document).keydown(function(event) {
	         if ((event.ctrlKey||event.metaKey)  && (event.which == 80)) { //cntrl + p or command-p on mac
	      	     event.preventDefault();
	             printContent();
	         }

	        function printContent() {
			var contentframe=$('iframe',window.top.document)[0];
			contentframe.contentWindow.focus();
			contentframe.contentWindow.print();
	    	}
     });

		$('.pdf-link').click(function(){
			var contentframe=$('iframe',window.top.document)[0];
			contentframe.contentWindow.focus();
			contentframe.contentWindow.print();
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
                                                                                          };

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


        });

    });
});
