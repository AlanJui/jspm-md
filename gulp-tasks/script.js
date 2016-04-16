var gulp = require('gulp');
var tsc = require('gulp-tsc');

gulp.task('tsc:client', function() {
  return gulp.src('src/client/**/*.ts')
    .pipe(tsc({
      module: 'system',
      target: 'es5',
      sourceMap: true,
      noImplicitAny: false,
      emitError: false,
      removeComments: true
    }))
    .pipe(gulp.dest('client/js/'));
});

gulp.task('tsc:server', function() {
  return gulp.src('src/server/**/*.ts')
    .pipe(tsc({
      module: 'commonjs',
      target: 'es5',
      sourceMap: true,
      noImplicitAny: false,
      emitError: false,
      removeComments: true
    }))
    .pipe(gulp.dest('server/'));
});

gulp.task('tsc', ['tsc:server', 'tsc:client']);
