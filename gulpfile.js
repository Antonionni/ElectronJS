const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const less = require('gulp-less');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');

gulp.task('styles', () => {
    return gulp.src('./src/less/main.less')
        .pipe(less())
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log("before: " + details.name + ': ' + details.stats.originalSize);
            console.log("after : " + details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('browserify', () => {
    return browserify({entries: './src/js/main.js', extensions: ['.js'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('copyHTML', () => {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['styles', 'browserify', 'copyHTML'], () => {
    gulp.watch('./src/less/*', ['styles']);
    gulp.watch('./src/js/*', ['browserify'])
    gulp.watch('./src/index.html', ['copyHTML']);
});

gulp.task('default', ['watch']);
