# PlusSlider jQuery Plugin

A jQuery content slider that is easily configurable and can easily be switched between 'fading' and 'sliding'

## Features
* Slides are _HTML_ (_Can be images or text_)
* Easily swap between **fading** &amp; *sliding*
* _Infinite Slide_ support
* Multiple PlusSliders per page
* Fixed width or 100% width support
* Slides can be different width and or height
* API for developers
* Very _simple_ &amp; _valid markup_
* AutoPlay (_Optional_)
* **Next/Previous** Navigation (_Optional_)
* Titled or numbered **paginated** navigation (_Optional_)
* Callback available after each slide
* Tested on *IE 6+* and *modern browsers*

## Default Options
	$('#slider').plusSlider({
		
		/* General */
		sliderType          : 'slider', // Choose whether the carousel is a 'slider' or a 'fader'
		infiniteSlide       : true, // Gives the effect that the slider doesn't ever "repeat" and just continues forever
		disableLoop         : false, // Disables prev or next buttons if they are on the first or last slider respectively. 'first' only disables the previous button, 'last' disables the next and 'both' disables both
		fullWidth           : false, // sets the width of the slider to 100% of the parent container
		width               : null, // Set the width of the slider
		height              : null, // Set the height of the slider
		
		/* Display related */
		defaultSlide        : 0, // Sets the default starting slide - Number based on item index
		displayTime         : 4000, // The amount of time the slide waits before automatically moving on to the next one. This requires 'autoPlay: true'
		sliderEasing        : 'linear', // Anything other than 'linear' and 'swing' requires the easing plugin
		speed               : 500, // The amount of time it takes for a slide to fade into another slide

		/* Functioanlity related */
		autoPlay            : true, // Creats a times, looped 'slide-show'
		keyboardNavigation  : true, // The keyboard's directional left and right arrows function as next and previous buttons
		pauseOnHover        : true, // AutoPlay does not continue ifsomeone hovers over Plus Slider.

		/* Arrow related */
		createArrows        : true, // Creates forward and backward navigation
		arrowsPosition      : 'prepend', //Where to insert arrows in relation to the slider ('before', 'prepend', 'append', or 'after')
		nextText            : 'Next', // Adds text to the 'next' trigger
		prevText            : 'Previous', // Adds text to the 'prev' trigger

		/* Pagination related */
		createPagination    : true, // Creates Numbered pagination
		paginationPosition  : 'append', // Where to insert pagination in relation to the slider element ('before', 'prepend', 'append', or 'after')
		paginationWidth     : false, // Automatically gives the pagination a dynamic width
		paginationTitle     : false, // Checks for attribute 'data-title' on each slide and names the pagination accordingly

		/* Callbacks */
		onInit              : null, // Callback function: On slider initialize
		onSlide             : null, // Callback function: As the slide starts to animate
		afterSlide          : null, // Callback function: As the slide completes the animation
		onSlideEnd          : null // Callback function: Once the slider reaches the last slide

	});

## Using the API
The following are the PlusSlider values you may use within the callback functions. Property names beginning with $ ( dollar sign ) are referencing a jQuery object, methods are referenced by ending in () ( open parenthasis, close parenthasis ) and the rest contain a number value.

	base.$wrap                    // References the .plusslider jQuery object
	base.$slides                  // References all slide jQuery slide objects
	base.$slideCloneFirst;        // First slide cloned element needed for infinite slide
	base.$slideCloneLast;         // Last slide cloned element needed for infinite slide
	base.$wrapContainer           // References the jQuery object of .plusSlider's container - This object isn't part of PlusSlider
	base.slideCount               // A numerical value of the amount of slides
	base.slideIndexCount          // The index value of the amount of slides
	base.animating                // Boolean - true means the slider is busy animating.
	base.wrapContainerWidth       // A numerical value of the width of base.$wrapContainer
	base.wrapContainerHeight      // A numerical value of the height of base.$wrapContainer
	base.currentSlideIndex        // References the index number of the current slide
	base.sliderWidth              // Stores the slider width value. This changes on resize if fullWidth is enableds
	base.$currentSlide            // References the current/active slide's jQuery object
	base.currentSlideWidth        // References a numerical value of the width of the current/active slide
	base.currentSlideHeight       // References a numerical value of the height of the current/active slide
	base.beginTimer()             // Method that begins the autoPlay timer
	base.clearTimer()             // Method that resets the autoPlay timer
	base.toSlide()                // Method that will change the current/active slide - Accepts 'next', 'prev' or an index number value

### Accessing properties and methods from outside the callback functions
If you wish to make use of the slider methods and properties outside of the callback functions, you would need to initialize the slider in a slightly different way:

	var slider = null;
	
	$(document).ready(function(){
		slider = new $.plusSlider($('#slider'), {});
	});
	slider.toSlide('next); //move slider to next slide
	slider.toSlide('prev'); //move slider to previous slide
	slider.toSlide(3); //move slider to arbitrary index (first slide is 0, second is 1, etc.)


## Customizing PlusSlider

The default example is a great demonstration of what you can do with PlusSlider, but you probably want to customize the slider to match your site's design.
To see the bare minimum of styles that are required for a functioning slider, look at the "minimal.html" and "minimal.css" example files. These have all but the most essential styles stripped away so you can easily identify what is and isn't needed for your own custom slider design.

Some things to note about widths and heights:

* A set slider width and height effect can be achieved by giving each slide the same width and height. If they vary, the slider will accomodate the different slide width and height. Since each slide is given a `.child` class, a set width and height on that class would force a static sized PlusSlider.
* When using the "fader" effect ( sliderType:'fader' ), setting the width/height via javascript options will do some resizing/clipping of images and content (which can be helpful if you have variably-sized content from a CMS, for example).
* When using the "slider" effect, the slider width/height will adjust depending on the width/height of the slide. A static width/height can be achieved by setting the width/height CSS properties of `.child`.
* When using the "fader" effect ( sliderType:'fader' ) with non-image content, you will want some kind of background (either a non-transparent background-image or a solid background-color) otherwise the effect will not be smooth.

## Changelog

### Version 1.4.6
* New option added: `inifiniteScroll`
* Fixed infiniteScroll to work with option `fullWidth`
* Did some minor css adjustments

### Version 1.4.5
* Fixed various `fullWidth` bugs
* Streamlined the script slightly more
* Removed beforeSlide callback function - unnecessary
* renamed `onStart` and `onEnd` callback functions to `onInit` and `onSlideEnd` respectively

### Version 1.4.2
* Added a 100% width support option, `fullWidth`
* Added a basic API to use within the callback functions
* Added extra callback options
* Converted all global plugin variables and functions into properties and methods of the PlusSlider object
* Did some some structural changes to make everything more efficient

### Version 1.4
* Added slider support for dynamic `width` and `height`
* Streamlined the script
* Removed the `paginationThumbnails` option
* Set the `paginationWidth` to default to false
* Changed the title of the option `autoPlay` to `autoPlay`
* Added `defaultSlide` option
* Added comments throughout the jquery.plusslider.js file as well as made it more human-readable
* Changed a couple of element types and class names
* Added `.plusslide-container` class to the `.child` parent

### Version 1.3
* Added `nextText` and `prevText` options
* Added the `paginationThumbnails` option 
* Added the `nextSlide()` functionality to `toSlide()` (accepts 'next' and 'prev' as arg values)
* Removed the `nextSlide()` function (now that it's functionality is in toSlide())

### Version 1.2.6
* Added a paginationTitle
* Plugin optimization
* Added a minimal style option for easier CSS customization - jordanlev
* Added `onSlide` callback option - jordanlev
* Added `toSlide()` function - jordanlev

### Version 1.2
* Added option to place pagination before the slides
* Fixed a bug where PlusSlider wouldn't fade when display was set to none
* Removed version number from all file names

### Version 1.1
* Added support for multiple sliders per page
* Added a `width` &amp; `height` option

### Version 1
* First official version