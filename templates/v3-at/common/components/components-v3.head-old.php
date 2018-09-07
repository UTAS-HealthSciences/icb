<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]--><!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8"> <![endif]--><!--[if IE 8]>
<html class="no-js lt-ie9"> <![endif]--><!--[if gt IE 8]><!--><!DOCTYPE html>
<html class="no-js">
<!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible"
          content="IE=edge,chrome=1">
    <title>DIT - Components V3 </title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">

    <?php

    switch($_GET['style'])
    {
        case 'professional':
            echo '<link rel="stylesheet" href="theme/professional/css/main-v3.css" type="text/css">';
            $style = 'Professional';
            break;

        default:
            $style = 'Creative';
            echo '<link rel="stylesheet" href="css/main-v3.css" type="text/css">';

    }
    ?>


    <link rel="stylesheet" href="../vendor/bootstrap-validator/0.4.5/css/bootstrapValidator.min.css" type="text/css">

    <script src="../vendor/modernizr-2.6.2-respond-1.1.0.min.js" type="text/javascript"></script>

    <script src="../vendor/jquery-1.11.1.min.js" type="text/javascript"></script>
    <script src="../vendor/bootstrap.min.js" type="text/javascript"></script>
    <script src="../vendor/bootstrap-validator/0.4.5/js/bootstrapValidator.min.js" type="text/javascript"></script>
    <script src="../vendor/zero-clipboard/ZeroClipboard.min.js" type="text/javascript"></script>

    <script src="js/dit-component-copy.js" type="text/javascript"></script>

    <script type="application/javascript">
	
    
        $(function(){
            // Select first tab of each option
            $('.option-pills').each(function(){
                $(this).find('a:first').tab('show')
            })


            $('.dit-spacer').removeClass("invisible");

        })
    </script>

    <script src="../vendor/jquery-ui.js" type="text/javascript"></script>
    <script src="js/interactive.js" type="text/javascript"></script>

    <style>

        #header .dit-logo {
            font-family: 'Rockwell', sans-serif;
        }

        body {
            background: #B1CECB, url('img/tiles/dit_honey_200.png') repeat center top;

            background: url('img/tiles/dit_honey_200.png'), -webkit-linear-gradient(#B1CECB, #D9F7F4);  /*For Safari 5.1 to 6.0*/
            background: url('img/tiles/dit_honey_200.png'), -o-linear-gradient(#B1CECB, #D9F7F4);  /*For Opera 11.1 to 12.0*/
            background: url('img/tiles/dit_honey_200.png'), -moz-linear-gradient(#B1CECB, #D9F7F4);  /*For Firefox 3.6 to 15*/
            background: url('img/tiles/dit_honey_200.png'), linear-gradient(#B1CECB, #D9F7F4);  /*Standard syntax*/

            background-repeat: repeat, no-repeat;
            background-color: #D9F7F4;
        }

        .component {
            padding: 45px;
            margin: 20px -15px;
            border-left: 1px solid #eee;
        }

        .btn-clipboard {
            padding: 5px 8px;
            font-size: 12px;
            color: #777;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid #e1e1e8;
            border-radius: 0 4px 0 4px;
        }
        .btn-clipboard-hover {
            color: #fff;
            background-color: #563d7c;
            border-color: #563d7c;
            cursor: pointer;
        }

        .btn-clipboard-active {
            color: #eee;
            background-color: #362d5a;
            border-color: #563d7c;
            cursor: pointer;

        }

        .option-pills {
            margin-top: 15px;
        }

        .option-pills:before {
            font-size: 12px;
            font-weight: 700;
            color: #959595;
            text-transform: uppercase;
            letter-spacing: 1px;
            content: "Options";
            margin-bottom: 10px;
        }

    </style>
</head>
<body>
<!--[if lt IE 7]><p class="chromeframe">You are using an <strong>outdated</strong> browser. Please
    <a href="http://browsehappy.com/">upgrade your browser</a>. </p><![endif]-->
<div id="container"
     class="container">
    <div id="header"
         class="row">
        <div class="col-xs-12 visible-xs">
            <img class="center-block"
                 src="https://health.utas.edu.au/templates/v3-at/common/img/logos/utas_180.png"
                 alt="UTas logo"
                 name="utas-logo">
        </div>
        <div class="col-sm-7">
            <h1 class="dit-logo">Digital Innovation Team</h1>

            <h2>Template Builder - <?php echo $style; ?></h2>
           <p style="margin: 20px 0 0 0;">Contact: <a href="mailto:Digital.Team@utas.edu.au?Subject=Components%20V3">Digital.Team@utas.edu.au</a></p>
        </div>
        <div class="col-sm-5 hidden-xs text-right">
            <img class="pull-right"
                 src="https://health.utas.edu.au/templates/v3-at/common/img/logos/utas_180.png"
                 alt="UTas logo"
                 name="utas-logo">
        </div>
    </div>
    <!-- end header -->
    <div id="main"
         class="row">
        <div class="col-lg-12">

