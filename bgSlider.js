/**
 * Author: Silvio Kennecke (development@silvio-kennecke.de)
 * License: MIT
 * Description: This Javascript plugin allows you to simply add a background to your website which fades between your background images.
 */

var bgSlider = function (diebilder, autoPlay) {
	if (autoPlay == undefined) {
		autoPlay = true;
	}
	
	var current_pic = 0;
	var active_pic = 1;
	var play_slideshow = false;
	
	function slider() {
		if (play_slideshow !== true) {
			return;
		}
		
		var rahmen1 = document.getElementById('bg-slider-1');
		var rahmen2 = document.getElementById('bg-slider-2');
		
		if (active_pic == 1) {
			rahmen1.style.backgroundImage = 'url(' + diebilder[current_pic] + ')';
		} else {
			rahmen2.style.backgroundImage = 'url(' + diebilder[current_pic] + ')';
		}
		
		if ((current_pic+1) == diebilder.length) {
			current_pic = 0;
		} else {
			current_pic++;
		}
		
		window.setTimeout(function () { slidemove(); },3500);
	}
	function slidemove() {
		if (active_pic == 0) {
			document.getElementById('bg-slider-2').className = 'active';
			active_pic = 1;
		} else {
			document.getElementById('bg-slider-2').className = '';
			active_pic = 0;
		}
		window.setTimeout(function () { slider(); },3500);
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
		loadedListener = callableFunction;
	}
	var errorListener = function () {};
	function error(callableFunction) {
		errorListener = callableFunction;
	}
	
	var bilder_loaded = 0;
	var bilder_loader = Array();
	for (i=0; i<diebilder.length; i++) {
		console.info('Adding new banner to loader: ' + diebilder[i]);
		bilder_loader[i] = new Image();
		bilder_loader[i].onload = function () {
			console.info('Banner loaded... ' + this.src);
			
			bilder_loaded++;
			
			if (bilder_loaded == diebilder.length) {
				console.info('All banners are loaded...');
				
				if (loadedListener != undefined && typeof(loadedListener) === 'function') {
					loadedListener();
				}	
				
				if (autoPlay) {
					play();
				}
			}
		};
		bilder_loader[i].onerror = function () {
			console.error('Error loading banner: ' + this.src);
			
			if (errorListener != undefined && typeof(errorListener) === 'function') {
				errorListener();
			}
		};
		bilder_loader[i].src = diebilder[i];
	}
};
