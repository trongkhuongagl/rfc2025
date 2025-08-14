/* 
機能:目的の場所へスクロールする
 */
'use strict';

import $ from 'jquery';
import { TweenMax,Power0 ,Power3} from 'gsap';

// declare var Curtains:any;

export class MvMotion {
	private $html = $('html');
	private $body = $('body');
	private $mvBox = $('.mv-box');
	private $mvUl = $('.mv-ul');
	private $mvLi = $('.mv-li');
	private $mvTotal = this.$mvLi.length;
	private id:number = 1;
	private delayedCallObj_1:any = null; 
	private delayedCallObj_2:any = null; 

	constructor() {
		this.init();
	}

	private init(){
		this.mvView();
		this.onIndicator();
	}

	private mvView(){
		for (let i = 0; i < this.$mvLi.length; i++) {
			if(i === this.id-1){
				this.$mvLi.eq(i).addClass('active');
			}
		}
		if(this.$mvLi.length <=1 ) return;
		// this.mvMotionAdd();
		this.onTimer();
		this.changeIndicator();
	}

	private mvMotionAdd(){
		console.log('add');
		if(this.id === 1){
			// TweenMax.fromTo(this.$mvLi.eq(this.id-1),1,{alpha:0},{alpha:1});
			TweenMax.fromTo(this.$mvLi.eq(this.id-1).find('.mv-li__key--copy-01'),1,{alpha:0},{alpha:1,delay:1});
			TweenMax.fromTo(this.$mvLi.eq(this.id-1).find('.mv-li__key--logo'),1,{alpha:0},{alpha:1,delay:1.5,onComplete:this.onTimer.bind(this)});
		}
		if(this.id === 2){
			// TweenMax.fromTo(this.$mvLi.eq(this.id-1),1,{alpha:0},{alpha:1});
			TweenMax.fromTo(this.$mvLi.eq(this.id-1).find('#canvas'),1,{alpha:0},{alpha:1,ease: Power0.easeNone});
			TweenMax.fromTo(this.$mvLi.eq(this.id-1).find('.mv-li__product--copy-01'),1.5,{alpha:0,marginTop:'30px'},{alpha:1,marginTop:0,delay:1,ease: Power3.easeOut});
			TweenMax.fromTo(this.$mvLi.eq(this.id-1).find('.mv-li__product--copy-02'),1,{alpha:0},{alpha:1,delay:2,onComplete:this.onTimer.bind(this)});
		}
	}


	private onTimer(){
		let callTime = 4;
		// if(this.id === 1){
		// 	callTime = 4;
		// }
		this.delayedCallObj_1 = TweenMax.delayedCall(callTime, this.mvMotionRemove.bind(this));
	}

	private mvMotionRemove(){
		// TweenMax.to(this.$mvLi.eq(this.id-1),1,{alpha:0,onComplete:this.mvView.bind(this)});
		this.$mvLi.removeClass('active');
		this.delayedCallObj_2 = TweenMax.delayedCall(1, this.mvView.bind(this));
		this.id++;
		if(this.id > this.$mvTotal) this.id = 1;
	}

	private onIndicator(){
		if(this.$mvLi.length <= 1) return;
		let htmlIndicator = '<ul class="mv-Indicator">';
		for (let i = 0; i < this.$mvLi.length; i++) {
			if(i ===0 ){
				htmlIndicator += '<li class="mv-Indicator__li active"></li>'
			}else{
				htmlIndicator += '<li class="mv-Indicator__li"></li>'
			}
		}
		htmlIndicator += '<ul>';
		this.$mvBox.append(htmlIndicator)
		$('.mv-Indicator__li').on('click',(e)=>{
			e.preventDefault();
			const $btn = $(e.currentTarget);
			const id = Number($btn.index('.mv-Indicator__li'))+1;
			this.id = id;
			// console.log(this.delayedCallObj_1);
			// console.log(this.delayedCallObj_2);
			// console.log('id:',id);
			if(this.delayedCallObj_1) this.delayedCallObj_1.kill();
			if(this.delayedCallObj_2) this.delayedCallObj_2.kill();
			this.$mvLi.removeClass('active');
			this.mvView();
		})
	}

	private changeIndicator(){
		const $indicator = $('.mv-Indicator__li');
		$indicator.removeClass('active');
		$indicator.eq(this.id-1).addClass('active');
	}
}

export default MvMotion;
