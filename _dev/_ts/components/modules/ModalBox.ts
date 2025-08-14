/* 
機能:目的の場所へスクロールする
 */
'use strict';

import $ from 'jquery';
import BrightCove from './BrightCove';

export class ModalBox {
	private brightCove:BrightCove;
	private $html = $('html');
	private $body = $('body');
	private $modal = $('.modal');
	private $modalBox = $('.modal-box');
	private $btnModalOpen = $('.modal-open');
	private $btnModalClose = $('.modal-close');
	private $modalBg = $('.modal-bg');
	private $btnClose = $('.modal-btn__close');
	private classModalRelative = 'is-modal-relative';
	private aspectW = 16;
	private aspectH = 9;
	constructor() {
		this.brightCove  = new BrightCove();
		this.$btnModalOpen.on('click',this.onBtnModalOpen.bind(this));
		this.$btnModalClose.on('click',this.onBtnModalClose.bind(this));
		this.$modalBg.on('click',this.onBtnModalClose.bind(this));
		$(window).on('resize',this.onResize.bind(this));
		
	}

	private onBtnModalOpen(e:JQueryEventObject){
		e.preventDefault();
		const $btn = $(e.currentTarget);
		
		if($btn.hasClass('btn-brightcove')){
			const href = $btn.attr('href');
			const imgPath:string = $btn.data('cover');
			this.onBrightcoveOpen(href,imgPath);
		}
		this.onModalShow();
		this.onResize();
	}

	private onBtnModalClose(e:JQueryEventObject){
		e.preventDefault();
		// console.log('close');
		this.onModalHide();
		return false;
	}

	private onBrightcoveOpen(playId,coverImg){
		// console.log('onBrightcoveOpen:'+playId);
		this.brightCove.onInit(playId,coverImg);
	}

	private onModalShow(){
		this.$modal.show();
	}

	private onModalHide(){
		this.$modal.hide();
		this.brightCove.onDispose();
		this.$modal.find('.modal-layer').empty();
		this.kill();
	}

	private onResize(){
		const btnCloseTop = this.$btnClose.offset().top;
		const btnCloseH = this.$btnClose.height();
		// this.$modalBox.css({'width':'','height':''})
		this.$html.removeClass(this.classModalRelative);
			this.$modalBox.css({'width':'','height':''})
		if(this.$modalBox.height() > $(window).height()-btnCloseH){
			this.$html.addClass(this.classModalRelative);
			this.$modalBox.width($(window).height()*(this.aspectW/this.aspectH)-btnCloseH);
			this.$modalBox.height($(window).height()-btnCloseH);
		}else{
			
		}
	}

	private kill(){
		this.$html.removeClass(this.classModalRelative);
	}
}

export default ModalBox;
