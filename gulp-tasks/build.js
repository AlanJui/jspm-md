'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var htmlReplace = require('gulp-html-replace');
var browserSync = require('browser-sync').create();

//////////////////////////////////////////////////////
// BUILD Process
//////////////////////////////////////////////////////

gulp.task('build', function (done) {
  runSequence(
    'build:clean',
    [
      'build:scripts',
      'build:styles',
      'build:assets',
      'build:views',
      'build:copyConfig'
    ],
    done
  );
});

//////////////////////////////////////////////////////
// Copy Tasks
//////////////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('build:clean', function (done) {
  del([
    '_build/client/assets',
    '_build/client/scripts',
    '_build/client/*.css',
    '_build/client/index.html',
    '_build/models/*',
    '_build/server/*'
  ])
    .then(function () { done(); });
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

gulp.task('build:copyConfig', ['build:homePage'], function () {
  return gulp.src([
    'src/client/config.js'
  ])
    .pipe(gulp.dest('_build/client'));
});

