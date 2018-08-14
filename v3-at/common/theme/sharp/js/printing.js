
 $(function(){
 	$(window.top.document).keydown(function(event) {
         if (event.ctrlKey==true && (event.which == 80)) { //cntrl + p
      	     event.preventDefault();
      	     console.log('ctrl-p pressed');
             printContent();
         }

        function printContent() {
		var contentframe=$('iframe',window.top.document)[0];
		console.log(contentframe);
		contentframe.contentWindow.focus();
		contentframe.contentWindow.print();
    	}
     });
});
