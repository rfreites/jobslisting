@extends('layouts.default')

@section('content-app')
	<div class="container">
		<div class="row">
			<div class="col-md-8 offset-md-4">
				<form action="{{ route('jobs_create_path') }}" method="post">
				  	{{ csrf_field() }}
				    <div class="form-group row">
				      <label for="inputTitle" class="col-sm-2 col-form-label">Cargo</label>
				      <div class="col-sm-10">
				        <input type="text" class="form-control" id="inputTitle" placeholder='Ejemplo "Web Developer"' required>
				      </div>
				    </div>
				    <div class="form-group row">
				      <label for="inputDescription" class="col-sm-2 col-form-label">Descripción del cargo</label>
				      <div class="col-sm-10">
				        <input type="textarea" class="form-control" id="inputJobDescription" placeholder='Ejemplo "Desarrollos de sitios web"' rows="6" required>
				      </div>
				    </div>
				    <div class="form-group row">
				      <div class="offset-sm-2 col-sm-10">
				        <button type="submit" class="btn btn-primary" value="crear">Sign in</button>
				      </div>
				    </div>
			  	</form>
			</div>
		</div>
	</div>
@stop