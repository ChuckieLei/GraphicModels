import * as THREE from 'three';
import PerformanceUtils from './PerformanceUtils';

export default class WebGLUtils{
	isAndroid: boolean;
	isAndroidPhone: boolean;
	isAndroidTablet: boolean;
	isWindowsPhone: boolean;
	isWindowsTablet: boolean;
	isIOS: boolean;
	isIPhone: boolean;
	isIPad: boolean;
	isIPadPro: boolean;
	isTouch: boolean;
	isEdge: boolean;
	isIE: boolean;
	isIE11: boolean;
	isLegacyIE: boolean;
	isPhone: boolean;
	isTablet: boolean;
	isFirefox: boolean;
	isSafari: boolean;
	isOpera: boolean;
	isChrome: boolean;
	isDesktop: boolean;
	isDevice: boolean;
	isTwitter: boolean;
	isFacebook: boolean;
	isInstagram: boolean;
	isSnapchat: boolean;
	isWeChat: boolean;
	isAndroidWeChat: boolean;
	isIOSWeChat: boolean;
	isSocialApp: boolean;
	isRealPhone: boolean;
	isCookieEnabled: boolean;
	hasCanvas: boolean;
	hasWebGL: boolean;
	hasWebGL2: boolean;
	hasWorker: boolean;

	isMac: boolean;
	isWin: boolean;
	system: any;
	browser: any;

	useWebGL2: boolean;
	isNotSupported: boolean;
	WEBGL2_VERT_PREFIX: string;
	WEBGL2_FRAG_PREFIX: string;
	DEFAULT_VERT: string;
	DEFAULT_FRAG: string;

	CPU: any;
	GPU: any;

	constructor(){
		this.init();
		this.initSysAndBrower();
		this.initWebGL();
	}

	init(){
		var t = navigator.userAgent.toLowerCase()
              , e = void 0 != navigator.appVersion ? navigator.appVersion.toLowerCase() : ""
              , i = (void 0 != navigator.appName && navigator.appName.toLowerCase(),
            void 0 != navigator.vendor ? navigator.vendor.toLowerCase() : "")
              , r = void 0 != navigator.platform ? navigator.platform.toLowerCase() : "";
		this.isWindowsPhone = /windows phone|iemobile|wpdesktop/.test(t)
    this.isAndroidPhone = !this.isWindowsPhone && /android.*mobile/.test(t)
    this.isAndroidTablet = !this.isWindowsPhone && !this.isAndroidPhone && /android/i.test(t);
		this.isWindowsTablet = !this.isWindowsPhone && !this.isAndroidPhone && -1 != t.indexOf("windows") && -1 != t.indexOf("touch")
		this.isAndroid = this.isAndroidPhone || this.isAndroidTablet
		this.isIOS = !this.isWindowsPhone && /ip(hone|od|ad)/i.test(t);
		this.isIPad = !this.isWindowsPhone && /ipad/i.test(t) && this.isIOS;
		this.isIPadPro = this.isIPad && window.screen.width + window.screen.height > 2e3
		this.isTablet = this.isAndroidTablet || this.isIPad;
		this.isPhone = this.isAndroidPhone || this.isIOS && !this.isIPad || this.isWindowsPhone;
		this.isIPhone = this.isIOS && this.isPhone
		this.isTouch = this.isPhone || this.isTablet;
		this.isFirefox = t.indexOf("firefox") > -1
		this.isSafari = !!t.match(/version\/[\d\.]+.*safari/)
		this.isOpera = t.indexOf("opr") > -1
		this.isIE11 = t.indexOf("trident") > -1 && /v([\w\:\s*\d.]+)11/.test(t)
		this.isEdge = t.indexOf("edge") > -1
		this.isIE = e.indexOf("msie") > -1 || t.indexOf("trident") > -1 || this.isIE11 || this.isEdge;
		this.isLegacyIE = this.isIE && !this.isEdge && !this.isIE11;
		this.isChrome = t.indexOf("chrome") > -1 && /google inc/.test(i) && !this.isOpera && !this.isEdge;
		this.isTwitter = this.isPhone && /t.co/.test(document.referrer);
		this.isFacebook = this.isPhone && /fban|facebook|fbios|fbid/.test(t)
		this.isInstagram = this.isPhone && /instagram/.test(t)
		this.isSnapchat = this.isPhone && /snapchat/.test(t)
		this.isWeChat = this.isPhone && /micromessenger/.test(t)
		this.isAndroidWeChat = this.isAndroid && this.isWeChat;
		this.isIOSWeChat = this.isIOS && this.isWeChat;
		this.isSocialApp = this.isTwitter || this.isFacebook || this.isInstagram || this.isSnapchat || this.isWeChat;
		this.isRealPhone = this.isPhone && !/mac|win/.test(r)
		this.hasCanvas = !!window.CanvasRenderingContext2D
		this.hasWebGL = void 0;
		this.hasWebGL2 = void 0;
		this.hasCanvas ? (this.hasWebGL = function() {
                try {
                    var t = document.createElement("canvas");
                    return !(!window.WebGLRenderingContext || !t.getContext("webgl") && !t.getContext("experimental-webgl"))
                } catch (t) {
                    return !1
                }
            }(),
            this.hasWebGL2 = function() {
                try {
                    var t = document.createElement("canvas");
                    return !(!t.getContext("webgl2") && !t.getContext("experimental-webgl2"))
                } catch (t) {
                    return !1
                }
            }()) : (this.hasWebGL = !1,
            this.hasWebGL2 = !1);
		var V = !!navigator.cookieEnabled;
		void 0 !== navigator.cookieEnabled || V || (document.cookie = "testcookie",
		this.isCookieEnabled = -1 != document.cookie.indexOf("testcookie"));
		this.hasWorker = !!window.Worker;
	}
	initSysAndBrower(){
		var e = navigator.userAgent.toLowerCase();
		var n = void 0 != navigator.appVersion ? navigator.appVersion.toLowerCase() : "";
		var r = void 0, a = void 0, o = void 0, s = void 0, l = void 0, c = void 0;
					this.isOpera ? (l = e.indexOf("opr"),
					r = "Opera",
					a = e.substring(l + 4)) : this.isEdge ? (l = e.indexOf("edge"),
					r = "Edge",
					a = e.substring(l + 5)) : this.isIE && !this.isIE11 ? (l = e.indexOf("msie"),
					r = "IE",
					a = e.substring(l + 5)) : this.isIE11 ? (r = "IE11",
					a = e.substring(e.indexOf("rv:") + 3)) : this.isChrome ? (l = e.indexOf("chrome"),
					r = "Chrome",
					a = e.substring(l + 7)) : this.isSafari ? (l = e.indexOf("safari"),
					r = "Safari",
					a = e.substring(l + 7),
					-1 != (l = e.indexOf("version")) && (a = e.substring(l + 8))) : this.isFirefox ? (l = e.indexOf("firefox"),
					r = "Firefox",
					a = e.substring(l + 8)) : (r = "Unknown",
					a = "Unknown"),
					-1 != (c = a.indexOf(";")) && (a = a.substring(0, c)),
					-1 != (c = a.indexOf(" ")) && (a = a.substring(0, c)),
					-1 != (c = a.indexOf(")")) && (a = a.substring(0, c)),
					/windows/.test(e) && !this.isPhone ? (o = "Win",
					l = /nt ([\.\_\d]+)/.exec(e),
					s = l ? l[1] : "Unknown") : /mac os/.test(e) && this.isDesktop ? (o = "Mac",
					l = /mac os x (10[\.\_\d]+)/.exec(e),
					s = l ? l[1] : "Unknown") : /android/.test(e) ? (o = "Android",
					l = /android ([\.\_\d]+)/.exec(e),
					s = l ? l[1] : "Unknown") : /(iphone|ipad|ipod)/.test(e) ? (o = "iOS",
					l = /os (\d+)_(\d+)_?(\d+)?/.exec(n),
					s = l ? l[1] + "." + l[2] + "." + (0 | l[3]) : "Unknown") : /(linux|x11)/.test(e) ? (o = "Linux|Unix",
					s = "Unknown") : (o = "Unknown",
					s = "Unknown"),
					s = s.replace(/_/gi, "."),
					this.isMac = "Mac" == o;
					this.isWin = "Win" == o;
					this.system = {
							name: o,
							version: s
					};
					this.browser = {
							name: r,
							version: a
					};
					this.isDesktop = !this.isPhone && !this.isTablet;
	}
	initWebGL(){
		this.CPU = PerformanceUtils.benchmarkCPU(this);
		this.GPU = PerformanceUtils.benchmarkGPU(this);

		var p = "#version 300 es\n\t#define attribute in\n\t#define varying out\n\t#define texture2D texture\n\t#define WEBGL2\n";
		var m = "#version 300 es\n\t#define varying in\n\tout highp vec4 pc_fragColor;\n\t#define gl_FragColor pc_fragColor\n\t#define gl_FragDepthEXT gl_FragDepth\n\t#define texture2D texture\n\t#define textureCube texture\n\t#define texture2DProj textureProj\n\t#define texture2DLodEXT textureLod\n\t#define texture2DProjLodEXT textureProjLod\n\t#define textureCubeLodEXT textureLod\n\t#define texture2DGradEXT textureGrad\n\t#define texture2DProjGradEXT textureProjGrad\n\t#define textureCubeGradEXT textureGrad\n\t#define WEBGL2\n"
    var v = "precision highp float; precision highp int;";

		this.WEBGL2_VERT_PREFIX = p;
		this.WEBGL2_FRAG_PREFIX = m;
		this.DEFAULT_VERT = "\n\t<precision>\n\tattribute vec3 position;\n\tattribute vec2 uv;\n\tuniform mat4 modelViewMatrix;\n\tuniform mat4 projectionMatrix;\n\tvarying vec2 vUv;\n\tvoid main() {\n\t\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\t\tgl_Position = projectionMatrix * mvPosition;\n\t\tvUv = uv;\n\t}\n";
		this.DEFAULT_FRAG = "\n\t<precision>\n\tvarying vec2 vUv;\n\tvoid main() {\n\t\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n\t}\n";

		var name = this.system.name;
		var version = this.system.version;
		this.isNotSupported = this.isIE && !this.isEdge || !this.hasWebGL || this.isWindowsPhone || this.isAndroidTablet ||
		"android" == name && parseFloat(version) < 6.9 || "ios" == name && parseFloat(version) < 10.3;
	}

	public benchmark(){
		for (var e = 0, n = (window.performance || Date).now(), i = 0; i < 1; i++){
			Math.pow(Math.sin(Math.random()), 2);
		}
		var r = (window.performance || Date).now() - n;
		e = this.isIE ? 0 : r < 7 ? 3 : r < 14 ? 2 : r < 22 ? 1 : 0;
		return {
				perf: 3,
				type: "PERF_HIGH",
				timeElapsed: r
		}
	}

	animationCheck(){
		return !(this.isNotSupported || !this.isDesktop || this.GPU.tier < 1 || this.GPU.rank > 100)
	}
}
