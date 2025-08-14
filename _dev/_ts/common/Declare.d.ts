

import $ from 'jquery';

declare  var gtag:any;

declare global {
	interface Window {
		console?: () => void;
	}
}

declare  global {
	interface JQuery {
		offset(): { top : number; left : number; };
		width():number;
		height():number;
		outerWidth():number;
		outerHeight():number;
		scrollTop():number;
	}
}

