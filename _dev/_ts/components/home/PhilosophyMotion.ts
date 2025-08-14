/* 
機能:目的の場所へスクロールする
 */
'use strict';

import $ from 'jquery';
import { TweenMax ,Power3, Power2} from 'gsap';
import model from '../../global/Model'
import Config from '../../global/Config'
// declare var Curtains:any;

export class PhilosophyMotion {
	private $html = $('html');
	private $body = $('body');
	private $box = $('.philosophy-box');
	private $logo = $('.philosophy-logo');
	private $ColPc = $('.philosophy-col.pc');
	private $ColSp = $('.philosophy-col.sp');
	private classComplete = 'motionComplete';
	constructor() {
		this.init();
	}

	private init(){
		$(window).on('scroll',this.onView.bind(this));
		$(window).on('resize',this.onView.bind(this));
		$(window).on(Config.EVENT_MQ_CHANGE,this.modeChange.bind(this));
		this.onView();
	}

	private modeChange(){
		this.$box.removeClass(this.classComplete);
		this.onView();
	}

	private onView(){
		const boxTop = this.$box.offset().top - $(window).height()*0.5;
		const scNum = $(window).scrollTop();
		if(boxTop < scNum && !this.$box.hasClass(this.classComplete)){
			this.motion();
			this.$box.addClass(this.classComplete);
		}
		
	}
	
	private motion(){
		TweenMax.killChildTweensOf(this.$box);
		TweenMax.fromTo(this.$logo,1,{alpha:0},{alpha:1});
		if(model.data.modelMq === 'SP'){
			this.motionText(this.$ColSp);
		}else{
			this.motionText(this.$ColPc);
		}
	}

	private motionText($target:JQuery){
		const $targetText = $target.find('.philosophy-text');
		for (let i = 0; i < $targetText.length; i++) {
			TweenMax.fromTo($targetText.eq(i),1.2,{alpha:0,top:25},{alpha:1,top:0,delay:(i*0.4)+0.6,ease: Power2.easeOut});
		}
	}
}

export default PhilosophyMotion;
