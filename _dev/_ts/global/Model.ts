'use strict';

import $ from "jquery";
import Config from './Config';

namespace Model {
	export class data {

		public static rootApp:any;//ルートインスタンス
		public static isMobile: boolean = false; //モバイルデバイス
		public static mq: string = ''; //メディアクエリー

		/**
		 * getter:メディアクエリー
		 */
		public static get modelMq(): string {
			return this.mq;
		}

		/**
		 * setter:メディアクエリー
		 * Triggerイベント:MQ_CHANGE
		 */
		public static set modelMq(value:string) {
			this.mq = value;
			// console.log(`mode(model):${this.modelMq}`);
			$(window).trigger(Config.EVENT_MQ_CHANGE,[this.modelMq]);
		}
	}
}
export default Model;