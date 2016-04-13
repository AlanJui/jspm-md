var gulp = require('gulp');
var tsc = require('gulp-tsc');

gulp.task('tsc', function() {
  return gulp.src('./client/src/**/*.ts')
    .pipe(tsc({
      module: 'system',
      // outDir: '../js/',
      target: 'es5',
      sourceMap: true,
      'noImplicitAny': false,
      'removeComments': true
    }))
    .pipe(gulp.dest('./client/js/'));
});

