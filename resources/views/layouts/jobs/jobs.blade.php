@extends('./layouts.default')

@section('content-app')
	<div class="container">
		<div class="row">
			<div class="col-lg-6 offset-lg-3 m-t-3">
				<div class="list-group">
				  <div class="list-group-item list-group-item-action">
				    <h5 class="list-group-item-heading">{{$job->title}}</h5>
				    <small>Publicado: <time datetime="{{$job->created_at}}">{{$job->created_at}}</time></small>
				    <p class="list-group-item-text">{{$job->description}}<br/>
				    Fecha de contratatión: <time datetime="{{$job->hire_date}}">{{$job->hire_date}}</time><br/>
				    Vacantes: {{$job->number_of_vacancies}}<br/>
				    Salario ofertado: $ {{$job->salary}}</p>
				   	@if($currentUser && $currentUser->flag == 'company')
					<a href="{{route('job_edit_path', ['slug' => $job->slug])}}" class="btn btn-defautl btn-primary">Editar</a>
				   	@endif  	
				  </div>
				</div>
			</div>
		</div>
	</div>
@stop