'use strict';

import $, { timers } from 'jquery';
import { TweenMax, Power0 } from 'gsap';
import 'slick-carousel';
import BrowseDevice from './components/modules/utils/BrowseDevice';

import Model from './global/Model';
import Config from './global/Config';
import Base from './components/core/Base';
import SnsShare from './components/modules/SnsShare';
import Tools from './components/modules/Tools';
import HashAddress from './components/modules/HashAddress';
import HeaderNavi from './components/HeaderNavi';
import Accordion from './components/utils/Accordion';
import ModalBox from './components/modules/ModalBox';
namespace Main {
	export class Page extends Base.PageCore {
		private $wrap = $('.wrap');
		private $motionBox = $('.motion-box');
		private $mvBox = $('.mv-box');
		private $modalCol = $('.modal-col');
		private $modalLi = $('.modal-li');
		private classActive: string = 'active';
		private classComplete: string = 'motion-complete';
		private slickObj: any;
		private slickList: any = [];
		private slideId: number = 0;
		private mvCount = 1;

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
			$('.sec-voice__li').on('click', this.onModalOpen.bind(this))
			$('.modal-col__ui--close').on('click', this.onModalClose.bind(this))
			$('.modal-col__bg').on('click', this.onModalClose.bind(this))
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
			new HashAddress();
			if (this.$wrap.hasClass('events') || this.$wrap.hasClass('introduction')) new ModalBox();
			$('.js-accordion').each(function () {
				new Accordion($(this));
			})
		}

		private mv() {
			TweenMax.fromTo(this.$mvBox, 1.5, { alpha: 0 }, { alpha: 1 });
			TweenMax.to(this.$mvBox, 2, {
				alpha: 0, delay: 5, onComplete: () => {
					this.changeMv();
				}
			});
		}

		private changeMv() {
			const item = $('.mv-box__item');
			const currentClass = 'current';
			const prevClass = 'prev';
			this.mvCount++;
			if (this.mvCount > item.length) this.mvCount = 1;
			item.removeClass(prevClass)
			for (let i = 0; i < item.length; i++) {
				if (item.eq(i).hasClass(currentClass)) {
					item.eq(i).addClass(prevClass)
				}
			}
			item.removeClass(currentClass)
			item.eq(this.mvCount - 1).addClass(currentClass);
			this.mv();
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
			TweenMax.fromTo(target, 1, { alpha: 0, x: -10 }, { alpha: 1, x: 0 });

		}

		public onResize() {
			super.onResize();
		}

		private onSlickInit($target) {
			const $targetUl = $target.find('.modal-media__ul');
			this.slickObj = $targetUl.slick({
				dots: false,
				arrows: false,
				infinite: false,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1
			})
			$target.find('.modal-media__button--back').on('click', () => {
				$targetUl.slick('slickPrev');
			});
			$target.find('.modal-media__button--next').on('click', () => {
				$targetUl.slick('slickNext');
			});

			$targetUl.on('afterChange', (event, slick, currentSlide) => {
				this.onModalCount($targetUl);
				if ($('.slick-current video').length > 0) {
					this.moveiStart($('.slick-current video'));

				}
			});

		}
		private onModalOpen(e) {
			e.preventDefault();
			this.slideId = $(e.currentTarget).index();
			this.$modalCol.addClass('active');
			this.$modalLi.eq(this.slideId).addClass('active');
			this.onSlickInit(this.$modalLi.eq(this.slideId));
			this.onModalUiSet(0);
			// $('.modal-media').eq(0).slick('setPosition');
		}
		private onModalClose(e) {
			e.preventDefault();
			this.slickObj.slick('unslick');
			this.$modalCol.removeClass('active');
			this.$modalLi.removeClass('active');

		}

		private onModalCount($targetUl) {
			const n = $targetUl.slick('slickCurrentSlide');
			this.onModalUiSet(n);
		}

		private onModalUiSet(n) {
			const $mediaLi = this.$modalLi.eq(this.slideId).find('.modal-media__li');
			const $btnBack = $('.modal-media__button--back');
			const $btnNext = $('.modal-media__button--next');
			$btnBack.removeClass('off');
			$btnNext.removeClass('off');
			if (n <= 0) $btnBack.addClass('off');
			if (n >= $mediaLi.length - 1) $btnNext.addClass('off');

		}

		private moveiStart($target) {
			// console.log('再生');
			// $target[0].currentTime = 0;
			if ($target.hasClass('movie-rewind')) {
				// console.log('movie-rewind');
				$target[0].currentTime = 0;
			}
			$target[0].play();
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

