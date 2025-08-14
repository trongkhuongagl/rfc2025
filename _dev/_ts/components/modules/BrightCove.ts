/* 
機能:目的の場所へスクロールする
 */
'use strict';

import $ from 'jquery';
// declare function videojs(str:string);
declare var videojs: any;
declare var bc: any;
export class BrightCove {
	private htmlCode = '';
	private $html = $('html');
	private $body = $('body');
	private myPlayer: any;

	private isVideoStart:boolean = false;
	private classvideoStop:string = 'is-video-stop';

	constructor() {
		$('.modal').on('click', this.onInit.bind(this));
		$('.modal-layer').on('click', this.onVideoPlay.bind(this));
	}

	public onInit(playId,coverImg) {
		this.htmlCode =
		`<div class="modal-video__cover hover-scale-c">
			<img class="modal-video__cover--img" src="${coverImg}">
		</div>
		<div class="modal-video">
		<video-js id="myPlayerID" data-account="6034685923001" data-player="default" data-embed="default" controls="" data-video-id="${playId}" data-playlist-id="" data-application-id="" class="vjs-fluid" playsinline></video-js>
		</div>`
		$('.modal-layer').append(this.htmlCode);
		this.playerStart();
	}

	private playerStart() {
		this.myPlayer = null;
		this.myPlayer = bc("myPlayerID");
		this.myPlayer.on("loadedmetadata", () => {
			// console.log('準備完了');
			// this.myPlayer.controls(false);
			this.onPlay();
			this.isVideoStart = true;
		});
		this.myPlayer.on('loadeddata', () => {
			// console.log('読み込み後の処理1');

		});

		//再生完了
		this.myPlayer.on('ended',  ()=> {
			// console.log('再生完了');
			this.isVideoStart = false;
			this.$html.addClass(this.classvideoStop);
		});
	}


	private onPlay() {
		this.myPlayer.play();
		this.$html.removeClass(this.classvideoStop);
	}

	private onVideoPlay(e:JQueryEventObject){
		e.preventDefault();
		if(!this.isVideoStart) this.onPlay();
		return false;
	}

	public onDispose(){
		this.myPlayer.dispose();
		this.$html.removeClass(this.classvideoStop);
	}
}

export default BrightCove;
