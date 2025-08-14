/* 
機能:目的の場所へスクロールする
 */
'use strict';

import $ from 'jquery';
import Model from '../../global/Model'
import Config from '../../global/Config'

export class Tools {
	private $html: JQuery = $('html');
	private $body: JQuery = $('body');
	private $menuTrigger: JQuery = $('.menu-hamburger');
	constructor() {

		$(".contents__item.product").on('click', this.onFotterProductOpen.bind(this));
		$(".contents__item.shop").on('click', this.onFotterShopOpen.bind(this));
		$(".subcontents__close").on('click', this.onFotterSubClose.bind(this));
		$(".pagetop").on('click', this.onPageTop.bind(this));
		$('a[href^="#"]').on('click', this.pageInLink.bind(this));
		$(".spnav").on('click', this.onSpNavi.bind(this));
		$(window).on(Config.EVENT_MQ_CHANGE, this.init.bind(this));
		this.init();

		/* $('a[href^="#"]').click(
			function () {
				var speed = 500;
				var href = $(this).attr("href");
				var target = $(href == "#" || href == "" ? 'html' : href);
				var position = target.offset().top;
				$("html, body").animate({
					scrollTop: position
				}, speed, "swing");
				return false;
			}
		); */
	}

	private init() {
		this.$body.removeClass('m-pc m-sp');
		if (Model.data.modelMq === 'SP') {
			this.$body.addClass('m-sp');
		} else {
			this.$body.addClass('m-pc');
		}
	}

	private onFotterProductOpen(e: JQueryEventObject) {
		// e.preventDefault();
		// if (Model.data.modelMq !== 'SP') return;
		if ($(window).width()>1201) return;
		this.$body.removeClass('m-spfooterproduct-close');
		this.$body.addClass('m-spfooterproduct-open');
		// return false;
	}

	private onFotterShopOpen(e: JQueryEventObject) {
		// e.preventDefault();
		// if (Model.data.modelMq !== 'SP') return;
		if ($(window).width()>1201) return;
		this.$body.removeClass('m-spfootershop-close');
		this.$body.addClass('m-spfootershop-open');
		// return false;
	}

	private onFotterSubClose(e: JQueryEventObject) {
		e.preventDefault();
		this.$body.removeClass('m-spfooterproduct-open m-spfootershop-open');
		this.$body.addClass('m-spfooterproduct-close m-spfootershop-close');
		return false;
	}

	private onSpNavi(e: JQueryEventObject) {
		e.preventDefault();
		const btn: JQuery = $(".menu-hamburger");
		if (this.$body.hasClass('m-spnav-open')) {
			this.$body.removeClass('m-spnav-open');
		} else {
			this.$body.addClass('m-spnav-open');
		}
		if (btn.hasClass('active')) {
			btn.removeClass('active');
		} else {
			btn.addClass('active');
		}
	}

	private onPageTop() {
		$('body,html').animate({
			scrollTop: 0
		}, 500, 'swing');
		return false;
	}

	private pageInLink(e) {
		e.preventDefault();
		const btn = $(e.currentTarget);
		const speed = 500;
		const href:string = btn.attr("href") as string;
		const target = $(href == "#" || href == "" ? 'html' : href);
		const position = target.offset().top;
		let headerH = 0;
		if($('.global-header').length > 0){
			headerH = Number($('.global-header').outerHeight(true));
		}
		$("html, body").animate({
			scrollTop: position-headerH- 20
		}, speed, "swing");
		this.onReset();
		// return false;
	}

	private onReset(){
		this.$body.removeClass('m-spnav-open');
		$(".menu-hamburger").removeClass('active');
	}
}

export default Tools;
