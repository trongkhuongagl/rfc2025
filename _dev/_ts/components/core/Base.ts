'use strict';

import $ from 'jquery';

import Config from '../../global/Config';
import Model from '../../global/Model';
import MediaqueryImg from '../modules/MediaqueryImg';
import BrowseDevice from '../modules/utils/BrowseDevice';

namespace Base {
	export class PageCore {
		// public mq: String = 'PC';
		public $window = $(window);
		public $html = $('html');
		public $body = $('body');
		public fixMq: string = '';
		public tempMq: string = '';

		private mq_tb: number = Config.MQ_TB;
		private mq_sp: number = Config.MQ_SP;

		private mode_pc: string = Config.MODE_PC;
		private mode_tb: string = Config.MODE_TB;
		private mode_sp: string = Config.MODE_SP;

		private mediaqueryImg: MediaqueryImg = new MediaqueryImg();
		private mqlTB = window.matchMedia(`screen and (min-width: ${this.mq_sp + 1}px) and (max-width: ${this.mq_tb}px)`);
		private mqlSP = window.matchMedia(`screen and (max-width: ${this.mq_sp}px)`);

		constructor() {
			Model.data.isMobile = !BrowseDevice.judgeBrowse().isPc ? true : false;
		}

		public onInit(): void {
			if (Model.data.isMobile) this.$html.addClass(Config.CLASS_IS_MOBILE);

			//ブレークポイント切り替え
			this.onBreakPoint();
			this.mqlTB.addListener(this.onBreakPoint.bind(this));
			this.mqlSP.addListener(this.onBreakPoint.bind(this));

			//リサイズ
			this.onResize();
			this.$window.on('resize', () => {
				this.onResize();
			});
			
			
		}

		public onLoaded(): void {
			// console.log('All Load:complete');
		}

		public onResize(): void {
			const dw = window.innerWidth ? window.innerWidth : $(window).width();
			const dh = window.innerHeight ? window.innerHeight : $(window).height();
			this.onClassChange(dw, dh);
		}

		/* 
		* ブレークポイント
		 */
		public onBreakPoint() {
			if (this.mqlSP.matches) {
				this.fixMq = this.mode_sp;
			} else if (this.mqlTB.matches) {
				this.fixMq = this.mode_tb;
			} else {
				this.fixMq = this.mode_pc;
			}

			if (this.fixMq !== this.tempMq) {
				//Model更新(mode);
				Model.data.modelMq = this.fixMq;
				// console.log('ブレークポイント:'+Model.data.modelMq);

				//レスポンシブ画像切り替え
				this.mediaqueryImg.mqImgSet(this.fixMq);
				if (BrowseDevice.judgeBrowse().isIE11) {
					//pictureタグ用
					this.mediaqueryImg.mqPictureSet(this.fixMq);
				}
				this.tempMq = this.fixMq;
				this.onResize();
			}
		}

		/* 
		* クラスチェンジ
		 */
		public onClassChange(dw:number, dh:number) {
			if (dw > dh && Model.data.isMobile) {
				this.$html.addClass(Config.CLASS_IS_LANDSCAPE);
			} else {
				this.$html.removeClass(Config.CLASS_IS_LANDSCAPE);
			}
		}
	}
}

export default Base;
