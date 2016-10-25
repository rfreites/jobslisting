@if($errors)

	@foreach($errors->all() as $error)
		<div class="alert alert-danger">
			<a class="close" data-dismiss="alert" href="#">×</a>{{$error}}
		</div>
	@endforeach

@endif