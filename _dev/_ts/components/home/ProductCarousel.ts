
'use strict';

import $ from 'jquery';
import { TweenMax, Power0, Power3 } from 'gsap';
import 'slick-carousel';
import 'jquery-match-height';
import Model from '../../global/Model';
import Config from '../../global/Config';
// declare var Curtains:any;

export class ProductCarousel {
	private $html = $('html');
	private $body = $('body');
	private $carouselUL =$('.top-carousel__ul');
	private $carouselLI =$('.top-carousel__li');
	private slickObj: any;
	private slickList: any = [];
	private slideId: number = 0;
	
	constructor() {
		this.init();
		
	}

	private init() {
		this.$carouselUL.addClass('active');
		$(window).on(Config.EVENT_MQ_CHANGE,this.onMQChange.bind(this));
		this.onMQChange();
	}

	private onMQChange(){
		if(this.slickObj){
			this.slickObj.slick('unslick');
		}
		if(Model.data.modelMq === 'SP'){
			this.onSlickInitSP(this.$carouselUL);
		}else{
			if(this.$carouselLI.length <=4){
				$('.top-carousel__arrow--left').hide();
				$('.top-carousel__arrow--right').hide();
			} ;
			this.onSlickInitPC(this.$carouselUL);

		}
	}

	private onSlickInitPC($target) {
		const $targetUl = $target;
		$targetUl.on('init', (event, slick)=>{
			// console.log('初期化');
			
			// $('.top-carousel__li').matchHeight();
			// $('.top-carousel__col').matchHeight();
		});
		this.slickObj = $targetUl.slick({
			dots: false,
			arrows: false,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 1
		})
		$('.top-carousel__arrow--left').on('click', () => {
			$targetUl.slick('slickPrev');
		});
		$('.top-carousel__arrow--right').on('click', () => {
			$targetUl.slick('slickNext');
		});
	}

	private onSlickInitSP($target) {
		const $targetUl = $target;
		$targetUl.on('init', (event, slick)=>{
			// $('.top-carousel__col').matchHeight();
		});
		this.slickObj = $targetUl.slick({
			dots: false,
			arrows: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerPadding: '19%',
			centerMode: true,
		})
		$('.top-carousel__arrow--left').on('click', () => {
			$targetUl.slick('slickPrev');
		});
		$('.top-carousel__arrow--right').on('click', () => {
			$targetUl.slick('slickNext');
		});
	}

}

export default ProductCarousel;
