/* 
機能:目的の場所へスクロールする
 */
'use strict';

import $ from 'jquery';

export class SnsShare {
	private href = location.href; //1.URLを取得しエンコードする
	private getTitle = $('title').html(); //2.ページのタイトルを取得

	//3.URLを取得しエンコードする
	// private snsUrl = encodeURIComponent('https://www.kose.co.jp/infinity/');
	private snsUrl = encodeURIComponent(this.href);
	private snsTitle = encodeURIComponent(this.getTitle);

	constructor() {

		$('.sns__item__anchor').each((index, element) => {

			var sns_obj = $(element).attr('data-sns');　 //4.ID名を取得
			var snsCase = sns_obj;
			//5.IDを判定してリンク先を出力する
			switch (snsCase) {
				case 'sns_line':
					$(element).attr('href', 'http://line.me/R/msg/text/?' + this.snsTitle + '%20' + this.snsUrl);
					break;

				case 'sns_fb':
					$(element).attr('href', 'http://www.facebook.com/sharer.php?u=' + this.snsUrl);
					break;

				case 'sns_tw':
					$(element).attr('href', 'http://twitter.com/share?text=' + this.snsTitle + '&url=' + this.snsUrl);
					break;

				case 'sns_plus':
					$(element).attr('href', 'https://plus.google.com/share?url=' + this.snsUrl);
					break;
			}

			$(element).on('click', (e) => {
				const href = $(e.currentTarget).attr('href');
				window.open(
					href,
					'facewindow',
					'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'
				);
				return false;
			});

		});
	}

}

export default SnsShare;
