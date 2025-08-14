const gulp = require('gulp');
const UndertakerRegistry = require('undertaker-registry');
const svgSprite = require('gulp-svg-sprite');
const SVG_SRC = './_dev/_svg/*.svg';
const SVG_SASS = '../../../_dev/_sass/layout/modules/_sprite-bg.scss';
const SVG_HTML = '../../../_dev/_svg/svg-sprite-preview/';
const SVG_DEST = './htdocs/infinity/resources/images';
class SvgSprite extends UndertakerRegistry {
	init() {
		// タスク
		gulp.task('svg-sprite', () => {
			return (
				gulp.src(SVG_SRC) // 元となるSVGアイコンのパス（*.svg で全SVGを対象に）
					.pipe(
						svgSprite({
							mode: {
								symbol: {
									// スプライト画像を置くディレクトリ名。指定しないとデフォルト設定（svg）に。
									dest: 'svg',

									// スプライト画像のファイル名
									sprite: 'sprite.svg',

									// スプライト画像のプレビュー用HTMLが欲しい人はこちらも記述してください。
									// 任意の場所とファイル名を指定してください。
									example: {
										dest: SVG_HTML+'sprite.html',
									},
								},
							}, // mode
							shape: {
								transform: [
									{
										svgo: {
											// svgのスタイルのオプション
											plugins: [
												{ removeTitle: true }, // titleを削除
												{ removeStyleElement: true }, // <style>を削除
												{ removeAttrs: { attrs: 'fill' } }, // fill属性を削除
											],
										},
									},
								],
							},
							svg: {
								xmlDeclaration: true,
								doctypeDeclaration: true,
							},
						}),
					)
					// 書き出し先
					.pipe(gulp.dest(SVG_DEST))
				// 背景用スプライト画像を指定
				/* ,gulp.src(SVG_SRC)
					.pipe(
						svgSprite({
							mode: {
								css: {
									// 背景用スプライト画像のファイル名を指定
									// ただし自動で接尾辞がつく
									sprite: 'sprite-bg.svg',
									dest: 'svg',
									// class名の接頭辞を指定。なぜか頭にドットが必要（例）.icon_home
									prefix: '.icon_%s',
		
									// サイズ指定用classの接尾辞（例）.icon_home_dims
									dimensions: '_dims',
		
									render: {
										// CSSファイル名を指定
										//  css: {
										// 	dest: 'sprite.css',
										// },
		
										// SCSSファイルも生成する場合はこちらも記述
										// 相対パスで _src ディレクトリ内を指定
										scss: {
											dest: 'SVG_SASS',
										},
									},
		
									// スプライト画像のプレビュー用ページが欲しい場合はこちらも記述
									// 任意の場所とファイル名を指定
									example: {
										dest: SVG_HTML+'sprite-bg.html',
									},
								}, // css
							}, // mode
						}),
					)
					// 書き出し先
					.pipe(gulp.dest(SVG_DEST)) */
			);
		});
	}
}

module.exports = new SvgSprite();


