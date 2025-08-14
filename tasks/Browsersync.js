'use strict';

const gulp = require('gulp');
const connectSSI = require('connect-ssi');
const UndertakerRegistry = require('undertaker-registry');
const browserSync = require('browser-sync').create();
const baseDir = "./htdocs";
// const browserSyncOption = {
// 	server: './htdocs',
// 	port: 3003,
// };
const browserSyncOpt = {
	port: 3003,
	server: {
	  baseDir: baseDir,
	  middleware: [
		connectSSI({
		  ext: '.html',
		  baseDir: baseDir
		})
	  ],
	},
	reloadOnRestart: true,
  }
class BrowserSync extends UndertakerRegistry{
	init() {
		gulp.task('server', done => {
			browserSync.init(browserSyncOpt);
			done();
		});

		gulp.task('reload', done =>  {
			browserSync.reload();
			done();
		});
	}
};

module.exports = new BrowserSync();

