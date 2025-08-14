/*
メインビジュアル
 */
'use strict';

import 'slick-carousel';

export class CarouselLinup {
	private id:any;
	private $carouselMain:any;
	private $carouselPrev:any;
	private $carouselNext:any;
	private $root:any;
	private tween:any;
	private isLoop: boolean = true;
	private num:number = 0;
	constructor($carousel: JQuery,id:number=0, isLoop:boolean = true) {
		this.isLoop = isLoop;
		this.$root = $carousel;
		this.num = id;
		this.$carouselMain = $carousel.find('.carousel-main');
		this.$carouselPrev = $carousel.closest('.carousel-lineup').find('.carousel-ui__prev')
		this.$carouselNext = $carousel.closest('.carousel-lineup').find('.carousel-ui__next')
		this.$carouselMain.on('init', function (event, slick) {
		}).slick({
			initialSlide: this.num,
			slidesToShow: 1,
			arrows: false,
			dots: false,
			autoplay: false
		}).on('beforeChange',  (event, slick, currentSlide, nextSlide) =>{
		}).on('afterChange',  (event, slick, currentSlide)=> {
		});

		this.$carouselPrev.on('click', this.onPrev.bind(this));
		this.$carouselNext.on('click', this.onNext.bind(this));
	}

	private onPrev() {
		this.$carouselMain.slick('slickPrev');
	}

	private onNext() {
		this.$carouselMain.slick('slickNext');
	}

	public onReset(){
		this.$carouselMain.slick('unslick');
	}
}

export default CarouselLinup;
