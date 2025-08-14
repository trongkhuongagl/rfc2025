'use strict';

import $ from 'jquery';
import Model from '../../global/Model';
import Config from '../../global/Config';
export class Map {

	private $contents = $('.about-ethiopia');
	private $text = $('.about-ethiopia__text');
	private $map = $('.img-map');
	private $area = $('.about-ethiopia__area');
	private $flower = $('.area-f');
	private $header = $('.global-header .navigation');
	private $block = $('.about-ethiopia__new');

	constructor() {
		$(window).on(Config.EVENT_MQ_CHANGE, this.onMQChange.bind(this));
		$(window).on('scroll', this.onView.bind(this));
		this.onMQChange();
	}

	private init() {
	}

	private onView() {
		const scNum = $(window).scrollTop();
		const textH = this.$text.height();
		if (Model.data.modelMq === 'SP') {
			const mapTop = scNum - this.$map.offset().top;
			const $mapArea = $('.about-ethiopia__map');
			const mapH = $mapArea.height();
			const mapHPer = mapH / 3;
			if(scNum > this.$text.offset().top - this.$header.height() + textH && scNum < this.$text.offset().top + this.$text.height()+$(window).height() - this.$area.height()){
				// console.log('in');
				this.$map.addClass('fix');
				this.$area.addClass('fix');
				this.$map.addClass('active');
				this.$area.removeClass('active');
				this.$map.addClass('hidden');
				this.$area.addClass('active');
				this.$flower.removeClass('active');
				// const mapAreaSP = scNum - $mapArea.offset().top + this.$header.height();
				const mapAreaSP = scNum - $mapArea.offset().top + this.$header.height();
				const mapAreaSPH = scNum - $mapArea.offset().top + this.$header.height()+$mapArea.height();

				if (scNum - $mapArea.offset().top >mapHPer) {
					this.$flower.addClass('active');
				}

			}else{
				// console.log('out');
				this.$map.removeClass('fix');
				// this.$area.removeClass('fix');
				this.$map.removeClass('hidden');
				this.$area.removeClass('active');
			}
		} else {
			const mapTop = scNum - this.$text.offset().top;
			const araH = this.$block.height() + this.$area.height();
			
			const textHPer = this.$text.height() / 3;
			const areaPos = this.$text.height() - mapTop;
			// console.log(araH, areaPos);
			if (scNum > this.$text.offset().top - this.$header.height() && scNum < this.$text.offset().top + this.$text.height()) {
				this.$map.addClass('fix');
				this.$area.addClass('fix');
				this.$map.addClass('active');
				this.$area.removeClass('active');
				if (areaPos < (textH - textHPer)) {
					// console.log('1/3');
					this.$map.addClass('hidden');
					this.$area.addClass('active');
					this.$flower.removeClass('active');
				}

				if (areaPos < (textH - textHPer * 2)) {
					// console.log('2/3');
					this.$flower.addClass('active');
				}
			} else {
				this.$map.removeClass('fix');
				// this.$area.removeClass('fix');
				this.$map.removeClass('hidden');
				this.$area.removeClass('active');
				// this.$map.css({'top':''});
			}
		}
	}

	private onMQChange() {
		if (Model.data.modelMq === 'SP') {

		} else {

		}
	}

	private onReset() {
	}
}

export default Map;
