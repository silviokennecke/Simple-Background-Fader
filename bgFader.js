/**
 * Author: Silvio Kennecke (development@silvio-kennecke.de)
 * License: MIT
 * Description: This javascript plugin allows you to simply add a background to your website which fades between your background images.
 */

var bgFader = function (imgList, autoPlay) {
	if (autoPlay == undefined) {
		autoPlay = true;
	}
	
	var current_img = 0;
	var active_img = 1;
	var play_slideshow = false;
	
	function slider() {
		if (play_slideshow !== true) {
			return;
		}
		
		var frame1 = document.getElementById('bgFader-1');
		var frame2 = document.getElementById('bgFader-2');
		
		if (active_img == 1) {
			frame1.style.backgroundImage = 'url(' + imgList[current_img] + ')';
		} else {
			frame2.style.backgroundImage = 'url(' + imgList[current_img] + ')';
		}
		
		if ((current_img+1) == imgList.length) {
			current_img = 0;
		} else {
			current_img++;
		}
		
		window.setTimeout(function () { slidemove(); },10);
	}
	function slidemove() {
		if (active_img == 0) {
			document.getElementById('bgFader-2').className = 'active';
			active_img = 1;
		} else {
			document.getElementById('bgFader-2').className = '';
			active_img = 0;
		}
		window.setTimeout(function () { slider(); },7000);
	}
	function pause () {
		play_slideshow = false;
	}
	function play () {
		play_slideshow = true;
		slider();
	}
	function status() {
		return play_slideshow;
	}
	
	var loadedListener = function () {};
	function loaded(callableFunction) {
		if (callableFunction != undefined && typeof(callableFunction) === 'function') {
			loadedListener = callableFunction;
		} else {
			errorListener = function() {};
		}
	}
	var errorListener = function () {};
	function error(callableFunction) {
		if (callableFunction != undefined && typeof(callableFunction) === 'function') {
			errorListener = callableFunction;
		} else {
			errorListener = function() {};
		}
	}
	
	var img_loaded = 0;
	var img_loader = Array();
	for (i=0; i<imgList.length; i++) {
		console.info('Adding new banner to loader: ' + imgList[i]);
		img_loader[i] = new Image();
		img_loader[i].onload = function () {
			console.info('Banner loaded... ' + this.src);
			
			img_loaded++;
			
			if (img_loaded == imgList.length) {
				console.info('All banners are loaded...');
				
				loadedListener();	
				
				if (autoPlay) {
					play();
				}
			}
		};
		img_loader[i].onerror = function () {
			console.error('Error loading banner: ' + this.src);
			
			errorListener();
		};
		img_loader[i].src = imgList[i];
	}
};
