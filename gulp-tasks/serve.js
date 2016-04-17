'use strict';

var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var reload = browserSync.reload;

gulp.task('serve',
  [
    'build'
  ],
  function () {
    gulp.watch('src/client/scripts/**/*.ts', ['build:client']);
    gulp.watch('_build/client/scripts/**/*.js').on('change', reload);

    gulp.watch('src/server/**/*.ts', ['build:server']);
    gulp.watch('_build/server/**/*.js').on('change', reload);

    gulp.watch('src/client/scripts/**/*.less', ['build:styles']);
    gulp.watch('src/client/app.less', ['build:styles']);
    gulp.watch('_build/client/app.css').on('change', reload);

    gulp.watch('src/client/scripts/**/*.tpl.html', ['build:views']);
    gulp.watch('_build/client/scripts/**/*.tpl.html').on('change', reload);

    gulp.watch('src/client/index.html', ['build:homePage']);
    gulp.watch('src/client/config.js', ['build:main']);
    gulp.watch('_build/client/index.html').on('change', reload);
  }
);

gulp.task('start', function (done) {
  runSequence(
    'start-client',
    'start-server',
    done);
});

gulp.task('start:client', function() {
  return browserSync.init(null, {
    proxy: 'http://localhost:20080',
    browser: 'google-chrome',
    port: 10080
  });
});

gulp.task('start:server', function (done) {
    var running = false;

    return nodemon({
      script: '_build/server/server.js',
      watch: ['src/server/**/*.ts']
    })
      .on('start', function () {
        if (!running) {
          done();
        }
        running = true;
      })
      .on('restart', function () {
        setTimeout(function () {
          reload();
        }, 500);
      });
  }
);
