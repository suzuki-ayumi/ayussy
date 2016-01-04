import gulp         from 'gulp'
import gulpLess     from 'gulp-less'
import gulpPlumber  from 'gulp-plumber'
import gulpRename   from 'gulp-rename'
import autoprefixer from 'gulp-autoprefixer'
import browserify   from 'browserify'
import source       from 'vinyl-source-stream'
import babelify     from 'babelify'
import browserSync  from 'browser-sync'
import path         from 'path'
import watchify     from 'watchify'
import webpack      from 'webpack'
var config = {
  js: {
    watch:               ['./app/**/*.js', './app/**/*.jsx'],
    src:                 './app/app.jsx',
    dest:                './dist/',
    bundleFilename:      'bundle.js',
    webpack: {
      module: {
        loaders: [
          {
            test: /\.jsx$/,
            loader: 'jsx-loader?insertPragma=React.DOM&harmony',
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          }
        ]
      },
      externals: {
        'react':        'React',
        'react-router': 'Router',
        'lodash':       '_',
        'jquery':       '$',
        'async':        'async',
        'bluebird':     'Promise',
        'moment':       'moment',
        'cheet.js':     'cheet',
      },
      resolve: {
        extenstions: ['', '.js', '.jsx']
      }
    }
  },
  css: {
    watch:               './app/**/*.less',
    src:                 './app/app.less',
    dest:                './dist/',
    bundleFilename:      'bundle.css',
    requirementBrowsers: ['Explorer >= 8', 'Chrome >= 27', 'Firefox >= 21', 'Android >= 2.3', 'iOS >= 5.1'],
  }
};

var tasks = { config: config };

tasks.js = function() {
  gulp.src(config.js.src)
  .pipe(gulpPlumber())
  .pipe(webpack(config.js.webpack))
  .pipe(gulpRename(config.js.bundleFilename));
  .pipe(gulp.dest(config.js.dest));
};

tasks.css = function() {
  gulp.src(config.css.src)
  .pipe(gulpPlumber())
  .pipe(gulpLess())
  .pipe(autoprefixer({ browsers: config.css.requirementBrowsers }))
  .pipe(gulpRename(config.css.bundleFilename));
  .pipe(gulp.dest(config.css.dest));
};

gulp.task('bundle-js',     tasks.js);
gulp.task('bundle-css',    tasks.css);
gulp.task('bundle',        ['bundle-js', 'bundle-css']);

gulp.task('default', () => {

  gulp.watch(tasks.config.js.watch,  ['bundle-js',  browserSync.reload]);
  gulp.watch(tasks.config.css.watch, ['bundle-css', browserSync.reload]);

  browserSync({
    https: false,
    server: {
      baseDir: "./"
    }
  });
});
