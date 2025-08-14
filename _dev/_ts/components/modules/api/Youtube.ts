/*
 *OS・ブラウザ判定
 */
'use strict';

import $ from 'jquery';
declare global {
	interface Window {
		onYouTubeIframeAPIReady?: () => void;
	}
}
export class YoutubeVideo {
	private playerList: any = [];

	constructor() {
		const tag = document.createElement('script');
		tag.src = '//www.youtube.com/iframe_api';
		const firstScriptTag: any = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		window.onYouTubeIframeAPIReady = () => {
			// console.log(this);
			$(this).trigger('YOUTUBE_API_READY_OK');
		};
	}

	public videoSet(playerId: string, id: string, playerVarsObj: any) {
		const yt: any = new YT.Player(playerId, {
			videoId: id,
			playerVars: playerVarsObj,
			events: {
				onReady: this.onPlayerReady.bind(this),
				onStateChange: this.onPlayerStateChange.bind(this),
			},
		});

		this.playerList.push(yt);
	}

	private onPlayerReady(e): void {
		// e.target.mute();
		// e.target.playVideo();
	}

	private onPlayerStateChange(e): void {
		const currentId: string = e.target.getIframe().id;
		if (e.data == YT.PlayerState.PLAYING) {
			this.playerOtherStop(currentId);
		}
	}

	private playerOtherStop(currentId: string): void {
		for (let i = 0; i < this.playerList.length; i++) {
			// console.log($(this.playerList[i].getIframe()).attr('id'));
			const listId = $(this.playerList[i].getIframe()).attr('id');
			if (currentId != listId) {
				// this.playerList[i].stopVideo();
				this.playerList[i].pauseVideo();
			}
		}
	}
}

export default YoutubeVideo;
