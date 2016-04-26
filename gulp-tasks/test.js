'use strict';

var gulp = require('gulp');
var gulpMocha = require('gulp-mocha');
var runSequence = require('run-sequence');
var nodeMon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//////////////////////////////////////////////////////
// Serve TEST
//////////////////////////////////////////////////////

gulp.task('serve:test', function () {

  return nodeMon({
    script: '_build/server/server.js',
    ext: 'js',
    env: {
      NODE_ENV: 'test',
      PORT: 8888
    },
    ignore: [
      './node_modules/**'
    ]
  })
    .on('restart', function () {
      console.log('Restarting nodemon...');
    });

});

// Intergration test

gulp.task('it', [], function () {

  // return gulp.src('test/API/**/*.js', {read: false})
  //   .pipe(gulpMocha({reporter: 'nyan'}));

  return gulp.src('test/API/**/*.js', {read: false})
    .pipe(gulpMocha());

});

// Unit Test

gulp.task('ut', function () {

  return gulp.src('test/UT/**/*.js', {read: false})
    .pipe(gulpMocha({reporter: 'nyan'}));

});


