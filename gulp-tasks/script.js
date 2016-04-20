var gulp = require('gulp');
var del = require('del');
var tsc = require('gulp-tsc');
var runSequence = require('run-sequence');
var Builder = require('systemjs-builder');

//////////////////////////////////////////////////////
// Build
//////////////////////////////////////////////////////

// Build process
gulp.task('build:scripts', function (done) {

  runSequence(
    'build:serverScripts',
    'build:clientScripts',
    done
  );

});

gulp.task('build:serverScripts', function() {

  del('_build/server');

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

gulp.task('build:clientScripts', function (done) {

  runSequence(
    'clean:buildClientScripts',
    'build:copyTS',
    'build:tscClient',
    done
  );

});

// clean out all files and folders from build folder
gulp.task('clean:buildClientScripts', function (done) {

  var list = [
    '_build/client/scripts/**/*.js'
  ];

  del(list)
    .then(function () { done(); });

});

// copy .ts files to _build/client.scripts/
gulp.task('build:copyTS', function() {
  return gulp.src('src/client/scripts/**/*.ts')
    .pipe(gulp.dest('_build/client/scripts'));
});

// transpile .ts file to .js file
gulp.task('build:tscClient', function() {

  return gulp.src('src/client/scripts/**/*.ts')
    .pipe(tsc({
      module: 'system',
      target: 'es5',
      sourceMap: true,
      noImplicitAny: false,
      removeComments: true
    }))
    .pipe(gulp.dest('_build/client/scripts'));

});

//////////////////////////////////////////////////////
// Dist
//////////////////////////////////////////////////////

// Dist process
gulp.task('dist:scripts', function (done) {

  runSequence(
    'dist:serverScripts',
    'dist:clientScripts',
    done
  );

});

// Server scripts
gulp.task('dist:serverScripts', function() {

  return gulp.src('src/server/**/*.ts')
    .pipe(tsc({
      module: 'commonjs',
      target: 'es5',
      noImplicitAny: false,
      removeComments: true
    }))
    .pipe(gulp.dest('_dist/server'));

});

gulp.task('dist:clientScripts', function (done) {

  runSequence(
    'build:clientScripts',
    'dist:bundle',
    done
  );

});

// Bundle .js files to a Single Self-Executing (SFX) Bundles File
gulp.task('dist:bundle', function (done) {

  var builder = new Builder('_build/client', 'src/client/config.js');

  builder
    .buildStatic(
      'boot.js',
      '_dist/client/scripts/bundle.js'
    )
    .then(function () {
      console.log('Dist complete!!');
      done();
    })
    .catch(function (err) {
      console.log('Dist error:');
      console.log(err);
      done();
    });

});

