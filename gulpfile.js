var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');

//Browserify task
gulp.task('browserify', function () {
	gulp.src('src/main.js')
		.pipe(plumber())
		.pipe(browserify({transform : 'reactify', debug: true}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('public'))
});

gulp.task('default',['browserify']);

gulp.task('watch', ['browserify'], function (){
	gulp.watch('src/**/*.*', ['default']);
});

gulp.task('http', ['watch'], function (){
   gulp.src('public/')
   .pipe(webserver({
       livereload : true,
       directoryListing : false,
       open :true
   })) 
});
