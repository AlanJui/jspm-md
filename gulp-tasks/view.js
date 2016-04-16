var gulp = require('gulp');

gulp.task('copyViewTemplates', function() {
  return gulp.src('src/client/**/*.tpl.html')
    .pipe(gulp.dest('client/views/'));
});

