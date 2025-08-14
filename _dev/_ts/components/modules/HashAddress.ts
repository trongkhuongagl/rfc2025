/* 
機能:目的の場所へスクロールする
 */
'use strict';

import $ from 'jquery';
export class HashAddress {
	private $html_body = $('body,html');
	private headerHeight = $('.global-header').outerHeight();
	constructor() {
		this.$html_body.stop().scrollTop(0);
		this.init();
	}

	public init() {
		const urlHash = location.hash;
		if (urlHash) {
			setTimeout( ()=> {
				// this.$html_body.stop().scrollTop(0);
				const target = $(urlHash);
				const position = target.offset().top - this.headerHeight - 20;
				this.$html_body.stop().animate({ scrollTop: position }, 500);
			}, 100);
		}
	}


}

export default HashAddress;
