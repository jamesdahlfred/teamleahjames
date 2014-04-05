<!doctype html>
<html lang="en" ng-app="teamLeahJames">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="/assets/ico/favicon.ico">
  <title>Team Leah-James</title>
  <link href="/assets/css/backend.css" rel="stylesheet">
  <script src="/assets/js/backend.js"></script>
  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body data-spy="scroll" data-target=".navbar">

  <nav class="navbar navbar-fixed-top" role="navigation">
    <div class="container">
      <ul class="nav navbar-nav">
        <li id="nav-names"><a href="#flowers"><span class="sr-only">Team Leah/James</span></a></li>
        <li id="nav-bridalparty"><a href="#bridalparty"><span class="sr-only">Bridal Party</span></a></li>
        <li id="nav-ceremony"><a href="#ceremony"><span class="sr-only">Ceremony</span></a></li>
        <li id="nav-reception"><a href="#reception"><span class="sr-only">Reception</span></a></li>
        <li id="nav-travel"><a href="#travel"><span class="sr-only">Travel Info</span></a></li>
        <li id="nav-rsvp" class="navbar-right"><a href="#rsvp"><span class="sr-only">R.S.V.P.</span></a></li>
      </ul>
    </div>
  </nav>

  <div class="container" id="flowers">
    <span class="sr-only">Eat, Drink, And Be Married</span>
    <div id="ico-bridalparty"><a href="#bridalparty"><span class="sr-only">Bridal Party</span></a></div>
    <div id="ico-ceremony"><a href="#ceremony"><span class="sr-only">Ceremony</span></a></div>
    <div id="ico-reception"><a href="#reception"><span class="sr-only">Reception</span></a></div>
    <div id="ico-travel"><a href="#travel"><span class="sr-only">Travel Info</span></a></div>
  </div>

  <hr />

  <div class="container well">
		<div class="row">
			<div class="col-md-4">
				<h3>Your RSVP Code</h3>
        <div ng-controller="RsvpController">
          <form name="form" novalidate>
            <input type="text" ng-model="code" size="6" placeholder="code is on your invite" required />
            <div ng-show="form.code.$dirty && form.code.$invalid">Invalid:
              <span ng-show="form.code.$error.required">Type in the code on your invite. Capitalization doesn&#39;t matter.</span>
            </div>
            <button class="btn btn-primary pull-right" ng-click="checkCode(form.code)" ng-disabled="form.$invalid || isUnchanged(form.code)">RSVP</button>
          </form>
          <form name="form2" novalidate>
            Hey there, {{ first_name }} {{ last_name }}!
          </form>
        </div>
			</div>
		</div>
	</div>

</body>
</html>
