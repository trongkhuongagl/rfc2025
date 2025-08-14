/* 
機能:目的の場所へスクロールする
 */
'use strict';

import $ from 'jquery';

export class BtnShop {
	private $html = $('html');
	private $body = $('body');
	private $target = $('.shop-list__banner');

	constructor() {
		this.init();
	}

	private init(){
		this.$target.on('touchstart',this.onTouchstart.bind(this));
		this.$target.on('touchend',this.onTatchEnd.bind(this));
	}

	private onTouchstart(e:JQueryEventObject){
		const btn = $(e.currentTarget);
		btn.addClass('active');
	}

	private onTatchEnd(e:JQueryEventObject){
		this.$target.removeClass('active');
	}
}

export default BtnShop;
