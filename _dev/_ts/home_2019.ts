'use strict';

import $ from 'jquery';
import { TweenMax, Power0 } from 'gsap';
import BrowseDevice from './components/modules/utils/BrowseDevice';

import 'jquery.ripples';

import Model from './global/Model';
import Config from './global/Config';
import Base from './components/core/Base';
import SnsShare from './components/modules/SnsShare';
import Tools from './components/modules/Tools';
import HeaderNavi from './components/HeaderNavi';
import PageMotion from './components/PageMotion';
import MvMotion from './components/home/MvMotion';
import BnrFloat from './components/home/BnrFloat';
import BtnShop from './components/home/BtnShop';
import ProductCarousel from './components/home/ProductCarousel';
import PhilosophyMotion from './components/home/PhilosophyMotion';
import HashAddressAutoScroll from './components/modules/HashAddressAutoScroll';
// import OverShader from './components/modules/OverShader';


namespace Main {
	export class Page extends Base.PageCore {
		private isRepple = false;
		private hashAddressAuto:any;
		// private $body = $('body');

		constructor() {
			super();
			this.onInit();
		}

		public onInit() {
			super.onInit();
			$(window).on(Config.EVENT_LOADED, this.onLoaded.bind(this));
			this.newCreate();
			this.onStart();
		}

		public onLoaded() {
			$('.main-contents').show();
			// if(!this.$html.hasClass('is-MobileOS') && !BrowseDevice.judgeBrowse().isIE11){
			/* if(!this.$html.hasClass('is-MobileOS')){
				$('.over-distortion').each(function () {
					new OverShader($(this));
				});
			} */
			
			new BnrFloat();
			new BtnShop();
			new PageMotion();
			new MvMotion();
			new PhilosophyMotion();
			new ProductCarousel();
			super.onLoaded();
			this.onResize();
			this.hashAddressAuto.onHashScroll();
		}

		/* 
			インスタンス作成
		 */
		private newCreate() {
			new SnsShare();
			new Tools();
			new HeaderNavi();
			this.hashAddressAuto = new HashAddressAutoScroll();
		}

		private onStart() {
			
		}

		public onResize() {
			super.onResize();
		}


	} //class
}

/**
 * DOM読み込み完了後
 */
document.addEventListener('DOMContentLoaded', () => {
	// console.log('DOMContentLoaded');
	if (!window.console) { window.console = <any>{ log: function (msg: string) { }, }; }
	Model.data.rootApp = new Main.Page();
}, false);

/**
 * 全ロード完了後
 */
window.addEventListener('load', () => {
	$(window).trigger(Config.EVENT_LOADED);
}, false);




// $(function() {});

// document.addEventListener('readystatechange', () => {
// 	if(document.readyState === 'interactive'){}
// 	if(document.readyState === 'complete'){}
// });

// $(window).on('load', () => {
// 	$(window).trigger(Config.EVENT_LOADED);
// });