<?php
header("Content-type: text/css");

function convertRelativePath($old, $new, $filePath)
{
// echo readfile("/var/www/vhosts/templates/common/vendor/bootstrap/3.1.1/css/bootstrap.min.css");
// echo readfile("../../../common/vendor/bootstrap/3.1.1/css/bootstrap.min.css");

//read the entire string
// $str=file_get_contents('../../../common/vendor/bootstrap/3.1.1/css/bootstrap.min.css');
	$str = file_get_contents($filePath);

//replace something in the file string - this is a VERY simple example

// $old = 'url(\'../fonts';
// $new = 'url(\'https://dementia.health.utas.edu.au/templates/common/vendor/bootstrap/3.1.1/fonts';

// $str=str_replace('url(\'../fonts', 'url(\'https://dementia.health.utas.edu.au/templates/common/vendor/bootstrap/3.1.1/fonts',$str);

	return str_replace($old, $new, $str);
}


// echo convertRelativePath("url('../fonts", "url('https://dementia.health.utas.edu.au/templates/common/vendor/bootstrap/3.1.1/fonts", "/var/www/vhosts/templates/common/vendor/bootstrap/3.1.1/css/bootstrap.css");
// echo convertRelativePath("url('../img", "url('https://dementia.health.utas.edu.au/templates/bdc/v2/img", "layout.css");

// $str=file_get_contents($filePath);
// echo str_replace('url(\'../fonts', 'url(\'https://dementia.health.utas.edu.au/templates/common/vendor/bootstrap/3.1.1/fonts',file_get_contents("/var/www/vhosts/templates/common/vendor/bootstrap/3.1.1/css/bootstrap.css"));
// echo str_replace('url(\'../fonts', 'url(\'https://dementia.health.utas.edu.au/templates/common/vendor/bootstrap/3.1.1/fonts',file_get_contents("layout.css"));

// echo readfile("layout.css");
// echo readfile("style.css");
?>

