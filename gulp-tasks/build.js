'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var gulp_jspm = require('gulp-jspm');
var htmlReplace = require('gulp-html-replace');
var browserSync = require('browser-sync').create();

//////////////////////////////////////////////////////
// Copy Tasks
//////////////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('build:clean', function (cb) {
  del('./build/*')
    .then(function () {
      cb();
    });
});

gulp.task('build:views', function () {
  return gulp.src(['src/client/scripts/**/*.tpl.html'])
    .pipe(gulp.dest('_build/client/scripts'));
});

gulp.task('build:assets', function () {
  return gulp.src(['src/client/assets/**/*'])
    .pipe(gulp.dest('_build/client/assets'));
});

gulp.task('build:homePage', function () {
  return gulp.src([
    'src/client/index.html',
    'scr/client/tsconfig.json'
  ])
    .pipe(gulp.dest('_build/client'));
});

gulp.task('build:main', ['build:homePage'], function () {
  return gulp.src([
    'src/client/config.js'
  ])
    .pipe(gulp.dest('_build/client'));
});

//////////////////////////////////////////////////////
// BUILD
//////////////////////////////////////////////////////

gulp.task('build', function (done) {
  runSequence(
    'build:clean',
    [
      'build:scripts',
      'build:styles',
      'build:assets',
      'build:views',
      'build:main'
    ],
    done
  );
});
