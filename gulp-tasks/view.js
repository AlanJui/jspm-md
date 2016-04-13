var gulp = require('gulp');

gulp.task('copyViewTemplates', function() {
  return gulp.src('./client/src/**/*.tpl.html')
    .pipe(gulp.dest('./client/views/'));
});

