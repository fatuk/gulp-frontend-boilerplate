var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var minifyCSS = require('gulp-minify-css');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var mainBowerFiles = require('main-bower-files');
var jsPlugins = mainBowerFiles();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

/******************************
 * JS plugins
 ******************************/
gulp.task('js', function () {
	gulp.src(jsPlugins)
		.pipe(concat('plugins.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js/'));
});

/******************************
 * Default task
 ******************************/
gulp.task('default', [
	'browser-sync',
	'iconfont',
	'sass',
	'watch'
]);

/******************************
 * SVG icon fonts
 ******************************/
gulp.task('iconfont', function () {
	gulp.src(['icons/*.svg'])
		.pipe(iconfont({
			fontName: 'myfont'
		}))
		.on('codepoints', function (codepoints, options) {
			gulp.src('templates/myfont.css')
				.pipe(consolidate('lodash', {
					glyphs: codepoints,
					fontName: 'myfont',
					fontPath: '../fonts/',
					className: 'icon'
				}))
				.pipe(gulp.dest('app/css/'));
		})
		.pipe(gulp.dest('app/fonts/'));
});


/******************************
 * Browser sync
 ******************************/
gulp.task('browser-sync', function () {
	var files = [
		'app/**/*.html',
		'app/js/*.js',
		'app/css/**/*.css'
	];

	browserSync.init(files, {
		server: {
			baseDir: './app'
		}
	});
});

/******************************
 * Watch
 ******************************/
gulp.task('watch', function () {
	gulp.watch('app/scss/*.scss', ['sass']);
	gulp.watch('icons/*.svg', ['iconfont']);
});

/******************************
 * SASS
 ******************************/
gulp.task('sass', function () {
	gulp.src('app/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(sourcemaps.write('../css'))
		.pipe(gulp.dest('app/css'));

	setTimeout(function () {
		gulp.start('autoprefixer');
	}, 50);
});

/******************************
 * Minify css
 ******************************/
gulp.task('minify-css', function () {
	gulp.src('app/css/*.css')
		.pipe(minifyCSS({
			keepBreaks: false,
			keepSpecialComments: true,
			benchmark: false,
			debug: true
		}))
		.pipe(gulp.dest('app/css/'));
});

/******************************
 * Autoprefixer
 ******************************/
gulp.task('autoprefixer', function () {
	gulp.src('app/css/main.css')
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('app/css'));
});