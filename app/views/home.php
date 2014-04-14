<!doctype html>
<html lang="en" ng-app="app">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="/assets/ico/favicon.ico">
  <title>Team Leah/James</title>
  <link href="/assets/css/frontend.css" rel="stylesheet">
  <script src="/assets/js/frontend.js"></script>
  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->
  <script>
    angular.module("app").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
  </script>
</head>
<body data-spy="scroll" data-target=".navbar">

  <nav class="navbar navbar-fixed-top" role="navigation">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-nav">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/#/"><span class="sr-only">Team Leah/James</span></a>
    </div>
    <div class="collapse navbar-collapse" id="navbar-nav">
      <ul class="nav navbar-nav">
        <li id="nav-bridalparty"><a href="/#/bridalparty"><span class="sr-only">Bridal Party</span></a></li>
        <li id="nav-ceremony"><a href="/#/ceremony"><span class="sr-only">Ceremony</span></a></li>
        <li id="nav-rsvp"><a href="#rsvp"><span class="sr-only">R.S.V.P.</span></a></li>
        <li id="nav-reception"><a href="/#/reception"><span class="sr-only">Reception</span></a></li>
        <li id="nav-gifts"><a href="/#/gifts"><span class="sr-only">Gifts</span></a></li>
        <li id="nav-travel"><a href="/#/travel"><span class="sr-only">Travel Info</span></a></li>
        <li id="nav-contact"><a href="/#/contact"><span class="sr-only">Get In Touch</span></a></li>
      </ul>
    </div>
  </nav>

  <div class="container" id="flowers">
    <span class="sr-only">Eat, Drink, And Be Married</span>
    <ul class="nav nav-justified" id="ico">
      <li id="ico-shortsweet"><a href="/#/"><span class="sr-only">The Short &amp; Sweet Version</span></a></li>
      <li id="ico-bridalparty"><a href="/#/bridalparty"><span class="sr-only">Bridal Party</span></a></li>
      <li id="ico-ceremony"><a href="/#/ceremony"><span class="sr-only">Ceremony</span></a></li>
      <li id="ico-rsvp"><a href="/#/rsvp"><span class="sr-only">R.S.V.P.</span></a></li>
      <li id="ico-reception"><a href="/#/reception"><span class="sr-only">Reception</span></a></li>
      <li id="ico-gifts"><a href="/#/gifts"><span class="sr-only">Gifts</span></a></li>
      <li id="ico-travel"><a href="/#/travel"><span class="sr-only">Travel Info</span></a></li>
      <li id="ico-contact"><a href="mailto:teamleahjames@gmail.com?subject=Yo Guys!"><span class="sr-only">Get In Touch</span></a></li>
    </ul>
  </div>

  <div ng-view class="reveal-animation"></div>

</body>
</html>
