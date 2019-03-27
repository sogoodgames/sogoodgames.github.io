var _gulp = require('gulp'),
    _uglify = require('gulp-uglify'),
    _cleanCss = require('gulp-clean-css'),
    _concat = require('gulp-concat'),
    _imageMin = require('gulp-imagemin'),
    _cache = require('gulp-cache'),
    _del = require('del'),
    _runSequence = require('run-sequence');


_gulp.task('min-js', function() {
    return _gulp.src('js/*.js')
        .pipe(_uglify())
        .pipe(_concat('main.min.js'))
        .pipe(_gulp.dest('dist'));
});

_gulp.task('min-css', function() {
    return _gulp.src('css/*.css')
        .pipe(_cleanCss())
        .pipe(_concat('main.min.css'))
        .pipe(_gulp.dest('dist'));
});

_gulp.task('min-img', function() {
    return _gulp.src('images/*.+(png|jpg|gif|svg)')
        .pipe(_cache(_imageMin()))
        .pipe(_gulp.dest('dist'));
});

_gulp.task('watch', function() {
    _gulp.watch('css/*.css', ['min-css']);
    _gulp.watch('js/*.js', ['min-js']);
    _gulp.watch('images/*.+(png|jpg|gif|svg)', ['min-img']);
});

_gulp.task('clean', function() {
    _del.sync('dist');
});

_gulp.task('build', function(cb) {
    _runSequence('clean', ['min-js', 'min-css', 'min-img'], cb);
});
