'use strict';

import $, { timers, Tween } from 'jquery';
import { TweenMax, Power0, Power3 } from 'gsap';
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

		private $troubleUl = $('.sec-trouble_ul');
		private $troubleli = this.$troubleUl.find('li');
		private $globalNav = $('.global-header .navigation');
		private $pointUl = $('.sec-point__ul');
		private $pointLi = this.$pointUl.find('li');
		private $pointArrow = $('.sec-point__arrow');
		private vec = '';
		private vecNum = 0;

		private $voiceMask = $('.voice-mask');
		private $voiceUl02 = $('.sec-voice__box');
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
			$('.btn-voice').on('click', this.onVoiceMore.bind(this))
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
		}

		private onStart() {
			new HashAddress();
			if (this.$wrap.hasClass('events') || this.$wrap.hasClass('introduction')) new ModalBox();
			$('.js-accordion').each(function () {
				new Accordion($(this));
			})
			this.troubleliYoyo();
			// this.pointScroll();
			this.parallaxScroll();
			this.mv();
		}

		private mv() {
			TweenMax.fromTo($('.mv-box__product'), 1, { alpha: 0}, { alpha: 1 })
			TweenMax.fromTo($('.mv-box__text'), 1, { alpha: 0, marginTop: 50 }, { alpha: 1, marginTop: 0, delay: 1 });
			TweenMax.fromTo($('.mv-box__day'), 1, { alpha: 0, marginTop: 50 }, { alpha: 1, marginTop: 0, delay: 1.5 });
		}

		private onScroll() {
			const scorollNum: number = this.$window.scrollTop() as number;
			if (this.vecNum > scorollNum) this.vec = 'up';
			if (this.vecNum < scorollNum) this.vec = 'down';
			for (let i = 0; i < this.$motionBox.length; i++) {
				let runBoxOffset: any = this.$motionBox.eq(i).offset();
				// const h = runBoxOffset.top - Number(this.$window.height()) + Number(this.$motionBox.eq(i).height()) * 0.5;
				const h = runBoxOffset.top - Number(this.$window.height()) * 0.8;
				if (!this.$motionBox.eq(i).hasClass(this.classComplete) && scorollNum > h) {
					this.motionStart(this.$motionBox.eq(i));
					this.$motionBox.eq(i).addClass(this.classComplete)
				}
			}
			// this.pointScroll();
			this.parallaxScroll();
			this.vecNum = scorollNum;
		}

		private motionStart(target: JQuery) {
			const mode = target.data('mode');
			const option = target.data('option');
			TweenMax.fromTo(target, 1, { alpha: 0, x: -10 }, { alpha: 1, x: 0 });

		}

		private troubleliYoyo() {
			// for (let i = 0; i < this.$troubleli.length; i++) {
			// 	if( ( i % 2 ) != 0 ) {
			// 		TweenMax.fromTo(this.$troubleli.eq(i),3,{y:0},{y:20, repeat:-1, yoyo:true,ease: Power3.easeInOut})
			// 	}else{
			// 		TweenMax.fromTo(this.$troubleli.eq(i),2,{y:0},{y:-20, repeat:-1, yoyo:true,ease: Power3.easeInOut})
			// 	}
			// }
			TweenMax.fromTo(this.$troubleli.eq(0), 3, { y: 0 }, { y: 20, repeat: -1, yoyo: true, ease: Power0.easeNone })
			TweenMax.fromTo(this.$troubleli.eq(1), 2, { y: 0 }, { y: 20, repeat: -1, yoyo: true, ease: Power0.easeNone })
			TweenMax.fromTo(this.$troubleli.eq(2), 2, { y: 0 }, { y: -10, repeat: -1, yoyo: true, ease: Power0.easeNone })
			TweenMax.fromTo(this.$troubleli.eq(3), 3, { y: 0 }, { y: -20, repeat: -1, yoyo: true, ease: Power0.easeNone })
			TweenMax.fromTo(this.$troubleli.eq(4), 3, { y: 0 }, { y: 10, repeat: -1, yoyo: true, ease: Power0.easeNone })
		}

		private pointScroll() {
			const globalNavH = Number(this.$globalNav.outerHeight(true));
			const scNum = $(window).scrollTop();
			const pointTopNum = $('.sec-point').offset().top - globalNavH;
			// const pointBottomNum = $('.sec-point').offset().top + $('.sec-point').height() - $(window).height();
			// const pointBottomNum = $('.sec-point__lead').offset().top - $('.sec-point__lead').height() - $('.sec-point__block').height();
			const pointBottomNum = $('.sec-point__lead').offset().top - $(window).height();
			const pointH = $('.sec-point').height();
			const pointScroll = $('.sec-point').scrollTop();
			// console.log(pointTopNum);
			let scH = scNum + pointH + $(window).height();
			if (Model.data.modelMq === 'SP') {

				return;
			}
			// this.$pointLi.removeClass('active');
			if (scNum > $('.sec-point').offset().top - $(window).height()) {
				TweenMax.to($('.sec-point__block'), 0.5, { alpha: 1 });
				// this.$pointLi.eq(2).addClass('active');
				this.$pointArrow.addClass('show');
			}
			if (scNum > pointTopNum) {
				if ($('.sec-point__block').hasClass('content-fixed')) {
					// const per = Math.floor(pointH/3);

					const per = Math.floor(pointH / 3);
					// console.log(scNum, scNum + per * 1);
					
					// TweenMax.set(this.$pointLi,{alpha:0})
					if (scNum > pointTopNum && scNum < pointTopNum + 500) {
						// console.log('1つ目');
						if (!this.$pointLi.eq(0).hasClass('active')) TweenMax.fromTo(this.$pointLi.eq(0), 1.5, { alpha: 0 }, { alpha: 1 })
						this.$pointLi.eq(0).addClass('active');
						this.$pointLi.eq(1).removeClass('active');
						this.$pointLi.eq(2).removeClass('active');
						this.$pointArrow.addClass('show');
					}
					if (scNum >= pointTopNum + 500 && scNum < pointTopNum + per * 1 + 500) {
						// console.log('2つ目');
						if (!this.$pointLi.eq(1).hasClass('active')) TweenMax.fromTo(this.$pointLi.eq(1), 1.5, { alpha: 0 }, { alpha: 1 })
						this.$pointLi.eq(1).addClass('active');
						this.$pointLi.eq(0).removeClass('active');
						this.$pointLi.eq(2).removeClass('active');
						this.$pointArrow.addClass('show');
					}
					if (scNum >= pointTopNum + per * 1 + 500 && scNum < pointTopNum + per * 2) {
						if (!this.$pointLi.eq(2).hasClass('active')) TweenMax.fromTo(this.$pointLi.eq(2), 1.5, { alpha: 0 }, { alpha: 1 })
						this.$pointLi.eq(2).addClass('active');
						this.$pointLi.eq(0).removeClass('active');
						this.$pointLi.eq(1).removeClass('active');
						this.$pointArrow.addClass('show');
					}
					// if (scNum > pointTopNum + per * 2 - 100) {
					// 	console.log('3つ目');
					// 	this.$pointLi.eq(2).addClass('active');
					// }
				}
				
			}

			if (scNum < pointTopNum) {
				this.$pointLi.removeClass('active');
				this.$pointLi.eq(0).addClass('active');
				this.$pointArrow.removeClass('show');
				$('.sec-point__block').removeClass('content-fixed content-bottom')
			} else if (scNum > pointTopNum && scNum < pointBottomNum+50) {
				$('.sec-point__block').addClass('content-fixed').removeClass('content-bottom');
				if (Model.data.modelMq != 'SP') {
					TweenMax.to($('.sec-point__lead'), 1, { alpha: 0});
				}

			}
			if (scNum > pointBottomNum +50) {
				this.$pointLi.removeClass('active');
				this.$pointLi.eq(2).addClass('active');
				this.$pointArrow.removeClass('show');
				// TweenMax.to($('.sec-point__block'), 0.2, {
				// 	alpha: 0, onComplete: () => {
				// 		$('.sec-point__block').removeClass('content-fixed').addClass('content-bottom');
				// 	}
				// })
				$('.sec-point__block').removeClass('content-fixed').addClass('content-bottom');
				if (Model.data.modelMq != 'SP') {
					TweenMax.to($('.sec-point__lead'), 1, { alpha: 1});
				}
			}
			if (Model.data.modelMq === 'SP') {
				this.$pointLi.eq(0).removeClass('active').removeAttr('style');
				$('.sec-point__block').removeClass('content-fixed content-bottom').removeAttr('style');
				$('.sec-point__lead').removeAttr('style');
				this.$pointArrow.removeClass('show');
			}
		}

		private parallaxScroll() {
			const $ball = $('.ball');
			const globalNavH = this.$globalNav.height()
			const scNum = $(window).scrollTop();
			const parallaxTopNum = $('.parallax').offset().top - globalNavH - $(window).height();
			if (Model.data.modelMq === 'SP') return;
			if (scNum > parallaxTopNum) {
				// console.log('パララックス');
				if (this.vec === 'up') {
					for (let i = 0; i < $ball.length; i++) {
						if ((i % 2) != 0) {
							TweenMax.to($ball.eq(i), 1, { y: `-= 20` });
						} else {
							TweenMax.to($ball.eq(i), 1, { y: `+= 20` });
						}
					}
				} else {
					for (let i = 0; i < $ball.length; i++) {
						if ((i % 2) != 0) {
							TweenMax.to($ball.eq(i), 1, { y: `+= 20` });
						} else {
							TweenMax.to($ball.eq(i), 1, { y: `-= 20` });
						}
					}
				}

			} else {
				$ball.removeClass('style');
			}
		}

		public onResize() {
			super.onResize();
			if (Model.data.modelMq === 'SP') {
				this.$pointLi.removeClass('active').removeAttr('style');
				$('.sec-point__block').removeClass('content-fixed content-bottom').removeAttr('style');
				$('.sec-point__lead').removeAttr('style');
				this.$pointArrow.removeClass('show');
				TweenMax.delayedCall(1, ()=>{
					$('.sec-point__lead').removeAttr('style');
					this.$pointArrow.removeClass('show');
				});
			} else {
				// this.pointScroll();
				// this.parallaxScroll();
			}
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
					// console.log('****afterChange');
					this.moveiStart($('.slick-current video'));
				}
			});

			$targetUl.on('beforeChange', (event, slick, currentSlide) => {
				if ($('.slick-current video').length > 0) {
					const $v:any = $('.slick-current video');
					$v[0].pause();
				}
			});

		}
		private onModalOpen(e) {
			e.preventDefault();
			this.slideId = $(e.currentTarget).index();
			if($(e.currentTarget).closest(".voice-mask").length > 0){
				this.slideId = this.slideId+8;
			}
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

		private onVoiceMore(e) {
			// console.log('voice');
			$(e.currentTarget).hide();
			this.$voiceMask.addClass('active');
			const h = this.$voiceUl02.height();
			TweenMax.fromTo(this.$voiceMask, 1, { height: 0 }, {
				height: h, onComplete: () => {
					this.$voiceMask.removeAttr('style');
				}
			})
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

