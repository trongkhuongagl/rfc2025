const gulp = require('gulp');
const UndertakerRegistry = require('undertaker-registry');

class Watch extends UndertakerRegistry{
	init() {
		gulp.task('watch', () => {
			gulp.watch('./_dev/_sass/**/*.scss', gulp.series('sass', 'reload'));
			gulp.watch('./_dev/_ts/**/*.ts', gulp.series('ts', 'reload'));
			gulp.watch('./_dev/_nunjucks/**/*.njk', gulp.series('nunjucks'));
			gulp.watch('./htdocs/infinity/**/*.html', gulp.task('reload'));
		});
	}
}

module.exports = new Watch();

