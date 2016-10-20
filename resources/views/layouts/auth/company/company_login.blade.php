@extends('././layouts.default')

@section('content-app')
<div class="container">
	<div class="row">
		<div class="col-lg-6 offset-lg-3 login-form">

  <div class="panel panel-default">
				<div class="panel-heading">
				<h3 class="panel-title"><small>Sign in User</small></h3>
					<div><a href="#">Forgot password?</a></div>
				</div>
	
				<div class="panel-body">
					<form role="form" method="post" action="{{ route('auth_empresa_login_path') }}">
						
						@if($errors)
						
						@foreach($errors->all() as $error)
						<div class="alert alert-danger">
							<a class="close" data-dismiss="alert" href="#">×</a>{{$error}}
						</div>
						@endforeach
						
						@endif
						
						{{ csrf_field() }}
						<div class="input-group m-t-2">
							<span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>
							<input id="login-email" type="email" class="form-control" name="email" value="" placeholder="email">                                        
						</div>
	
						<div class="input-group m-t-2">
							<span class="input-group-addon"><i class="fa fa-key" aria-hidden="true"></i></span>
							<input id="login-password" type="password" class="form-control" name="password" placeholder="password">
						</div>
	
						<div class="input-group">
							<div class="checkbox" style="margin-top: 0px;">
								<label>
									<input id="login-remember" type="checkbox" name="remember" value="1"> Remember me
								</label>
							</div>
						</div>
	
						<button type="submit" class="btn btn-success">Sign in</button>
	
						<hr style="margin-top:10px;margin-bottom:10px;" >
	
						<div class="form-group">
	
							<div style="font-size:85%">
								Don't have an account! 
								<a href="#" onClick="$('#loginbox').hide(); $('#signupbox').show()">
									Sign Up Here
								</a>
							</div>					
						</div> 
					</form>
				</div>
			</div>
  			</div>
		</div>
	</div>
	
@stop