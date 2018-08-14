doLoadSurveys();

function doLoadSurveys(){
	if (window.jQuery){
		loadSurveys();
	}
	else{
		console.log('waiting for JQuery');
		setTimeout(function() { doLoadSurveys() }, 50);
	}
}

function loadSurveys(){
	$('.embedded-survey-tool').each(
		function(){
			var $surveyheight;
			var $surveylink;
			var $surveywidth;
			if($(this).find('.surveylink').find('a').attr('href').length>0){

				//get src for survey
				$surveylink=$(this).find('.surveylink').find('a').attr('href');

				// get/set iframe height
				if($(this).find('.surveyheight').html().replace(/&nbsp;/g,'').trim().length>0){
			 		$surveyheight=$(this).find('.surveyheight').html().replace(/&nbsp;/g,'').trim();
				}else{
					$surveyheight='1000';
				}
				// get/set iframe width
				if($(this).find('.surveywidth').html().replace(/&nbsp;/g,'').trim().length>0){
					 $surveywidth=$(this).find('.surveywidth').html().replace(/&nbsp;/g,'').trim();
				}else{
					$surveywidth='100%';
				}

		}
		$(this).append("<iframe src='"+$surveylink+"' style='width:"+$surveywidth +"; height:"+$surveyheight+"px;' ></iframe>")
	});
}




