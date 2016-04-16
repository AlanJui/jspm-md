'use strict';

var browserSync = require('browser-sync').create(),
  gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  reload = browserSync.reload;

gulp.task('serve',
  [
    'browser-sync'
  ],
  function () {
    gulp.watch('src/client/**/*.ts', ['tsc:client']);
    gulp.watch('client/js/**/*.js').on('change', reload);
    gulp.watch('src/server/**/*.ts', ['tsc:server']);
    gulp.watch('server/**/*.js').on('change', reload);
    gulp.watch('client/assets/app.css').on('change', reload);
    gulp.watch('src/client/**/*.less', ['less']);
    gulp.watch('src/client/**/*.tpl.html', ['copyViewTemplates']);
    gulp.watch('client/views/*.tpl.html').on('change', reload);
    gulp.watch('client/index.html').on('change', reload);
  }
);

gulp.task('browser-sync',
  [
    'nodemon'
  ],
  function() {
    browserSync.init(null, {
      proxy: 'http://localhost:20080',
      browser: 'google-chrome',
      port: 10080
    });
  }
);

gulp.task('nodemon',
  [
    'copyViewTemplates',
    'tsc',
    'less'
  ],
  function (done) {
    var running = false;

    return nodemon({
      script: 'server/app.js',
      watch: ['server/**/*.*']
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
