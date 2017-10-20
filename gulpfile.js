var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream'); // required to dest() for browserify
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var gutil = require('gulp-util');

var minimal = './wp-content/themes/minimal/';
var rework = './wp-content/themes/rework/';
var theme = rework;

gulp.task('sass', function () {
	return gulp.src(theme + 'assets/sass/style.scss')
	.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError)) // .on('error', sass.logError) prevents gulp from crashing when saving a typo or syntax error
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(theme))
	.pipe(browserSync.stream()); // causes injection of styles on save
});

gulp.task('sync', ['sass'], function() {
	browserSync.init({
		open: true,
		proxy: {
			target: 'portfolio.dev'
		}
	});
});

var vendors = {
	merge: [
		theme + '/assets/vendors/js/jquery-3.2.1.min.js', 
		theme + '/assets/vendors/js/bootstrap.min.js',
		theme + '/assets/vendors/js/three.min.js'
	]
};

gulp.task('vendors', function() {
	return gulp.src(vendors.merge)
		.pipe(concat('vendors.js'))
		.pipe(gulp.dest(theme + 'assets/vendors/js'));
});

gulp.task('javascript', function() {

	var bundleStream = browserify(theme + 'assets/js/main.js').bundle();

	return bundleStream
		.pipe(source('main.js'))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest(theme + 'assets/js/'))
		.pipe(browserSync.stream());
		
		bundleStream.on('error', function(e) {
			gutil.log(e);
		});
});

gulp.task('watch', function() {
	gulp.watch(theme + 'assets/sass/**/*.scss', ['sass']);
	gulp.watch(theme + 'assets/js/**/*.js', ['javascript']);
});

// Default Task
gulp.task('default', ['vendors', 'javascript', 'sass', 'watch', 'sync']);