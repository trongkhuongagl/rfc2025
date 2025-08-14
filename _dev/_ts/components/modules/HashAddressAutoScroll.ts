/* 
機能:目的の場所へスクロールする
 */
'use strict';

import $ from 'jquery';
export class HashAddressAutoScroll {
	private $html_body = $('body,html');
	private headerHeight = $('.global-header').outerHeight();
	constructor() {
		// this.init();
	}

	public onHashScroll() {
		const urlHash = location.hash;
		if (urlHash) {
			const target = $(urlHash);
			const position = target.offset().top - this.headerHeight - 20;
			this.$html_body.stop().animate({ scrollTop: position }, 500);
		}
	}


}

export default HashAddressAutoScroll;
