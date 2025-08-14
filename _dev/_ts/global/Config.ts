'use strict';

namespace Config {

    /**
     * ウィンドウサイズ:サイズ幅
     */
	export const MQ_TB: number = 640;//サイズ:タブレット
	export const MQ_SP: number = 640;//サイズ:サイズ

    /**
     * ウィンドウサイズ:名称
     */
	export const MODE_PC: string = 'PC';//ウィンドウサイズ：パソコン
	export const MODE_TB: string = 'TB';//ウィンドウサイズ：タブレット
	export const MODE_SP: string = 'SP';//ウィンドウサイズ：スマホ

	/**
	* イベント:名称
	*/
	export const EVENT_MQ_CHANGE: string = 'EVENT_MQ_CHANGE';//メディアクエリー変更
	export const EVENT_LOADED: string = 'EVENT_LOADED';//全ファイル読み込み完了

	/**
     * CSS:クラス名
     */
	export const CLASS_IS_MOBILE: string = 'is-MobileOS';//モバイルデバイス(Android・iOSのタブレットとスマホ)
	export const CLASS_IS_LANDSCAPE: string = 'is-landscape';//横幅の方が大きい場合
}

export default Config;