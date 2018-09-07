// JavaScript Document
// Helper functions

function isFrame(obj) {
	return obj.tagName && (obj.tagName.toUpperCase() == 'IFRAME' || obj.tagName.toLowerCase() == 'frame');
}

// Note: does not wait for iframe to load
// $.fn.traverse = function(func) {
// 	for (var i = 0; i < this.length; i++) {
// 		var from = this[i];
// 
// 		if (isFrame(from)) {
// 			from = from.contentDocument;
// 		}
// 		$(from).children().traverse(func);
// 
// 		func.apply(from);
// 	}
// }

// Note: onreadystatechange and readyState are methods of contentDocument
// $.fn.traverse = function(func) {
// 	for (var i = 0; i < this.length; i++) {
// 		var from = this[i];
// 
// 		if (isFrame(from) && from.readyState != 'complete') {
// 
// 			//set callback for onReadyStateChanged event 
// 			from.onreadystatechange = function() {
// 				
// 				if(from.readyState == 'complete')
// 				{
// 					from = from.contentDocument;
// 					$(from).children().traverse(func);
// 					func.apply(from);
// 				}
// 			};
// 		} else {
// 			if (isFrame(from)) {
// 				from = from.contentDocument;
// 			}
// 			$(from).children().traverse(func);
// 
// 			func.apply(from);
// 		}
// 	}
// }

//Note: doesn't seem to wait...
// $.fn.traverse = function(func) {
// 	for (var i = 0; i < this.length; i++) {
// 		var from = this[i];
// 
// 		if (isFrame(from) && from.contentDocument.readyState != 'complete') {
// 			from = from.contentDocument;
// 			
// 			//set callback for onReadyStateChanged event 
// 			from.onreadystatechange = function() {
// 				
// 				if(from.readyState == 'complete')
// 				{
// 					
// 					$(from).children().traverse(func);
// 					func.apply(from);
// 				}
// 			};
// 		} else {
// 			if (isFrame(from)) {
// 				from = from.contentDocument;
// 			}
// 			$(from).children().traverse(func);
// 
// 			func.apply(from);
// 		}
// 	}
// }

//Notes: doesn't wait...
$.fn.traverse = function(func) {
	
	function onTraverse(from, func) {
		return function() {
			$(from).children().traverse(func);
			func.apply(from);
		};
	}
	
	for (var i = 0; i < this.length; i++) {
		var from = this[i];

		if (isFrame(from)) {
			// from = from.contentDocument;
			$(from).ready(onTraverse(from.contentDocument, func));
		}
		else
		{
			// onTraverse(from, func)();
			$(from).children().traverse(func);
			func.apply(from);
		}
		
	}
}

// Note: issue with scope
// $.fn.traverse = function(func) {
// 	for (var i = 0; i < this.length; i++) {
// 		var from = this[i];
// 
// 		if (isFrame(from)) {
// 			$(from).ready(
// 				function() {
// 					from = from.contentDocument;
// 					$(from).children().traverse(func);
// 					func.apply(from);
// 				}
// 			);			
// 		} else {
// 			$(from).children().traverse(func);
// 			func.apply(from);
// 		}
// 	}
// }


// $.fn.traverse = function(func) {
// 	function onTraverse(from, func) {
// 		return function() {
// 			$(from).children().traverse(func);
// 			func.apply(from);
// 		};
// 	}
// 
// 	for (var i = 0; i < this.length; i++) {
// 		var from = this[i];
// 
// 		if (isFrame(from)) {
// 			// $(from.contentDocument).ready( function() {
// 					from = from.contentDocument;
// 					$(from).children().traverse(func);
// 					func.apply(from);
// 			// });			
// 		} else {
// 			$(from).children().traverse(func);
// 			func.apply(from);
// 		}
// 	}
// }


function findElementById(id, from) {

	if (typeof from === 'undefined') from = document;

	if (!from) return;

	if (from.tagName && (from.tagName.toUpperCase() == 'IFRAME' || from.tagName.toLowerCase() == 'frame')) from = from.contentDocument;

	var result = from.getElementById(id);

	if (result) return result;

	var frames = Array.prototype.slice.call(from.getElementsByTagName('iframe'))
		.concat(Array.prototype.slice.call(from.getElementsByTagName('frame')));

	for (var i = 0; i < frames.length; i++) {
		if (!frames[i].contentDocument) continue;

		result = findElementById(id, frames[i].contentDocument);

		if (result) return result;
	}
}

function findElementsByClass(className, from) {
	var found = [];

	if (typeof from === 'undefined') from = document;

	if (!from) return found;

	if (from.tagName && (from.tagName.toUpperCase() == 'IFRAME' || from.tagName.toLowerCase() == 'frame')) from = from.contentDocument;

	var result = from.getElementsByClassName(className);

	//    for(var i = 0;i<result.length;i++)
	//        found.push(result[i]);

	if (result.length > 0) found = found.concat(Array.prototype.slice.call(result));

	var frames = Array.prototype.slice.call(from.getElementsByTagName('iframe'))
		.concat(Array.prototype.slice.call(from.getElementsByTagName('frame')));

	for (var i = 0; i < frames.length; i++) {
		if (!frames[i].contentDocument) continue;

		result = findElementsByClass(className, frames[i].contentDocument);

		//        for(var i = 0;i<result.length;i++)
		//            found.push(result[i]);
		if (result.length > 0) found = found.concat(Array.prototype.slice.call(result));
	}

	return found;
}



// function hideButtons() {
// 	try {
// 		findElementById('z_h')
// 			.style.display = "none";
// 		findElementById('z_g')
// 			.style.display = "none";
// 
// 	} catch (e) {
// 		setTimeout(hideButtons, 100);
// 	}
// }

function customiseNotes() {
	console.log("started customiseNotes()");
	
	//Note: for console testing
	var frame = $(findElementsByClass('frame_notes'));
	// var frame = $('.frame_notes');

	// hide save button
	// frame.each(function() {
	// 	$(findElementById('z_g', this))
	// 		.hide();
	// });

// don't want to hide save buttons for CAA500 students
//	console.log("Hiding save buttons")
//	frame.traverse(function() {
//		if (this.id == 'z_g') {
//			$(this).hide();	
//			console.log("hidden #"+this.id,+" ."+this.className);			
//		}
//	});
//	
	

	// hide submit button
	// frame.each(function() {
	// 		$(findElementById('z_h', this))
	// 			.hide();
	// 	});



// don't want to hide submit buttons from CAA500 students
//	console.log("Hiding submit buttons")
//	frame.traverse(function() {
//		if (this.id == 'z_h') {
//			console.log("found z_h");
//			$(this).hide();
//			console.log("hidden #"+this.id,+" ."+this.className);			
//		}
//	});

	// remove heading "Question 1"
	//TODO: check this interference
	// frame.each(function() {
	// 		$(findElementsByClass('dhdg_2', this))
	// 			.hide();
	// 	});
	frame.traverse(function() {
		if (this.className == 'dhdg_2') {
			console.log("found dhdg_2");
			$(this).hide();				
		}
	});

	// fix width
	console.log("Fixing widths")
	
	frame.traverse(function() {
		var tmp = $(this).css('min-width');
		if (tmp != '0px' || tmp != '-webkit-min-content') {
			$(this).css('min-width', 0);
			
			console.log("fixed width of #"+this.id,+" ."+this.className);
		}
	});

	//TODO: fix height
	//Note: $('#myIframe').css({height:$(this).parent('td').height()});
	//Note: $(f).traverse(function(){if(this.tagName=="DIV" || this.tagName=="IFRAME" || this.tagName=="FRAME")$(this).height('auto')})
	//Note:  $(f).traverse(function(){if(this.id=="d2l_body")$(this).height('auto')})

	// if (frame.find('div').css("height") == "100%") {
	// 		this
	// 	}

}


// $(this).traverse(function() {
// 	if (this.id == 'd2l_body') {
// 		var tmp = this;
// 	}
// });


function customiseChecklist() {
	console.log("started customiseChecklist()");
	
	//Note: for console testing - 
	var frame = $(findElementsByClass('frame_checklist'));
	// var frame = $('.frame_checklist');

	// remove main headings
	// frame.each(function() {
	// 		$(findElementById('d_page_title', this))
	// 			.hide();
	// 	});	
	console.log("Hiding titles")
	frame.traverse(function() {
		if (this.id == 'd_page_title') {		
			$(this).hide();	
			console.log("hidden #"+this.id,+" ."+this.className);
		}
	});
	

	// remove smaller heading
	//TODO: check this doesn't remove wanted stuff. (no id selector)
	// frame.each(function() {
	// 		$(findElementsByClass('dhdg_1', this))
	// 			.hide();
	// 	});	
		console.log("Hiding smaller heading");
	frame.traverse(function() {
		if (this.className == 'dhdg_1') {
			$(this).hide();	
			console.log("hidden #"+this.id,+" ."+this.className);		
		}
	});
	
	// fix width
	console.log("Fixing widths")
	frame.traverse(function() {
		var tmp = $(this).css('min-width');	
		if (tmp != '0px' || tmp != '-webkit-min-content') {
			$(this).css('min-width', 0);
			console.log("fixed width of #"+this.id,+" ."+this.className);
		}
	});
	console.log("finished customiseChecklist()");
}

// applies customisations to iframes
$(window).load(function(){
    // full load
//	customiseChecklist();
	customiseNotes();
});

$(function() {
	// DOM ready
});

// onbeforeunload
// window.onbeforeunload = iframeCallSubmit;

// function iframeCallSubmit() {
// 	document.getElementById('notes1')
// 		.contentDocument.getElementById('ctl_2')
// 		.contentDocument.getElementsByTagName('frame')[0].contentWindow.DoSubmitSurvey(1);
// }

//window.onbeforeunload = function() {
//	var note = $('.frame_notes');
//
//	for (var i = 0; i < notes.length; i++) {
//		note[i].contentDocument.getElementById('ctl_2')
//			.contentDocument.getElementsByTagName('frame')[0].contentWindow.DoSubmitSurvey(1);
//	}
//}
