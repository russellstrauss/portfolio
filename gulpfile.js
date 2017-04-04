// Include gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var path = require('path');

var root = "./";
var theme = "/wp-content/themes/minimal/";


gulp.task('sass', function () {
	return gulp.src('./wp-content/themes/minimal/sass/style.scss')
	.pipe(sass().on('error', sass.logError))
		.pipe(sass({
			paths: [ path.join(__dirname, 'sass', 'includes') ]
		}))
		.pipe(gulp.dest('./wp-content/themes/minimal/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('./wp-content/themes/minimal/sass/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'watch']);