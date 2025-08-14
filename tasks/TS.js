const gulp = require('gulp');
const UndertakerRegistry = require('undertaker-registry');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('../webpack.config');
const plumber = require('gulp-plumber');

const TS_SRC = './_dev/_ts/**/*.ts';
const TS_DEST = './htdocs/infinity/resources/js/';

class TS extends UndertakerRegistry {
	init() {
		gulp.task('ts', () => {
			return (
				gulp.src([TS_SRC])
					.pipe(plumber({
						handleError: (err) => {
							console.log(err);
							this.emit('end');
						}
					}))
					.pipe(webpackStream(webpackConfig, webpack))
					// エラーが発生した時に終了させない
					/* .on('error', (error) => {
						this.emit('end');
					}) */
					.pipe(gulp.dest(TS_DEST))
			);
		});
	}
}

module.exports = new TS();