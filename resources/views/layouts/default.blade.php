<!DOCTYPE html>
<html lang="">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Title Page</title>

		<link rel="stylesheet" href="{{ elixir('css/app.css') }}">
		@yield('css-app')
	</head>
	<body>
		@yield('content-app')

		@yield('javascript-app')
		<script src="{{ elixir('dist/application.js') }}"></script>
	</body>
</html>