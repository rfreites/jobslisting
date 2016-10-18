const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    mix.sass('app.scss')
       .copy(
          'node_modules/jquery/dist/jquery.js',
          'resources/assets/js'
        )
       .copy(
          'node_modules/bootstrap/js/tests/vendor/tether.min.js',
          'resources/assets/js'
        )
       .copy(
          'node_modules/bootstrap/dist/js/bootstrap.js',
          'resources/assets/js'
        )
       .webpack(
          'resources/assets/js/app.js',
          'resources/assets/js/main.js'
        )
       .scripts([
          'jquery.js',
          'tether.min.js',
          'bootstrap.js',
          'main.js'
        ], 'public/dist/application.js')
       .version(['public/css/app.css','public/dist/application.js'])
       .browserSync({
        proxy: 'http://laravelapptest.app/'
       });
});