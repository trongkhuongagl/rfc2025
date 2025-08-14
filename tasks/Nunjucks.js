const gulp = require('gulp');
const UndertakerRegistry = require('undertaker-registry');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const prettify = require('gulp-html-prettify');
const NJK_SRC = '_dev/_nunjucks/';
const NJK_DEST = 'htdocs/infinity/';

class Nunjucks extends UndertakerRegistry {
	init() {

		gulp.task('nunjucks', () => {
			return gulp.src([
				NJK_SRC + '**/*.njk',
				'!' + NJK_SRC + '**/_*.njk'
			])
				.pipe(data((file) => {

					const folder_local = file.path.split('\\').join('/');
					const folder_path = folder_local.split('_nunjucks')[1];
					const file_relative = folder_path.replace('.njk', '.html');
					const file_list = file_relative.split('/');
					const file_html = file_list.pop();
					const file_path = file_list.join('/') + '/';
					let path_relative = '';
					if (file_list.length !== 1) {
						for (var i = 0; i < file_list.length; i++) {
							path_relative += '../';
						}
					} else {
						path_relative = './';
					}
					console.log(path_relative);
					const data = {
						dataFileRelative: file_relative,
						dataFileHtml: file_html,
						dataFilePath: file_path,
						dataPathRelative: path_relative
					}
					return data;
				}))
				.pipe(data( ()=> {
					return require('../_dev/_nunjucks/_data/config.json'); //各ファイルに引き渡すデータ
				}))
				.pipe(nunjucksRender({
					path: [NJK_SRC],
					// watch:true,
					// data: getDataForFile,
					envOptions: {
						autoescape: false
					}
				}))
				.pipe(prettify({ 'indent_char': ' ', 'indent_size': 2 }))
				.pipe(gulp.dest(NJK_DEST));
		});
	};

	getDataForFile(file) {
		sitedata.path.relative = file.relative.replace(/\.njk/, '\.html').replace(/index\.html/, '');
		// sitedata.path.absolute = sitedata.path.domain + sitedata.path.relative;
		return sitedata;
	};
}

module.exports = new Nunjucks();