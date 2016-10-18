@extends('layouts.default')

@section('content-app')

<div class="container">

@if ($total_results > 0)
    <div class="alert alert-success m-t-2" role="alert">
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    		<span aria-hidden="true">&times;</span>
  		</button>
  		Se encontraron resultados! <strong>{{$total_results}}</strong>.
	</div>
@else
    <div class="alert alert-danger" role="alert">
  		<strong>Ooops no se encontraron resultados para tu busqueda!</strong>	
  	</div>
@endif
	
	@foreach($jobs as $job)
	<div class="list-group m-t-1">
	  <a href="{{ route( 'job_show_path', ['id' => $job->slug] ) }}" class="list-group-item list-group-item-action">
	  	<span class="tag tag-default tag-pill pull-xs-right">5</span>
	    <h5 class="list-group-item-heading">{{$job->title}}</h5>
	    <small>Publicado: <time datetime="{{$job->created_at}}">{{$job->created_at}}</time></small>
	    <p class="list-group-item-text">{{$job->description}}<br/>
	    Fecha de contratatión: <time datetime="{{$job->hire_date}}">{{$job->hire_date}}</time><br/>
	    Vacantes: {{$job->number_of_vacancies}}<br/>
	    Salario ofertado: $ {{$job->salary}}</p>
	  </a>
	  <h6></h5><a href="#"><span class="tag tag-default">{{$job->company->name}}</span></a></h6>
	</div>
	@endforeach
	{{ $jobs->links() }}
</div>

@stop