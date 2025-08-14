'use strict';

import $ from 'jquery';
import { TweenMax, Power0 } from 'gsap';
import BrowseDevice from './components/modules/utils/BrowseDevice';
import 'jquery-match-height';

import Model from './global/Model';
import Config from './global/Config';
import Base from './components/core/Base';
import SnsShare from './components/modules/SnsShare';
import Tools from './components/modules/Tools';
import ModalBox from './components/modules/ModalBox';
import HashAddress from './components/modules/HashAddress';
import HeaderNavi from './components/HeaderNavi';
import PageMotion from './components/PageMotion';
import Accordion from './components/utils/Accordion';
import CarouselLinup from './components/utils/CarouselLinup';
namespace Main {
	export class rfc2021 extends Base.PageCore {
		// private $body = $('body');
		private $motionBox = $('.motion-box');
		private $modalCol = $('.modal-col');
		private $btnGalleryMore = $('.gallery-btn');
		private $galleryMask = $('.gallery-mask');
		private $galleryUl02 = $('.gallery-ul_02');
		private $btnLinup = $('.gallery-li');
		private $modalLineup = $('.modal-lineup');
		private $modalCat = $('.modal-cat');
		private $btnModalLineupClose = $('.modal-lineup__close');
		private $btnModalLineupBg = $('.modal-lineup__bg');
		private carouselLinup: any;
		private classComplete: string = 'motion-complete';
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
			this.onResize();
			this.$window.on('scroll', this.onScroll.bind(this));
			this.onScroll();
			this.mv();
		}

		/* 
			インスタンス作成
		 */
		private newCreate() {
			new SnsShare();
			new Tools();
			new HeaderNavi();

		}

		private onStart() {
			$('.profile-col__content').matchHeight();
			new ModalBox();
			new HashAddress();
			$('.js-accordion').each(function () {
				new Accordion($(this));
			})
			// $('.remote-ui__btn').on('click', this.onRemoteColOpen.bind(this))
			// $('.modal-col__ui--close').on('click', this.onRemoteColClose.bind(this))
			// $('.modal-col__bg').on('click', this.onRemoteColClose.bind(this))
			this.$btnGalleryMore.on('click', this.onGalleryMore.bind(this))
			this.$btnLinup.on('click', this.onLineup.bind(this));
			this.$btnModalLineupClose.on('click', this.onLineupClose.bind(this));
			this.$btnModalLineupBg.on('click', this.onLineupClose.bind(this));
			
		}

		public onResize() {
			super.onResize();
		}

		private mv() {
			TweenMax.fromTo($('.mv-left'), 1, { alpha: 0 }, { alpha: 1 });
			TweenMax.fromTo($('.mv-right'), 1, { alpha: 0 }, { alpha: 1,delay:0.5});
			TweenMax.fromTo($('.mv-title'), 1, { alpha: 0,marginTop:50}, { alpha: 1,marginTop:0,delay:1});
			TweenMax.fromTo($('.mv-box__area'), 1, { alpha: 0 }, { alpha: 1,delay:1});
			
		}

		private onGalleryMore(e) {
			$(e.currentTarget).hide();
			this.$galleryMask.addClass('active');
			const h = this.$galleryUl02.height();
			TweenMax.fromTo(this.$galleryMask, 1, { height: 0 }, {
				height: h, onComplte: () => {
					this.$galleryMask.removeAttr('style');
				}
			})
		}

		private onLineup(e) {
			const $btn = $(e.currentTarget);
			let id = $btn.index() +1;
			// const id = $btn.index($('.gallery'));
			// const id = $('.gallery').index($btn);
			// const id = $btn.index('.gallery');
			// const cat = $btn.attr('data-cta');
			if($($btn.parent('ul')).hasClass('gallery-ul_02')){
				id = id + 9;
			}
			console.log(id);

			this.$modalLineup.addClass('active');
			this.$modalCat.addClass('active');
			this.carouselLinup = new CarouselLinup(this.$modalCat, id - 1, false);
			return false;

		}

		private onLineupClose(e) {
			this.$modalLineup.removeClass('active');
			this.$modalCat.removeClass('active');
			this.carouselLinup.onReset();
		}

		private onScroll() {
			const scorollNum: number = this.$window.scrollTop() as number;
			for (let i = 0; i < this.$motionBox.length; i++) {
				let runBoxOffset: any = this.$motionBox.eq(i).offset();
				// const h = runBoxOffset.top - Number(this.$window.height()) + Number(this.$motionBox.eq(i).height()) * 0.5;
				const h = runBoxOffset.top - Number(this.$window.height()) * 0.8;
				if (!this.$motionBox.eq(i).hasClass(this.classComplete) && scorollNum > h) {
					this.motionStart(this.$motionBox.eq(i));
					this.$motionBox.eq(i).addClass(this.classComplete)
				}
			}

		}

		private motionStart(target: JQuery) {
			const mode = target.data('mode');
			const option = target.data('option');
			if(target.hasClass('flower-side')){
				TweenMax.fromTo(target, 2, { alpha: 0}, { alpha: 1});
			}else{
				TweenMax.fromTo(target, 1, { alpha: 0,y:50}, { alpha: 1,y:0});
			}

		}

		// private onRemoteColOpen(e){
		// 	e.preventDefault();
		// 	this.$modalCol.addClass('active');
		// }

		// private onRemoteColClose(e){
		// 	e.preventDefault();
		// 	this.$modalCol.removeClass('active');
		// }


	} //class
}

/**
 * DOM読み込み完了後
 */
document.addEventListener('DOMContentLoaded', () => {
	// console.log('DOMContentLoaded');
	if (!window.console) { window.console = <any>{ log: function (msg: string) { }, }; }
	Model.data.rootApp = new Main.rfc2021();
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