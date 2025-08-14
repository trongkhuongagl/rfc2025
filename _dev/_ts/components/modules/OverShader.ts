/* 
機能:目的の場所へスクロールする
 */
'use strict';

import $ from 'jquery';
import THREE = require("three");
import { TweenMax, Power3 } from 'gsap';
export class OverShader {
	// シェーダーの作成
	private vertexSrc = `
		precision mediump float;
		attribute vec4 position;
		attribute vec2 uv;
		varying vec2 vUv;
		void main() {
			gl_Position = position;
			vUv = vec2( (position.x + 1.)/2., (-position.y + 1.)/2.);
		}
	`;

	private fragmentSrc = `
			precision mediump float;
			uniform float uTrans;
			uniform sampler2D uTexture0;
			uniform sampler2D uTexture1;
			uniform sampler2D uDisp;
			varying vec2 vUv;
			float quarticInOut(float t) {
			return t < 0.5
				? +8.0 * pow(t, 4.0)
				: -8.0 * pow(t - 1.0, 4.0) + 1.0;
			}
			void main() {
				
				//vec4 disp = texture2D(uDisp, vec2(0., 0.5) + (vUv - vec2(0., 0.5)) * (0.2 + 0.8 * (1.0 - uTrans)) );
				vec4 disp = texture2D(uDisp, vec2(0.5, 0.5) + (vUv - vec2(0.5, 0.5)) * (0.2 + 0.8 * (1.0 - uTrans)) );
				float trans = clamp(1.6  * uTrans - disp.r * 0.4 - vUv.x * 0.2, 0.0, 1.0);
				trans = quarticInOut(trans);
				//vec4 color0 = texture2D(uTexture0, vec2(0.5 - 0.3 * trans, 0.5) + (vUv - vec2(0.5)) * (1.0 - 0.2 * trans));
				vec4 color0 = texture2D(uTexture0, vec2(0.5, 0.5 - 0.3 * trans) + (vUv - vec2(0.5,0.5)) * (1.0 - 0.2 * trans));
				vec4 color1 = texture2D(uTexture1, vec2(0.5 + sin( (1. - trans) * 0.1), 0.5 ) + (vUv - vec2(0.5)) * (0.9 + 0.1 * trans));
				gl_FragColor = mix(color0, color1 , trans);
			}
		`;
	// デモに使用する画像URL
	private assetUrls = [
		'',
		'',
		''];
	private target:JQuery;
	constructor(target:JQuery) {
		this.target = target;
		this.assetUrls[0] = this.target.attr('data-basic') as string;
		this.assetUrls[1] = this.target.attr('data-over') as string;
		this.assetUrls[2] = this.target.attr('data-distortion') as string;
		// レンダラーの初期化
		let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		
		let canvas = renderer.domElement;
		// document.body.appendChild(canvas);
		this.target.append(canvas);

		let scene = new THREE.Scene();

		let obj = { trans: 0 };
		var cnt = 0;

		let textureArr: any = [];

		// カメラの初期化
		let camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000);
		camera.position.z = 1;

		// テクスチャの初期化
		this.assetUrls.forEach((url, index) => {
			let img = new Image();

			let texture = new THREE.Texture();
			texture.flipY = false;
			textureArr.push(texture);
			texture.minFilter = THREE.LinearFilter
			img.onload = function (_index, _img) {
				let texture = textureArr[_index];
				texture.image = _img;
				texture.needsUpdate = true;

				cnt++;
				if (cnt == 3) start();
			}.bind(this, index, img);

			// img.crossOrigin = "Anonymous";
			img.src = url;
		});

		let mat = new THREE.RawShaderMaterial({
			uniforms: {
				uTrans: { value: obj.trans },
				uTexture0: { value: textureArr[0] },
				uTexture1: { value: textureArr[1] },
				uDisp: { value: textureArr[2] }
			},

			vertexShader: this.vertexSrc,
			fragmentShader: this.fragmentSrc
		});


		let geo = new THREE.PlaneGeometry(2, 2);
		let mesh = new THREE.Mesh(geo, mat);
		scene.add(mesh);

		resize(this);

		function start() {
			loop();
		}

		function loop() {
			mat.uniforms.uTrans.value = obj.trans;
			renderer.render(scene, camera);

			requestAnimationFrame(loop);
		}

		function resize(scope) {
			let size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
			// if (size > 450) size = 450;
			// if (size > 450) size = 450;
			const sizeW = Math.floor(scope.target.find('a').width());
			const sizeH = Math.floor(scope.target.find('a').height());
			renderer.setSize(sizeW, sizeH);
		}

		$(window).on("resize",  ()=> {
			resize(this);
		});

		this.target.on({
			"mouseenter":  ()=> {
				TweenMax.killTweensOf(obj);
				TweenMax.to(obj, 1.5, { trans: 1 });
			},
			"mouseleave": ()=> {
				TweenMax.killTweensOf(obj);
				TweenMax.to(obj, 1.5, { trans: 0 });
			}
		});
		/* canvas.addEventListener('mouseenter', function () {
			TweenMax.killTweensOf(obj);
			TweenMax.to(obj, 1.5, { trans: 1 });
		});

		canvas.addEventListener('mouseleave', function () {
			TweenMax.killTweensOf(obj);
			TweenMax.to(obj, 1.5, { trans: 0 });
		}); */
	}

}

export default OverShader;
