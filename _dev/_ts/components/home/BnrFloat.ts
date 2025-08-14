/* 
機能:目的の場所へスクロールする
 */
'use strict';

import $ from 'jquery';
import { TweenMax, Power3 } from 'gsap';
import model from '../../global/Model'
import Config from '../../global/Config'
// declare var Curtains:any;

export class BnrFloat {
	private $html = $('html');
	private $body = $('body');
	private $header = $('.global-header');
	private $fotter = $('.global-footer');
	private $target = $('.bnr-float');
	private $btnClose = $('.btn-close');
	private $mv = $('.mv');
	private classActive = 'active';
	private bnrPos: any;
	private setTimeoutId: any;
	private isLoaded:boolean = false;
	private isClose:boolean = false;

	constructor() {
		this.init();
	}

	private init() {
		$(window).on('scroll', () => {
			if (model.data.modelMq === 'SP' && this.isLoaded) {
				TweenMax.to($('.bnr-float_firstview'), 0.5, {
					'opacity': 0, onComplete: () => {
						$('.bnr-float_firstview').hide().addClass('reflection-none');
					}
				});
			}
		});
		$(window).on('scroll', this.onView.bind(this));
		$(window).on('resize', this.onView.bind(this));
		this.$btnClose.on('click', this.onBtnClose.bind(this));
		this.onView();
		TweenMax.delayedCall(0.5,()=>{this.isLoaded = true;})
		if($('.bnr-float').length){
			this.$body.addClass('is-bnr-float');
		}
	}


	private onView() {
		if (this.$target.hasClass('hide') || this.isClose) { return };
		const mvH = this.$mv.height();
		const scNum = $(window).scrollTop();
		const fotterTop = this.$fotter.offset().top + $(window).height();
		/* if(model.data.modelMq === 'SP'){
			this.$target.show();
			this.$target.removeClass('active');
			TweenMax.set(this.$target,{alpha:1});
			return;
		} */
		if (this.setTimeoutId) {
			clearTimeout(this.setTimeoutId);
		}

		let moveY = scNum - this.bnrPos;
		if (scNum < mvH + this.$header.height() && model.data.modelMq !== 'SP') {
			// TweenMax.killTweensOf(this.$target);
			moveY = 0;
		}

		if (this.$target.hasClass(this.classActive) && model.data.modelMq !== 'SP') {
			if (moveY >= this.$target.height() / 2) { moveY = this.$target.height() / 2; }
			if (moveY <= ($(window).height() - this.$target.height()) * -1) { moveY = ($(window).height() - this.$target.height()) * -1; };
			TweenMax.set(this.$target, { y: moveY * -1 });
		} else if (model.data.modelMq === 'SP') {
			TweenMax.set(this.$target, { x: 0, y: 0 });
		}
		this.setTimeoutId = setTimeout(() => {
			// スクロール終了時の処理内容
			if (this.$target.hasClass(this.classActive) && model.data.modelMq !== 'SP') {
				TweenMax.to(this.$target, 0.3, { y: 0, alpha: 1, ease: Power3.easeInOut });
			}
			this.bnrPos = scNum;
			this.setTimeoutId = null;
		}, 200);
		if (model.data.modelMq!== 'SP') {
			if (mvH < scNum) {
				if (!this.$target.hasClass(this.classActive)) {
					TweenMax.killTweensOf(this.$target);
					this.$target.removeAttr('style');
					this.$target.show();
					TweenMax.set(this.$target, { alpha: 0 });
					this.$target.addClass(this.classActive);
				}
			} else {
				if (this.$target.hasClass(this.classActive)) {
					TweenMax.killTweensOf(this.$target);
					this.$target.removeAttr('style');
					this.$target.removeClass(this.classActive);
				}
			}
		}

		if (model.data.modelMq === 'SP') {
			if (this.setTimeoutId) {
				clearTimeout(this.setTimeoutId);
			}
			
			const headerTop = $('.mv-box').offset().top - this.$header.height();
			const mvH = $('.mv-box').height();
			const mvPosBottom = $('.mv-box').height() - $(window).height() + Number($('.navigation').height()) + this.$target.height();
			if(mvPosBottom > scNum){
				TweenMax.killTweensOf(this.$target);
				this.$target.removeClass(this.classActive);
				this.$target.removeAttr('style');
			}else{
				if(!this.$target.hasClass(this.classActive)){
					TweenMax.fromTo(this.$target,0.5,{alpha:0},{alpha:1})
				}
				this.$target.addClass(this.classActive);
			}
		}
	}

	private onBtnClose(e) {
		e.preventDefault();
		const $btnClose = $(e.currentTarget);
		const $bnr = $btnClose.parent('.bnr-target');
		$bnr.hide();
		$bnr.addClass('reflection-none');
		console.log('close');
		this.isClose = true;
	}

}

export default BnrFloat;
