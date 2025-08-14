'use strict';

import $, { timers, Tween } from 'jquery';
import { TweenMax, Power0, Power3,Back } from 'gsap';
import 'slick-carousel';
import BrowseDevice from './components/modules/utils/BrowseDevice';

import Model from './global/Model';
import Config from './global/Config';
import Base from './components/core/Base';
import SnsShare from './components/modules/SnsShare';
import Tools from './components/modules/Tools';
import HashAddress from './components/modules/HashAddress';
import HeaderNavi from './components/HeaderNavi';
import ModalBox from './components/modules/ModalBox';
namespace Main {
	export class Page extends Base.PageCore {
		private $c_innovative = $('.cat-innovative');
		private $wrap = $('.wrap');
		private $motionBox = $('.motion-box');
		private classComplete: string = 'motion-complete';
		private $globalNav = $('.global-header .navigation');
		private $bg01 = $('.bg-01');
		private $bg03 = $('.bg-03');
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
			super.onLoaded();
			this.mv();
			this.onResize();
			this.$window.on('scroll', this.onScroll.bind(this));
			this.onScroll();
			// this.mv();
		}

		/*
			インスタンス作成
		 */
		private newCreate() {
			new SnsShare();
			new Tools();
			new HeaderNavi();
			new ModalBox();
		}

		private onStart() {
			new HashAddress();
			
		}

		private mv() {
			TweenMax.fromTo($('.mv-bg'), 0.8, { alpha: 0 }, { alpha: 1, delay: 0.3});
			TweenMax.fromTo($('.mv-title__lead'), 1, { alpha: 0, marginTop: 20 }, { alpha: 1, marginTop: 0, delay: 1});
			TweenMax.fromTo($('.mv-title__logo'), 1, { alpha: 0, marginTop: 20 }, { alpha: 1, marginTop: 0, delay:1.5 });
		}

		private onScroll() {
			const scorollNum: number = this.$window.scrollTop() as number;
			for (let i = 0; i < this.$motionBox.length; i++) {
				let runBoxOffset: any = this.$motionBox.eq(i).offset();
				// const h = runBoxOffset.top - Number(this.$window.height()) + Number(this.$motionBox.eq(i).height()) * 0.5;
				const h = runBoxOffset.top - Number(this.$window.height()) * 0.9;
				if (!this.$motionBox.eq(i).hasClass(this.classComplete) && scorollNum > h) {
					this.motionStart(this.$motionBox.eq(i));
					this.$motionBox.eq(i).addClass(this.classComplete)
				}
			}
			this.onBgChange(scorollNum);
		}

		private onBgChange(scorollNum){
			const bg01_Top = this.$bg01.offset();
			const movie_Top = $('.sec-channel__block').offset();
			const bg03_Top = this.$bg03.offset();
			if(scorollNum > bg01_Top.top && scorollNum < bg01_Top.top+this.$bg01.height()){
				this.$c_innovative.addClass('bg-01-fix');
				this.$c_innovative.removeClass('bg-03-fix');
				if(scorollNum>movie_Top.top){
					this.$c_innovative.addClass('bg-01-other');
				}else{
					this.$c_innovative.removeClass('bg-01-other');
				}
			}else if(scorollNum > bg03_Top.top && scorollNum < bg03_Top.top+this.$bg03.height()){
				this.$c_innovative.addClass('bg-03-fix');
				this.$c_innovative.removeClass('bg-01-fix bg-01-other');
			}else{
				this.$c_innovative.removeClass('bg-01-fix bg-03-fix bg-01-other');
			}
		}

		private motionStart(target: JQuery) {
			const mode = target.data('mode');
			const option = target.data('option');
			if(mode === 'fade') TweenMax.fromTo(target, 1, { alpha: 0}, { alpha: 1,delay:0.5});
			if(mode === 'fade0') TweenMax.fromTo(target, 1, { alpha: 0}, { alpha: 1,delay:0.2});
			if(mode === 'move-Y') TweenMax.fromTo(target, 1, { alpha: 0, y: 20}, { alpha: 1, y: 0 });
			if(mode === 'move-l') TweenMax.fromTo(target, 1, { alpha: 0, x: -20}, { alpha: 1, x: 0 });
			if(mode === 'move-r') TweenMax.fromTo(target, 1, { alpha: 0, x: 20}, { alpha: 1, x: 0 });
			if(mode === 'scale') TweenMax.fromTo(target, 1, { alpha: 0, scale: 0}, { alpha: 1, scale: 1 ,ease: Back.easeOut});

		}

		public onResize() {
			super.onResize();
			if (Model.data.modelMq === 'SP') {
				
			} else {
			}
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

