'use strict';

const gulp            = require('gulp');
const header          = require('gulp-header');
const rename          = require('gulp-rename');

const jscs            = require('gulp-jscs');
const stylish         = require('gulp-jscs-stylish');
const uglify          = require('gulp-uglify');

const pkg             = require('./package.json');

const banner = ['/*!',
  ' * <%= pkg.name %> <%= pkg.version %>',
  ' * <%= pkg.description %>',
  ' *',
  ' * <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  '',
  ''].join('\n');

gulp.task('lint-scripts', function () {
  return gulp.src(['src/*.js'])
    .pipe(jscs({ fix: true }))
    .pipe(stylish())
    .pipe(jscs.reporter('fail'))
    .pipe(gulp.dest('src/'));
});

gulp.task('scripts', function () {
  return gulp.src(['src/*.js'])
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min', extname: '.js' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch(['src/*.js'], ['lint-scripts']);
  gulp.watch(['src/*.js'], ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);