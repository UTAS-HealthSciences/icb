 $(function(){
 	$(window.top.document).keydown(function(event) {
         if (event.ctrlKey==true && (event.which == 80)) { //cntrl + p
      	     event.preventDefault();
      	     console.log('ctrl-p pressed');
             printContent();
         }

        function printContent() {
		var pageTitle=$(".d2l-page-main .d2l-page-header .d2l-page-title-c form:first-of-type > label",window.top.document).text();
		var contentframe=$('iframe',window.top.document)[0];
		contentframe.contentDocument.title=pageTitle;
		pageTitle="<div class='col-xs-12 pageTitlePrint'><h2>"+pageTitle+"</h2></div>";
		$(".pdf-link").parent().parent().append(pageTitle);
		contentframe.contentWindow.focus();
		contentframe.contentWindow.print();
		$(".pageTitlePrint").remove();
    	}
     });
});
