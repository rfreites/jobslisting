@extends('layouts.default')

@section('content-app')
	<div class="container">
		<div class="row">
			<div class="col-md-8 offset-md-4">
				@include('partials.erros')
				<form action="{{route('job_patch_path', ['slug' => $job->slug ])}}" method="post">
				  	{{ csrf_field() }}
				  	<input type="hidden" name="_method" value="patch">
				    <div class="form-group row">
				      <label for="inputTitle" class="col-sm-2 col-form-label">Cargo</label>
				      <div class="col-sm-10">
				        <input type="text" name="title" value="{{ $job->title }}" class="form-control" id="inputTitle" placeholder='Ejemplo "Web Developer"'>
				      </div>
				    </div>
				    <div class="form-group row">
				      <label for="inputDescription" class="col-sm-2 col-form-label">Descripción del cargo</label>
				      <div class="col-sm-10">
				        <textarea class="form-control" name="description" id="inputJobDescription" placeholder='Ejemplo "Desarrollos de sitios web"' rows="9">{{ $job->description }}</textarea>
				      </div>
				    </div>
				    <div class="form-group row">
				      <label for="inputSalary" class="col-sm-2 col-form-label">Salario</label>
				      <div class="col-sm-4">
						<input type="number" name="salary" value="{{ $job->salary }}" min="0" class="form-control" id="inputSalary">				      
					  </div>
				    </div>
				    <div class="form-group row">
					  <label for="example-date-input" class="col-xs-2 col-form-label">Fecha de contratación</label>
					  <div class="col-xs-10">
					    <input class="form-control" type="date" id="hire_date" name="hire_date" value="{{ $job->hire_date }}">
					  </div>
					</div>				    
				    <div class="form-group row">
				      <label for="inputVacancy" class="col-sm-2 col-form-label">Vacantes</label>
				      <div class="col-sm-4">
						<input type="number" name="number_of_vacancies" value="{{ $job->number_of_vacancies }}" min="0" class="form-control" id="number_of_vacancies">				      
					  </div>
				    </div>
				    <div class="form-group row">
				      <div class="offset-sm-2 col-sm-10">
				        <button type="submit" class="btn btn-primary" value="crear">Actualizar</button>
				      </div>
				    </div>
			  	</form>
			  	<form action="{{route('job_delete_path', ['slug' => $job->slug] )}}" method="post">
			  		{{ csrf_field() }}
				  	<input type="hidden" name="_method" value="delete">
			  		<div class="form-group row">
				      <div class="offset-sm-2 col-sm-10">
				        <button type="submit" class="btn btn-danger btn-default" value="delete">Borrar oferta</button>
				      </div>
				    </div>
			  	</form>
			</div>
		</div>
	</div>
	
@stop
