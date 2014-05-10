<!DOCTYPE html>
<html lang="en-US">
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		<h2>Message via teamleahjames.com</h2>
    <p>
      <strong>From:</strong> {{ $name }} &lt;{{ $email }}&gt;<br />
      <strong>Sent:</strong> {{ $timestamp }}
    </p>
		<pre>
			{{ $note }}
		</pre>
	</body>
</html>