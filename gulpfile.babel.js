import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import streamify from 'gulp-streamify';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import watchify from 'watchify';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import handleErrors from './lib/handle-errors';
import less from 'gulp-less';
import runSequence from 'run-sequence';
import webserver from 'gulp-webserver';
import fs from 'fs';

const port = 3000 || process.env.PORT;
var isProd = true;

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(watch) {
  var file = 'src/client/js/main.jsx';

  var bundler = browserify({
    entries: [file],
    debug: !isProd,
    cache: {},
    packageCache: {},
    fullPaths: true,
    extensions: ['.js','.jsx']
  });

  if ( watch ) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  bundler.transform(babelify);

  function rebundle() {
    let stream = bundler.bundle();

    gutil.log('Rebundle...');

    return stream.on('end', () => { gutil.log('Rebundle done'); }).on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulpif(isProd, streamify(uglify())))
      .pipe(streamify(rename({
        basename: 'main',
        extname: '.js',
        dirname: '/',
      })))
      .pipe(gulpif(!isProd, sourcemaps.write('./')))
      .pipe(gulp.dest('./dist/client/js'))
      .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
  }

  return rebundle();

}

gulp.task('scripts', function() {
  return buildScript(!isProd);
});

gulp.task('styles', function() {
  return gulp.src('src/client/style.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/client/styles'));
});

gulp.task('index', function() {
  return gulp.src('src/client/index.html')
    .pipe(gulp.dest('./dist/client'));
});

gulp.task('build', (cb) => {
  runSequence(['scripts', 'styles', 'index'], cb);
});

gulp.task('serve', () => {
  gulp.src('./dist/client')
    .pipe(webserver({
      livereload: true,
      port: port,
      fallback: 'index.html',
    }));
});

gulp.task('dev-watch', () => {
  gulp.watch('./src/client/styles/**/*', () => {
    gulp.start('styles');
  });

  gulp.watch('./src/client/index.html', () => {
    gulp.start('index');
  });
});

gulp.task('dev', (cb) => {
  isProd = false;
  runSequence('build', ['serve', 'dev-watch'], cb);
});
