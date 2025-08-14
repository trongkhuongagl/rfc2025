'use strict';

import $ from 'jquery';
import Model from '../../global/Model';
import Config from '../../global/Config';
import { TweenMax } from 'gsap';
export class Mv {;
	private $mvTitle = $('.mv-title');
	private $mvArea = $('.mv-box__area');
	private $mvArrow = $('.mv-arrow');
	private $motionBox = $('.mv-box__ph');
	private $li = this.$motionBox.find('li');
	private class_current = 'current';
	private class_next = 'next';
	private timerPcLeft:any = null;
	private timerPcRight:any = null;
	private timerSP:any = null;
	private countPcLeft:number = 1;
	private countPcRight:number = 2;
	private countSP:number = 1;

	constructor() {

		$(window).on(Config.EVENT_MQ_CHANGE,this.onMQChange.bind(this));
		this.onMQChange();
		TweenMax.fromTo(this.$mvTitle,0.5,{alpha:0,marginTop:30},{alpha:1,marginTop:0});
		TweenMax.fromTo(this.$mvArea,0.5,{alpha:0},{alpha:1});
		TweenMax.fromTo(this.$mvArrow,0.5,{alpha:0},{alpha:1});
	}

	private initPc(){
		this.$li.eq(0).addClass(this.class_next);
		this.$li.eq(1).addClass(this.class_next);
		this.onPCLeftSet();
	}

	private initSp(){
		this.$li.eq(0).addClass(this.class_next);
		this.onSPSet();
	}

	private onPCLeftSet(){
		this.timerPcLeft = setTimeout(this.onPCLeftCount.bind(this), 3000);
	}

	private onPCRightSet(){
		this.timerPcRight = setTimeout(this.onPCRightCount.bind(this), 500);
	}

	private onSPSet(){
		this.timerSP = setTimeout(this.onSpCount.bind(this), 3000);
	}

	private onPCLeftCount(){
		this.$li.removeClass(this.class_current);
		this.$li.eq(this.countPcLeft-1).removeClass(this.class_next).addClass(this.class_current);
		this.countPcLeft = this.countPcLeft+2;
		if(this.countPcLeft > this.$li.length) this.countPcLeft = 1;
		this.$li.eq(this.countPcLeft-1).removeClass(this.class_current).addClass(this.class_next);
		this.motion(this.$li.eq(this.countPcLeft-1));
		this.onPCLeftSet();
		this.onPCRightSet();
	}

	private onPCRightCount(){
		this.$li.eq(this.countPcRight-1).removeClass(this.class_next).addClass(this.class_current);
		this.countPcRight = this.countPcRight+2;
		if(this.countPcRight > this.$li.length) this.countPcRight = 2;
		this.$li.eq(this.countPcRight-1).removeClass(this.class_current).addClass(this.class_next);
		this.motion(this.$li.eq(this.countPcRight-1));
	}

	private onSpCount(){
		this.$li.removeClass(this.class_current);
		this.$li.eq(this.countSP-1).removeClass(this.class_next).addClass(this.class_current);
		this.countSP++;
		if(this.countSP > this.$li.length) this.countSP = 1;
		this.$li.eq(this.countSP-1).removeClass(this.class_current).addClass(this.class_next);
		this.motion(this.$li.eq(this.countSP-1));
		this.onSPSet();
	}

	private motion($obj){
		TweenMax.fromTo($obj,0.5,{alpha:0},{alpha:1});
	}


	private onMQChange(){
		if(Model.data.modelMq === 'SP'){
			if(this.timerPcLeft)clearTimeout(this.timerPcLeft);
			if(this.timerPcRight)clearTimeout(this.timerPcRight);
			this.onReset();
			this.initSp();
		}else{
			if(this.timerSP)clearTimeout(this.timerSP);
			this.onReset();
			this.initPc();

		}
	}

	private onReset(){
		this.$li.removeClass(this.class_current);
		this.$li.removeClass(this.class_next);
		this.countPcLeft = 1;
		this.countPcRight = 2;
		this.countSP = 1;
	}
}

export default Mv;
