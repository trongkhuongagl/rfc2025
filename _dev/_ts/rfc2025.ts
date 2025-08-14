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
// import Mv from './components/rfc2025/Mv';
// import Map from './components/rfc2025/Map';


namespace Main {
	export class rfc2025 extends Base.PageCore {
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
		private $parallaxArea = $('.js-Parallax');
		private $secpludctpl = $('#product');
		private $palaProduct = $('.sec-product__ph');
		private $mv = $('.mv');
		private $mvBox = $('.mv-box');
		private $navigation = $('.navigation');
		private scrollV = 'down';
		private $bg = $('.bg');
		private tempScrollNum = 0;
		constructor() {
			super();
			this.onInit();
		}

		public onInit() {
			super.onInit();
			$(window).on(Config.EVENT_LOADED, this.onLoaded.bind(this));
			$(window).on(Config.EVENT_MQ_CHANGE, this.onMQChange.bind(this));
			this.newCreate();
			this.onStart();

			
			$('.btn-anker').click(function() {
				var headerHeight = $('.navigation').outerHeight();
				console.log('anker:',headerHeight)
				const link = String($(this).attr("href"));
				var target = $('#detail');
				var position = target.offset().top - headerHeight -50;
				$('body,html').stop().animate({scrollTop:position}, 300);   
				return false;
			});
			

			const $galleryOld = $('.gallery-li__old');
			for (let i = 0; i < $galleryOld.length; i++) {
				$galleryOld.eq(i).attr({'data-id':13+i});
			}
		}

		public onLoaded() {

			super.onLoaded();
			this.onResize();
			this.$window.on('scroll', this.onScroll.bind(this));
			this.onScroll();
			
			// new Mv();
			// new Map();
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
			this.onAccPCOpen($('.detail-set-first'));
			// $('.remote-ui__btn').on('click', this.onRemoteColOpen.bind(this))
			// $('.modal-col__ui--close').on('click', this.onRemoteColClose.bind(this))
			// $('.modal-col__bg').on('click', this.onRemoteColClose.bind(this))
			this.$btnGalleryMore.on('click', this.onGalleryMore.bind(this));
			$('.page-btn_textMask').on('click', this.onTextMore.bind(this));
			this.$btnLinup.on('click', this.onLineup.bind(this));
			this.$btnModalLineupClose.on('click', this.onLineupClose.bind(this));
			this.$btnModalLineupBg.on('click', this.onLineupClose.bind(this));

		}

		public onResize() {
			super.onResize();
			const windowH = this.$window.height() - this.$navigation.height();
			// this.$bg.css({ 'paddingTop': windowH*0.3 });
			// this.$mvBox.height(windowH+5);
			// TweenMax.killTweensOf($('.card-photo__ph'));
			// TweenMax.killTweensOf(this.$palaProduct);
		}
		

		private onAccPCOpen($target){
			if(Model.data.modelMq === 'PC'){
				// $target.find('.js-accordion').addClass('open');
				$target.find('.js-accordion-contents').css({'height':'auto','opacity':''});
			}else{
				$target.find('.js-accordion').removeClass('open');
				$target.find('.js-accordion-contents').css({'height':'0','opacity':'0'});

			}
			
		}


		private onGalleryMore(e) {
			$(e.currentTarget).hide();
			this.$galleryMask.addClass('active');
			const h = this.$galleryUl02.height();
			TweenMax.fromTo(this.$galleryMask, 1, { height: 0 }, {
				height: h, onComplete: () => {
					$('.gallery-mask').removeAttr('style');
				}
			})
		}

		private onTextMore(e) {
			const id = $(e.currentTarget).attr('data-jump');
			$(e.currentTarget).hide();
			$(`#${id}.text-mask`).addClass('active');
			var headerHeight = $('.navigation').outerHeight();
			var target = $('#'+id+' .text-mask__contents');
			console.log('id@:',id);
			var position = $(window).scrollTop();
			
			const h = target.height();
			
			// var position = $(window).scrollTop()-h-headerHeight;
			
			TweenMax.fromTo($('.text-mask'), 0.5, { height: 0 }, {
				height: h,onUpdate:()=>{
					console.log('onUpdate');
					// const position = target.offset().top;
					// $('body,html').stop().animate({scrollTop:position-headerHeight}, 100);
					$('body,html').stop().scrollTop(position);
				}, onComplete: () => {
					$('.text-mask').removeAttr('style');
					
				}
			})

			

		}

		private onLineup(e) {
			const $btn = $(e.currentTarget);
			// let id = $btn.index() + 1;
			let id = Number($btn.attr('data-id'));
			console.log(id)
			// if ($($btn.parent('ul')).hasClass('gallery-ul_02')) {
			// 	id = id + 12;
			// }


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
			// if(scorollNum <= $('.navigation').height()){
			// 	this.$mv.removeClass('hide');
			// 	TweenMax.to(this.$mv,0.8,{alpha:1});
			// }else{
			// 	TweenMax.to(this.$mv,0.8,{alpha:0,onComplete:()=>{
			// 		this.$mv.addClass('hide');
			// 	}});
			// }
			if (this.tempScrollNum < scorollNum) {
				this.scrollV = 'up';
			} else {
				this.scrollV = 'down';
			}
			for (let i = 0; i < this.$motionBox.length; i++) {
				let runBoxOffset: any = this.$motionBox.eq(i).offset();
				// const h = runBoxOffset.top - Number(this.$window.height()) + Number(this.$motionBox.eq(i).height()) * 0.5;
				const h = runBoxOffset.top - Number(this.$window.height()) * 0.8;
				if (!this.$motionBox.eq(i).hasClass(this.classComplete) && scorollNum > h) {
					this.motionStart(this.$motionBox.eq(i));
					this.$motionBox.eq(i).addClass(this.classComplete)
				}
			}
			// TweenMax.killTweensOf($('.card-photo__ph'));
			// TweenMax.killTweensOf(this.$palaProduct);
			for (let i = 0; i < this.$parallaxArea.length; i++) {
				const $ph = this.$parallaxArea.eq(i);
				
					if($ph.offset().top- $(window).height()<scorollNum && $ph.offset().top > scorollNum){
					const n =  $ph.offset().top - scorollNum;
					let scaleN = n/$ph.height()*0.3+1;
					// console.log(scaleN);
					if (scaleN < 1) scaleN = 1;

					$ph.find('.js-parallax-obj').css({ 'transform': `scale(${scaleN})` });
				} else {
					$ph.find('.js-parallax-obj').removeAttr('style');
				}
			}


			this.tempScrollNum = scorollNum;
		}

		private onMQChange() {
			$('.card-photo__ph').removeAttr('style');
			this.$mv.removeClass('hide');
			this.onAccPCOpen($('.detail-set-first'));
		}

		private motionStart(target: JQuery) {
			const mode = target.data('mode');
			const option = target.data('option');
			if (target.hasClass('flower-side')) {
				TweenMax.fromTo(target, 2, { alpha: 0 }, { alpha: 1 });
			} else {
				TweenMax.fromTo(target, 1, { alpha: 0, y: 50 }, { alpha: 1, y: 0 });
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
	Model.data.rootApp = new Main.rfc2025();
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