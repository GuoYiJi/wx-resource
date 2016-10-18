let gulp = require('gulp'),
  watch = require('gulp-watch'),
  watchPath = require('gulp-watch-path'),
  combiner = require('stream-combiner2'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  changed = require('gulp-changed');

let build = require('./gulplib/build.js')



let srcPath = './src'
let buildPath = './build'
gulp.task('watch', ['build:dev'], function (file){
  build.watch()
})
gulp.task('build:dev', () => {
	build.css('src/**/*.scss')
	build.js('src/**/*.js')
	build.template('src/**/*.html')
	build.assets('src/**/*.+(json|wxml|wxss|png|gif|jpeg)')
})
gulp.task('build:pre', () => {
	build.css('src/**/*.scss', 'pre')
	build.js('src/**/*.js', 'pre')
	build.template('src/**/*.html', 'pre')
	build.assets('src/**/*.+(json|wxml|wxss|png|gif|jpeg)', 'pre')
})

// browserify
gulp.task("browserify", function () {
    var b = browserify({
        entries: "src/app.js"
    });

    return b.bundle()
      .pipe(gulp.dest("wexin"));
});
