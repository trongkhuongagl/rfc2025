'use strict';
// var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	//   mode: "development",
	mode: 'production',
	// devtool: 'source-map',
	//複数のjsで書き出す
	entry: {
		home_2019: './_dev/_ts/home_2019.ts',
		prestigious_2020: './_dev/_ts/prestigious_2020.ts',
		morning_2021: './_dev/_ts/morning_2021.ts',
		innovative_2023: './_dev/_ts/innovative_2023.ts',
		therepair_2025: './_dev/_ts/therepair_2025.ts',
		// rfc2021: './_dev/_ts/rfc2021.ts',
		// rfc2022: './_dev/_ts/rfc2022.ts',
		// rfc2023: './_dev/_ts/rfc2023.ts',
		// rfc2024: './_dev/_ts/rfc2024.ts'
		rfc2025: './_dev/_ts/rfc2025.ts'
	},
	output: {
		path: `${__dirname}/htdocs/infinity/resources/js`,
		filename: '[name].js',
	},
	optimization: {
		//ライブラリはlib.jsへ書き出し
		splitChunks: {
			cacheGroups: {
				// 任意の名前で問題ない
				lib: {
					//test: /node_modules/,// node_modules配下のモジュールをバンドル対象とする
					//test: /[\\/]node_modules[\\/]/,
					test: /\.js/, //JSファイル(ライブラリ)をバンドル対象とする
					name: 'lib_2019',
					chunks: 'initial',
					enforce: true,
				} /* ,
			vendorModules: {
			// 今回はsrc/js/modules配下にバンドルしたいモジュールが存在するため指定は以下になる
			test: /src\/js/,
			filename: 'bundle.js',
			chunks: 'initial',
			enforce: true
			} */,
			},
		},
	},
	// plugins: [ new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery", "window.jQuery": "jquery" }) ],
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
				},
			},
		],
	},
	//ビルド対象に含めたい（require している）ファイルの拡張子
	resolve: { extensions: ['.ts', '.js'] },
	//ファイル容量の上限を解除
	performance: { hints: false },

	// webpack.ProvidePluginを使用すると、指定した変数名でライブラリを使用できるようになる
    // 以下の例だと、$, jQuery, window.jQueryでjqueryを使用することができる
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
		})
	],
	/* plugins: [
		new HardSourceWebpackPlugin()
	], */
	externals: [{jquery: 'jQuery'}]
};
