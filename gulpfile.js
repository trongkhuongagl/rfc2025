'use strict';

const gulp = require('gulp');
const Browsersync = require('./tasks/Browsersync.js');
const Watch = require('./tasks/Watch.js');
const Sass = require('./tasks/Sass.js');
const TS = require('./tasks/TS.js');
const Nunjucks = require('./tasks/Nunjucks.js');
// const SvgSprite = require('./tasks/SvgSprite.js');

// カスタムタスク
gulp.registry(Browsersync);
gulp.registry(Watch);
gulp.registry(Sass);
gulp.registry(TS);
gulp.registry(Nunjucks);
// gulp.registry(SvgSprite);

// デフォルトタスク
gulp.task('default', gulp.series('server', 'watch'));

/*gulp.task('default',(done) =>{done()
	console.log('----完了----');
});*/
