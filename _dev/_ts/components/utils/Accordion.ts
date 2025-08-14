import { TweenMax, Quad, Quart, Power2, Power3, Elastic } from "gsap";

/**
 * [汎用アコーディオン]
 *
 * @export
 * @class Accordion
 */
export class Accordion {
	private root:JQuery;
	private btn:JQuery;;
	private container:JQuery;
	private inr:JQuery;
	private is_open:boolean = false;
	private class_open:string = 'open';

	constructor(root: any) {
		this.root = root;
		this.btn = this.root.find('.js-accordion-btn');
		this.container = this.root.find('.js-accordion-contents');
		this.inr = this.container.children();
		this.init();
	}

	private init():void {
		this.btn.on('click', ()=> this.open());
	}

	private open():void {
		if (this.is_open) {
			this.root.removeClass(this.class_open);
			TweenMax.to(this.container, 0.3, { height:0});
		} else {
			this.container.css({ opacity:0 });
			this.root.addClass(this.class_open);
			TweenMax.to(this.container, 0.5, { opacity:1, height:this.inr.outerHeight(true), onComplete:()=> { this.container.css({height:'auto'}) } });
		}
		this.is_open = !this.is_open;
	}

}

export default Accordion;
