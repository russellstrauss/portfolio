var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream'); // required to dest() for browserify
var concat = require('gulp-concat');
var notifier = require('node-notifier');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('sass', function () {
	return gulp.src('./assets/sass/style.scss')
	.pipe(sass().on('error', sass.logError)) // .on('error', sass.logError) prevents gulp from crashing when saving a typo or syntax error
	.pipe(gulp.dest('./'));
});

gulp.task('javascript', function() {
		
	var bundleStream = browserify('./assets/js/main.js').bundle().on('error', function(err) {

		console.log(err.stack);
		notifier.notify({
			'title': 'Browserify Compilation Error',
			'message': err.message
		});
		this.emit('end');
	});

	return bundleStream
		.pipe(source('main.js'))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('./assets/js/'));
});

gulp.task('validateJS', function() {
	return gulp.src(['./assets/js/**/*.js', '!./assets/js/bundle.js'])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('watch', function() {
	gulp.watch('./assets/sass/**/*.scss', ['sass']);
	gulp.watch(['./assets/js/**/*.js', '!./assets/js/bundle.js'], ['javascript']);
});

// Default Task
gulp.task('default', ['javascript', 'sass', 'watch']);