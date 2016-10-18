@extends('layouts.default')

@section('content-app')

<div class="container">
	<div class="col-md-4 offset-sm-4 login-form">
		<div class="panel panel-default">
			<div class="panel-heading">
			<h3 class="panel-title"><strong>Sign in </strong></h3>
				<div><a href="#">Forgot password?</a></div>
			</div>

			<div class="panel-body">
				<form role="form">
					<div class="alert alert-danger">
						<a class="close" data-dismiss="alert" href="#">×</a>Incorrect Username or Password!
					</div>
					<div class="input-group m-t-2">
						<span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>
						<input id="login-username" type="text" class="form-control" name="username" value="" placeholder="username or email">                                        
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

@stop