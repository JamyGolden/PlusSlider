# PlusSlider jQuery Plugin

An agnostic, fluid jQuery content slider that is easily configurable and stylable.

## Features
* BEM CSS methadology used
* Easily swap between **fading** &amp; *sliding*
* Fluid or fixed width
* Slides are _HTML_ (_Can be images or text_)
* _Infinite Slide_ support
* Multiple PlusSliders per page
* Adaptive dimensions - Slides can be different width and or height
* API for developers
* Very _simple_ &amp; _valid markup_
* AutoPlay (_Optional_)
* **Next/Previous** Navigation (_Optional_)
* Titled or numbered **paginated** navigation (_Optional_)
* Callback available after each slide
* Tested on *IE 7+* and *modern browsers*

## Default Options
    $('#slider').plusSlider({

        /* General */
        sliderType          : 'slider', // Choose whether the carousel is a 'slider' or a 'fader'
        infiniteSlide       : true, // Gives the effect that the slider doesn't ever "repeat" and just continues forever
        disableLoop         : false, // Disables prev or next buttons if they are on the first or last slider respectively. 'first' only disables the previous button, 'last' disables the next and 'both' disables both

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

        /* Callbacks */
        onInit              : null, // Callback function: On slider initialize
        onSlide             : null, // Callback function: As the slide starts to animate
        afterSlide          : null, // Callback function: As the slide completes the animation
        onSlideEnd          : null, // Callback function: Once the slider reaches the last slide

        // Slider namespace
        namespace: 'plusslider',

        // Slider class names.
        // Note: All names are automatically prepended with namespace
        attrNames: {
            'elClass'             : '',
            'elActiveClass'       : '--active',
            'elTypeSliderClass'   : '--type-slider',
            'elTypeFaderClass'    : '--type-fader',
            'containerClass'      : '__container',
            'slideListClass'      : '__slide-list',
            'slideItemClass'      : '__slide-item',
            'slideItemActiveClass': '__slide--active',
            'slideItemCloneClass' : '__slide--clone',
            'arrowClass'          : '__arrow',
            'arrowListClass'      : '__arrow-list',
            'arrowItemClass'      : '__arrow-item',
            'arrowItemPrevClass'  : '__arrow-item--prev',
            'arrowItemNextClass'  : '__arrow-item--next',
            'pagiClass'           : '__pagi',
            'pagiListClass'       : '__pagi-list',
            'pagiItemClass'       : '__pagi-item',
            'pagiItemActiveClass' : '__pagi-item--active'
        }

    });

## Using the API
The following are the PlusSlider values you may use within the callback functions. Property names beginning with $ ( dollar sign ) are referencing a jQuery object, methods are referenced by ending in () ( open parenthasis, close parenthasis ) and the rest contain a number value.

    base.$slider             // References the outside .plusslider jQuery object
    base.$sliderList         // References the original object
    base.$sliderContainer    // References Slider container wrapping base.$sliderList
    base.$sliderItems        // References all jQuery slide objects within base.$sliderList
    base.slideCount          // A numerical value of the amount of slides
    base.slideIndexCount     // The index value of the amount of slides
    base.sliderWidth         //Stores the slider width value. This changes on resize
    base.animating           // Boolean - true means the slider is busy animating.
    base.wrapContainerWidth  // A numerical value of the width of base.$slider
    base.wrapContainerHeight // A numerical value of the height of base.$slider
    base.activeSlideIndex    // References the index number of the current slide
    base.$sliderItemsActive  // References the current/active slide's jQuery object
    base.activeSlideWidth    // References a numerical value of the width of the current/active slide
    base.activeSlideHeight   // References a numerical value of the height of the current/active slide
    base.beginTimer()        // Method that begins the autoPlay timer
    base.clearTimer()        // Method that resets the autoPlay timer
    base.toSlide()           // Will change the current/active slide - Accepts 'next', 'prev' or an index number value as well as a callback

### Accessing properties and methods from outside the callback functions
If you wish to make use of the slider methods and properties outside of the callback functions, you would need to initialize the slider in a slightly different way:

    var slider;

    $(document).ready(function(){
        slider = new $.plusSlider($('#slider'), {});
    });
    slider.toSlide('next); //move slider to next slide
    slider.toSlide('prev', function(sliderObj){
        // callback here
    }); //move slider to previous slide
    slider.toSlide(3); //move slider to arbitrary index (first slide is 0, second is 1, etc.)

## Customizing PlusSlider

The default example is a great demonstration of what you can do with PlusSlider, but you probably want to customize the slider to match your site's design.
Check out this easy 12-step tutorial on <a href="tutorial/index.html">how to customize the design of PlusSlider</a>.

## Changelog

## Version 1.5.16 - 1.5.12
* Added the ability to access PlusSlider through the jQuery object. Eg: `$('#slider').plusSlider('toSlide', 2)`
* Converted class names to work with BEM
* Changed all elements into `<div>`s.
* Added swipe touch functionality
* Added toSlide method callback. Eg: `$(el).plusSlider('toSlide', { slide: 'next', callback: function(base){} })`
* Bug fixes and stability improvements

## Version 1.5.5
* `fullWidth` option was integrated into the plugin by default
* SCSS replaced CSS
* Grunt built into project for easy js/css deployment/version number updating
* All elements have been converted to divs
* Code optimization

### Version 1.4.7
* Fader effect works better with slides of differing sizes:
  - Wrapper dimensions are set to slide width/height (just like they are with slider type)
  - Fade out last slide as new slide fades in (so transition between slides of different sizes looks better).
* Simplified styling and options:
  - Removed "width" and "height" javascript options (because all sizing can now be done via CSS)
  - Removed "paginationTitle" option -- now automatically uses "data-title" attribute where found.
  - Container ID no longer added as a class to dynamic PlusSlider wrapper
  - infiniteSlide now automatically overrides no-js fallback "display" settings (so you don't need to do so in your CSS file)
* Replaced "minimal" examples with new tutorial

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