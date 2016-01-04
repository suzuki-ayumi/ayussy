import gulp        from 'gulp'
import gulpLess    from 'gulp-less'
import gulpPlumber from 'gulp-plumber'
import gulpRename  from 'gulp-rename'
import browserify  from 'browserify'
import source      from 'vinyl-source-stream'
import babelify    from 'babelify'
import browserSync from 'browser-sync'
import path        from 'path'
import watchify    from 'watchify'

gulp.task('default', function() {
  browserSync({
    https: false,
    server: {
      baseDir: './dist/index.html',
      logLevel: 'debug',
    },
    open: false
  });
});
