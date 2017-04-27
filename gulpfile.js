// Include gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var path = require('path');

var root = "./";
var minimal = "wp-content/themes/minimal/";
var rework = "wp-content/themes/rework/";
var theme = rework;


gulp.task('sass', function () {
	return gulp.src(root + theme + 'sass/style.scss')
	.pipe(sass().on('error', sass.logError))
		.pipe(sass({
			paths: [ path.join(__dirname, 'sass', 'includes') ]
		}))
		.pipe(gulp.dest(root + theme));
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch(root + theme + 'sass/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'watch']);