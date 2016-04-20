'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var nodeMon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var watch = function () {
  gulp.watch('src/client/scripts/**/*.ts', ['build:clientScripts']);

  gulp.watch('src/server/**/*.ts', ['build:serverScripts']);

  gulp.watch('src/client/scripts/**/*.less', ['build:styles']);
  gulp.watch('src/client/app.less', ['build:styles']);

  gulp.watch('src/client/scripts/**/*.tpl.html', ['build:views']);

  gulp.watch('src/client/index.html', ['build:homePage']);
  gulp.watch('src/client/config.js', ['build:copyConfig']);
};

var serverReload = function () {
  gulp.watch('_build/client/scripts/**/*.ts').on('change', reload);

  gulp.watch('_build/client/app.css').on('change', reload);

  gulp.watch('_build/client/scripts/**/*.tpl.html').on('change', reload);

  gulp.watch('_build/client/index.html').on('change', reload);
}

gulp.task('serve', [ 'build' ], function () {
  watch();
});

gulp.task('serve:build', [ 'build', 'start:client' ], function () {
  watch();
  serverReload();
});

gulp.task('start:client', [ 'start:server' ], function() {
  return browserSync.init(null, {
    proxy: 'http://localhost:20080',
    browser: 'google-chrome',
    port: 10080
  });
});

gulp.task('start:server', [ 'build' ], function (done) {

  var running = false;

  return nodeMon({
    script: '_build/server/server.js',
    watch: ['_build/server/**/*.js']
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

});

gulp.task('serve:dist', ['dist'], function () {

  nodeMon({
    script: '_dist/server/server.js',
    ext: 'js',
    env: {
      PORT: 3000
    }
  });

});

