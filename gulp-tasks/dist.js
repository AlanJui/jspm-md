'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var htmlReplace = require('gulp-html-replace');
var del = require('del');

//////////////////////////////////////////////////////
// Copy Tasks
//////////////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('dist:clean', function (done) {
  del('_dist/*')
    .then(function () { done(); });
});

gulp.task('dist:views', function () {
  return gulp.src(['src/client/scripts/**/*.tpl.html'])
    .pipe(gulp.dest('_dist/client/scripts'));
});

gulp.task('dist:assets', function () {
  return gulp.src(['src/client/assets/**/*'])
    .pipe(gulp.dest('_dist/client/assets'));
});

//////////////////////////////////////////////////////
// Inject JS files into index.html
//////////////////////////////////////////////////////

gulp.task('dist:inject', function () {
  return gulp.src('src/client/index.html')
    .pipe(htmlReplace({
      'js': 'scripts/bundle.js'
    }))
    .pipe(gulp.dest('_dist/client'));
});

//////////////////////////////////////////////////////
// Dist Build Tasks
//////////////////////////////////////////////////////

gulp.task('dist', function (done) {
  runSequence(
    'dist:clean',
    [
      'dist:styles',
      'dist:assets',
      'dist:views'
    ],
    'dist:server',
    'dist:bundle',
    'dist:inject',
    done
  );
});
