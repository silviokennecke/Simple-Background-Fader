#SimpleBackgroundFader
This javascript plugin allows you to simply add a background to your website which fades between your background images.


##Usage
Please add this in your head tag and adjust the file path:
```html
<link rel="stylesheet" type="text/css" href="bgSlider.css" />
<script src="bgSlider.js"></script>
```

Please add this as first child of your body tag and adjust the filepath of the background images:
```html
<div id="bg-slider">
	<div id="bgSlider-1" style="" class=""></div>
	<div id="bgSlider-2" style="" class=""></div>
</div>
<script>
    var slider = bgSlider(new Array('background_1.jpg','background_2.jpg','background_3.jpg'));
</script>
```

##Options
To keep it simple there is only one option: With setting the second parameter to false, the slideshow won't start, when all images are loaded.

##Pause and Play
Your can easily pause the slideshow by running
```javascript
slider.pause();
```
If you want to begin or continue with the slideshow, simply run
```javascript
slider.play();
```
To get the current status of the slideshow run
``` javascript
if (slider.status()) {
    // The slider is playing
} else {
    // The slider is paused
}
```

##Event listeners
There are two event listeners available.
Currently you can only register one eventlistener.
```javascript
slider.error(function () {
    // This code will be executed if a error occurs while loading the images.
});

slider.loaded(function () {
    // This code will be executed when all images are successfully loaded.
});
```

##Modifying the source code
Please feel free to modify the source code to fit to your needs.
