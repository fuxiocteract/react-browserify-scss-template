'use strict'

var gulp = require('gulp'),
    react = require('gulp-react'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    minjs = require('gulp-uglify'),
    mincss = require('gulp-minify-css'),
    minhtml = require('gulp-minify-html'),
    scss = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    paths = {
      react_src: './development/js/react/src/app.js',
      react_build: './development/js/react/build',
      scss_src: './development/scss/src/*.scss',
      scss_build: './development/scss/build',
      html_src: './development/html/**/*.html',
      asset_font: './development/asset/font/**/*.*',
      asset_img: './development/asset/img/**/*.*',
      asset_favicon: './development/asset/favicon/**/*.*',
      js_production: './production/js',
      css_production: './production/css',
      html_production: './production',
      asset_font_production: './production/asset/font',
      asset_img_production: './production/asset/img',
      asset_favicon_production: './production/asset/favicon'
    },
    lib_css = {

    },
    lib_js = {

    };

gulp.task('react-build', function() {
  return gulp.src(paths.react_src)
    .pipe(browserify({
      transform: ['reactify'],
      debug: true
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(paths.react_build))
    .pipe(livereload());
});

gulp.task('react-build-watch', function() {
  livereload.listen();
  return gulp.watch(paths.react_src, ['react-build']);
});

gulp.task('scss-build', function() {
  return gulp.src(paths.scss_src)
          .pipe(scss())
          .pipe(gulp.dest(paths.scss_build))
          .pipe(livereload());
});

gulp.task('scss-build-watch', function() {
  livereload.listen();
  return gulp.watch(paths.scss_src, ['scss-build']);
});

gulp.task('js-production', function() {
  return gulp.src(paths.react_build + '/*.js')
    .pipe(minjs())
    .pipe(rename(function(path) {
      path.basename += '.min'
    }))
    .pipe(gulp.dest(paths.js_production))
    .pipe(livereload());
});

gulp.task('js-production-watch', function() {
  livereload.listen();
  return gulp.watch(paths.react_build + '/*.js', ['js-production']);
});

gulp.task('css-production', function() {
  console.log(paths.scss_build + '/*.css');
  return gulp.src([paths.scss_build + '/*.css'])
          .pipe(mincss())
          .pipe(rename(function(path) {
            path.basename += '.min'
          }))
          .pipe(gulp.dest(paths.css_production))
          .pipe(livereload());
});

gulp.task('css-production-watch', function() {
  livereload.listen();
  return gulp.watch(paths.scss_build + '/*.css', ['css-production']);
});

gulp.task('html-production', function() {
  return gulp.src(paths.html_src)
          .pipe(minhtml())
          .pipe(gulp.dest(paths.html_production))
          .pipe(livereload());
});

gulp.task('html-production-watch', function() {
  livereload.listen();
  return gulp.watch(paths.html_src, ['html-production']);
});

gulp.task('asset-production', function() {
  gulp.src(Paths.asset_font)
    .pipe(gulp.dest(Paths.asset_font_production));

  gulp.src(Paths.asset_img)
    .pipe(gulp.dest(Paths.asset_img));

  gulp.src(Paths.asset_favicon)
    .pipe(gulp.dest(Paths.asset_fvicon));
});

gulp.task('asset-production-watch', function() {
  livereload.listen();
  gulp.watch([Paths.asset_font, Paths.asset_img, Paths.asset_favicon], 'asset-production');
});

gulp.task('default', ['react-build-watch', 'js-production-watch', 'scss-build-watch', 'css-production-watch', 'html-production-watch']);
