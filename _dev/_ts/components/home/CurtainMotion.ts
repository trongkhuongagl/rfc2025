/* 
機能:目的の場所へスクロールする
 */
'use strict';

import $ from 'jquery';
import {Curtains} from 'curtainsjs';
import Config from '../../global/Config';

// declare var Curtains:any;

export class CurtainMotion {
	private $html = $('html');
	private $body = $('body');
	private id = '';
	private webGLCurtain:any;
	private duration:number = 0;
	private timer:number = 0;
	private mouseDelta:number = 0;
	private planeElements = document.getElementsByClassName("curtain");
	private pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1.0;
	private simplePlane:any;
	private params = {
		widthSegments: 20,
		heightSegments: 20,
		uniforms: {
			resolution: { // resolution of our plane
				name: "uResolution",
				type: "2f", // notice this is an length 2 array of floats
				// value: [pixelRatio *4, pixelRatio *3],
				value: [this.pixelRatio * 4, this.pixelRatio * 3],
			},
			time: { // time uniform that will be updated at each draw call
				name: "uTime",
				type: "1f",
				value: 1,
			},
			mousePosition: { // our mouse position
				name: "uMousePosition",
				type: "2f", // again an array of floats
				value: [10, 10],//memo:ここの値をいじるとうねり方が変化する
			},
			mouseMoveStrength: { // the mouse move strength
				name: "uMouseMoveStrength",
				type: "1f",
				value: [100, 100],
			},
		}
	}
	constructor(id:string) {
		this.id = id;
		this.webGLCurtain = new Curtains(this.id);
		this.onCanvasResize();
		this.simplePlane = this.webGLCurtain.addPlane(this.planeElements[0], this.params);
		// $(window).on(Config.EVENT_MQ_CHANGE,this.onCanvasResize);
		
		this.setUp();
		$(window).on('scroll',this.onCanvasResize.bind(this));
		$(window).on('resize', this.onCanvasResize.bind(this));
	}
	
	public start(){
		this.onCanvasResize();
		this.webGLCurtain.enableDrawing();
		this.duration = 0.8;
		this.timer = 0;
		
	}

	private setUp(){
		this.simplePlane && this.simplePlane.onReady( ()=> {
			$('#'+this.id).find('canvas').attr('id', 'canvasBox');
			this.onCanvasResize();
			const canvas:any = document.getElementById("canvasBox");
			const gl = canvas.getContext("webgl");
			// gl.clearColor(0,0,0,0);
		}).onRender( () => {
			this.onCanvasResize();
			this.simplePlane.uniforms.time.value++;
			this.simplePlane.uniforms.mouseMoveStrength.value = this.mouseDelta;
			this.duration = this.duration - 0.01;
			this.mouseDelta = this.duration;
			this.timeOut();
		})
	}

	private timeOut() {
		if (this.duration < 0) {
			this.mouseDelta = 0;
			this.webGLCurtain.disableDrawing();
			// console.log(this.simplePlane);
		} else {
			this.timer++;
		}
	}

	/* private onResize(e:JQueryEventObject){
		this.onCanvasResize();
	} */

	private onCanvasResize(){
		$('.curtain').height($('.mv-ul').height());
		this.webGLCurtain.resize();
	}

}

export default CurtainMotion;
