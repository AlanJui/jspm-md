var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var htmlReplace = require('gulp-html-replace');
var tsc = require('gulp-tsc');
var Builder = require('systemjs-builder');
var builder = new Builder('_build/client', 'src/client/config.js');


//////////////////////////////////////////////////////
// Copy Tasks
//////////////////////////////////////////////////////

// // clean out all files and folders from build folder
// gulp.task('cleanDirs:buildClientScripts', function (done) {
//
//   var list = [
//     '_build/client/scripts/**/*.js'
//   ];
//
//   del(list)
//     .then(function () { done(); });
//
// });
//
// gulp.task('build:tscClient', function() {
//
//   return gulp.src('src/client/scripts/**/*.ts')
//     .pipe(tsc({
//       module: 'system',
//       target: 'es5',
//       sourceMap: true,
//       noImplicitAny: false,
//       removeComments: true
//     }))
//     .pipe(gulp.dest('_build/client/scripts'));
//
// });
//
// gulp.task('dist:bundle', function (done) {
//
//   builder
//     .buildStatic('boot.js', '_dist/client/scripts/bundle.js')
//     .then(function () {
//       console.log('Dist complete!!');
//       done();
//     })
//     .catch(function (err) {
//       console.log('Dist error:');
//       console.log(err);
//       done();
//     });
//
// });
//
// gulp.task('build:jspm', function (done) {
//
//   runSequence(
//     'cleanDirs:buildClientScripts',
//     'build:tscClient',
//     'build:systemJS',
//     done
//   );
//
// });
