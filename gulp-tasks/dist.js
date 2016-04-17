'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var gulp_jspm = require('gulp-jspm');
var htmlReplace = require('gulp-html-replace');
var browserSync = require('browser-sync').create();

//////////////////////////////////////////////////////
// Bundle JS Files to a Single File
//////////////////////////////////////////////////////

gulp.task('dist:js', function () {
  return gulp.src('client/js/boot.js')
    .pipe(gulp_jspm({
      selfExecutingBundle: true
    }))
    .pipe(gulp.dest('_build/'));
});

//////////////////////////////////////////////////////
// Inject JS/CSS files into index.html
//////////////////////////////////////////////////////

gulp.task('dist:inject', function () {
  return gulp.src('client/index.html')
    .pipe(htmlReplace({
      'js': 'main.bundle.js'
    }))
    .pipe(gulp.dest('_build/'));
});

//////////////////////////////////////////////////////
// Dist Build Tasks
//////////////////////////////////////////////////////

gulp.task('dist:serve', function () {
  browserSync.init({
    server: '_build'
  });
});


gulp.task('dist', function (callback) {
  runSequence(
    ['build:copy', 'dist:js'],
    'dist:inject',
    'dist:serve',
    callback);
});
