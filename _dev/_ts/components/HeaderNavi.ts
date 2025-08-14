export class HeaderNavi {
	private $body = $('body');
	private classHeaderChange: string = 'header-change';
	constructor() {
		this.init();
	}

	public init() {
		$(window).on('scroll', this.naviScroll.bind(this));
		this.naviScroll();
	}


	private naviScroll() {
		const sclollNum = $(window).scrollTop();

		if (this.$body.hasClass('cat-home')) {
			if (sclollNum > 0) {
				this.$body.addClass(this.classHeaderChange);
			} else {
				this.$body.removeClass(this.classHeaderChange);
			}
		}
	}
}

export default HeaderNavi;
