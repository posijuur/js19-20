'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require("gulp-notify");
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
gulp.task('sass', function () {
    return gulp.src('build/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(notify(":=0"));
});
gulp.task('sass:watch', function (){
    gulp.watch('build/scss/style.scss', gulp.series('sass'));
});
gulp.task('build:css', function (){
    return gulp.src('build/css/*.css')
        .pipe(concatCss("main.css"))
        .pipe(gulp.dest('app/css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(notify(":=0"));
});
gulp.task('build:img', function (){
    return gulp.src('build/img/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('app/img'))
        .pipe(notify(":=0"));
});
gulp.task('build:js', function(){
    return gulp.src('build/js/script.js')
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(notify(":=0"));
});