'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var gulp_jspm = require('gulp-jspm');
var browserSync = require('browser-sync').create();

//////////////////////////////////////////////////////
// Copy Tasks
//////////////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('build:clean', function (cb) {
  del([
    './_build/assets',
    './_build/views',
    './_build/main.bundle.js'
  ])
    .then(function () {
      cb();
    });
});

// create build directory of all files
gulp.task('build:copy', [
  'build:clean',
  'build:views',
  'build:assets'
]);

gulp.task('build:views', function () {
  return gulp.src(['./client/views/**/*.html'])
    .pipe(gulp.dest('./_build/views'));
});

gulp.task('build:assets', function () {
  return gulp.src(['./client/assets/**/*'])
    .pipe(gulp.dest('./_build/assets'));
});

//////////////////////////////////////////////////////
// Bundle JS Files to a Single File
//////////////////////////////////////////////////////

gulp.task('bundleJS', function () {
  return gulp.src('./client/js/main.js')
    .pipe(gulp_jspm({
      selfExecutingBundle: true
    }))
    .pipe(gulp.dest('./_build/'));
});

//////////////////////////////////////////////////////
// Build Tasks
//////////////////////////////////////////////////////

gulp.task('build:serve', function () {
  browserSync.init({
    server: './_build'
  });
});


gulp.task('build', function (callback) {
  runSequence(
    'build:clean',
    ['build:views', 'build:assets', 'bundleJS'],
    'build:serve',
    callback);

});
