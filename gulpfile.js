var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var minifyCSS = require('gulp-minify-css');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

gulp.task('default', [
    'browser-sync',
    'iconfont',
    'sass',
    'watch'
]);

gulp.task('iconfont', function() {
    gulp.src(['icons/*.svg'])
        .pipe(iconfont({
            fontName: 'myfont'
        }))
        .on('codepoints', function(codepoints, options) {
            gulp.src('templates/myfont.css')
                .pipe(consolidate('lodash', {
                    glyphs: codepoints,
                    fontName: 'myfont',
                    fontPath: '../fonts/',
                    className: 's'
                }))
                .pipe(gulp.dest('app/css/'));
        })
        .pipe(gulp.dest('app/fonts/'));
});


/**
 *
 *	Browsers sync
 *
 **/

gulp.task('browser-sync', function() {
    var files = [
        'app/**/*.html',
        'app/css/**/*.css'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './app'
        }
    });
});


/**
 *
 *	Watch
 *
 **/

gulp.task('watch', function() {
    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('icons/*.svg', ['iconfont']);
});




/**
 *
 *	Watch sass
 *
 **/

gulp.task('sass', function() {
    gulp.src('app/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest('app/css'));
});


/**
 *
 *	Compress css
 *
 **/

gulp.task('minify-css', ['sass'], function() {
    gulp.src('app/css/*.css')
        .pipe(minifyCSS({
            keepBreaks: false,
            keepSpecialComments: true,
            benchmark: false,
            debug: true
        }))
        .pipe(gulp.dest('app/css/'));
});