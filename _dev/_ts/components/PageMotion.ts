

//------------------------------------------
// 
//
//------------------------------------------
import { TweenMax, Elastic,Back,Power3 } from 'gsap';
export class PageMotion {
	private $window = $(window);
	private $motionBox = $('.motion-box');
	private classActive: string = 'active';
	private classComplete: string = 'motion-complete';
	constructor() {
		this.init();
	}

	//----------------------------------------------------
	//
	//----------------------------------------------------
	private init(): void {
		
		this.$window.on('resize', this.onScroll.bind(this));
		this.$window.on('scroll', this.onScroll.bind(this));
		this.onScroll();
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


	private motionStart(target:JQuery) {
		const mode = target.data('mode');
		const option = target.data('option');
		TweenMax.fromTo(target,1,{alpha:0},{alpha:1});
		if (mode === 'plate') {
			/* const text = target.find('.sec-01__text');
			const ill = target.find('.sec-01__ill');
			TweenMax.fromTo(text,0.5,{alpha:0,top:'+=50px'},{alpha:1,top:0,delay:0.5,ease: Back.easeOut});
			TweenMax.fromTo(ill,0.5,{alpha:0,left:'-=5%'},{alpha:1,left:0,delay:0.8}); */
		} else if(mode === 'up') {
			const motionTarget = target.find('.motion-target');
			for (let i = 0; i < motionTarget.length; i++) {
				// TweenMax.fromTo(motionTarget.eq(i),1,{alpha:0,top:'+=50px'},{alpha:1,top:0,delay:0.3*i,ease: Power3.easeOut});
				TweenMax.fromTo(motionTarget.eq(i),1,{alpha:0},{alpha:1});
			}
		}else if(mode === 'fade'){
			const motionTarget = target.find('.motion-target');
			for (let i = 0; i < motionTarget.length; i++) {
				TweenMax.fromTo(motionTarget.eq(i),1,{alpha:0},{alpha:1,delay:(0.3*i)+Number(option)});
			}
		}
	}
}


export default PageMotion;