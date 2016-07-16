const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const less = require('gulp-less');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', () => {
    gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log("before: " + details.name + ': ' + details.stats.originalSize);
            console.log("after : " + details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('./src'));
});

gulp.task('babel', () => {
    gulp.src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("main.js"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src'));
});

gulp.task('watch', ['styles', 'babel'], () => {
    gulp.watch('./src/less/*', ['styles']);
    gulp.watch('./src/js/*', ['babel'])
});

gulp.task('default', ['watch']);
