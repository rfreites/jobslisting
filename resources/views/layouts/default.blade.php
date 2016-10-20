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
		
			<nav class="navbar navbar-full navbar-light bg-faded">
				<div class="container">
					@if($currentUser)
					<a class="navbar-brand" href="{{ route('jobs_list_path') }}">Jobs4Devs</a>
					<div class="collapse navbar-toggleable-xs pull-xs-right" id="exCollapsingNavbar2">
				    	<ul class="nav navbar-nav">
					      	<li class="nav-item btn-group">
					        	<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{{$currentUser->username}}</a>
					        	<div class="dropdown-menu" aria-labelledby="Preview">
									<a class="dropdown-item" href="#">Mi Stack</a>
									<a class="dropdown-item" href="#">Mi currículum</a>
									<a class="dropdown-item" href="#">Configuración</a>
									<a class="dropdown-item" href="{{ route('auth_destroy_path') }}">Cerrar Sesion</a>
								</div>
					      	</li>
				    	</ul>
				  	</div>
					@else
					<a class="navbar-brand" href="{{ route('jobs_list_path') }}">Jobs4Devs</a>
					<div class="collapse navbar-toggleable-xs pull-xs-right" id="exCollapsingNavbar2">
				    	<ul class="nav navbar-nav">
					      	<li class="nav-item btn-group">
					      		<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Iniciar Sesion</a>
					        	<div class="dropdown-menu" aria-labelledby="Preview">
									<a class="dropdown-item" href="{{ route('auth_store_path') }}">Usuario</a>
									<a class="dropdown-item" href="{{ route('auth_empresa_show_path') }}">Empresa</a>
								</div>
					      	</li>
				    	</ul>
				  	</div>
					@endif
					<button class="navbar-toggler hidden-sm-up pull-xs-right" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2" aria-controls="exCollapsingNavbar2" aria-expanded="false" aria-label="Toggle navigation">
				    &#9776;
				  	</button>			  	
				</div>
			</nav>
		
		
			
		
				
		@yield('content-app')

		@yield('javascript-app')
		<script src="{{ elixir('dist/application.js') }}"></script>
	</body>
</html>