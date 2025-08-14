const gulp = require('gulp');
const UndertakerRegistry = require('undertaker-registry');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const wait = require('gulp-wait');
sass.compiler = require('node-sass');

class Sass extends UndertakerRegistry{
	init() {
		gulp.task('sass', () => {
			return gulp
				.src('./_dev/_sass/**/*.scss')
				.pipe(wait(500))
				.pipe(sourcemaps.init())
				.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
				.pipe(
					autoprefixer({
						browsers: ['last 2 versions', 'iOS >= 10', 'Android >= 4.4'],
						cascade: false,
					}),
				)
				// .pipe(sourcemaps.write('.'))
				.pipe(gulp.dest('./htdocs/infinity/resources/css'));
		});
	}
}

module.exports = new Sass();