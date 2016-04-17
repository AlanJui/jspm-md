var gulp = require('gulp');
var tsc = require('gulp-tsc');

gulp.task('build:client-withSourceMap', function() {
  return gulp.src('src/client/scripts/**/*.ts')
    .pipe(tsc({
      module: 'system',
      target: 'es5',
      sourceMap: true,
      noImplicitAny: false,
      emitError: false,
      removeComments: true
    }))
    .pipe(gulp.dest('_build'));
});

gulp.task('build:client', function() {
  return gulp.src('src/client/scripts/**/*.ts')
    .pipe(gulp.dest('_build/client/scripts'));
});

gulp.task('build:server', function() {
  return gulp.src('src/server/**/*.ts')
    .pipe(tsc({
      module: 'commonjs',
      target: 'es5',
      sourceMap: true,
      sourceRoot: 'src/client/scripts',
      noImplicitAny: false,
      emitError: false,
      removeComments: true
    }))
    .pipe(gulp.dest('_build/server'));
});

gulp.task('build:scripts', ['build:server', 'build:client']);
