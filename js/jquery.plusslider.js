/*
 * PlusSlider
 * An agnostic jQuery content slider that is easily configurable
 * Version: "1.5.13"
 * Jamy Golden (http://css-plus.com/)
 * https://github.com/JamyGolden/PlusSlider
 * License: MIT
 */
 (function($) {
    "use strict";

    $.plusSlider = function(el, options) {

        // To avoid scope issues, use 'base' instead of 'this'
        // To reference this class from internal events and functions.
        var base = this;

        // Private Methods
        // ==========================================================================

        // Apply namespace to css classes
        base._applyCssNamespace = function(attrNames, namespace){
            var obj = {};
            $.each(attrNames, function(k, v){
                if(typeof v === 'string'){
                    obj[k] = namespace + v;
                };
            });

            return obj;
        }

        base._calculateSliderWidth = function() {
            for (var i = 0; i < base.slideCount; i++) {
                if ( i == 0 ) base.sliderWidth = 0;
                base.sliderWidth += base.$sliderItems.eq( i ).outerWidth();
            }

            if (base.o.infiniteSlide) {
                base.sliderWidth += base.$sliderItems.eq(0).outerWidth();
                base.sliderWidth += base.$sliderItems.eq(base.slideIndexCount).outerWidth();
            }
        }

        base._setupVars = function() {

            // Vars and DOM environment
            // ==========================================================================
            base.o = $.extend( {}, $.plusSlider.defaults, options );
            // Create css namespace
            base.o.attrNames = base._applyCssNamespace(base.o.attrNames, base.o.namespace);

            // Access to jQuery and DOM versions of element
            base.$sliderList = $(el);

            // Add reverse reference object
            base.$sliderList.data('plusSlider', base);

            // Create elements
            //////////////////

            // Slider class - contains all
            base.$slider = $('<div />', {
                'class': base.o.attrNames.elClass
            });

            // Slider container class - wraps list
            base.$sliderContainer = $('<div />', {
                'class': base.o.attrNames.containerClass
            });

            // Set plugin vars
            //////////////////
            base.$sliderItems        = base.$sliderList.children();
            base.slideCount          = base.$sliderItems.length; // A numerical value of the amount of slides
            base.slideIndexCount     = base.slideCount - 1; // The index value of the amount of slides
            base.sliderWidth         = 0; //Stores the slider width value. This changes on resize
            base.animating           = false; // Boolean - true means the slider is busy animating.
            base.wrapContainerWidth  = base.$slider.innerWidth(); // A numerical value of the width of base.$slider
            base.wrapContainerHeight = base.$slider.innerHeight(); // A numerical value of the height of base.$slider
            base.activeSlideIndex    = base.o.defaultSlide; // References the index number of the current slide
            base.touchEventArr       = []; // Used to detect whether a left or right swipe occurred
            base.initTouchPos; // Used to detect whether a left or right swipe occurred
            base.$sliderItemsActive  = base.$sliderItems.eq( base.activeSlideIndex ); // References the current/active slide's jQuery object
            base.$sliderItemsCloneFirst; // First clone needed for infinite slide
            base.$sliderItemsCloneLast; // Last clone needed for infinite slide

            // DOM manipulations
            ////////////////////
            base.$slider.insertBefore(base.$sliderList);
            base.$sliderList.appendTo(base.$sliderContainer); // Basically wraps el
            base.$sliderList.addClass(base.o.attrNames.slideListClass);
            base.$sliderContainer.appendTo(base.$slider); // Append new Container
            base.$sliderItems.addClass(base.o.attrNames.slideItemClass);
            base.$sliderItems.eq(base.activeSlideIndex);
            base.$sliderItems.addClass(base.o.attrNames.slideItemActiveClass);
        }


        // Public Methods
        // ==========================================================================
        base.beginTimer = function() {
            base.clearTimer(); // Clear if it is already set

            base.timer = window.setInterval( function () {
                base.toSlide('next');
            }, base.o.displayTime);
        }

        // Clear time if it is set
        base.clearTimer = function() {
            if (base.timer) {
                window.clearInterval(base.timer);
            }
        }

        base.setSliderDimensions = function() {
            // Vars and dom manipulation
            base.wrapContainerWidth  = base.$slider.innerWidth();
            base.sliderWidth         = base.wrapContainerWidth * base.slideCount;
            base.$sliderItems.css({
                'width': base.wrapContainerWidth
            });

            if (base.o.infiniteSlide == true) {
                base.$sliderItemsCloneFirst.css({
                    'width': base.wrapContainerWidth
                });
                base.$sliderItemsCloneLast.css({
                    'width': base.wrapContainerWidth
                });
            }

            base._calculateSliderWidth();

            base.$sliderContainer.css({
                'width': base.wrapContainerWidth,
                'height':  base.activeSlideHeight
            });
            base.$sliderList.css({
                'width': base.sliderWidth,
                'height':  base.activeSlideHeigh,
                'left': base.$sliderItemsActive.position().left * -1 + 'px'
            });
        }

        base.toSlide = function(obj) {
             var slide;

             // Determine what has been passed in as a parameter
            if (typeof obj === 'object') {
                slide = obj['slide'];
                var callback = obj['callback'];
            } else {
                slide = obj;
            }

            if (base.animating == false) {

                // Set values
                base.animating = true;
                // Values set

                // Handling of slide values
                var lastSlideIndex = base.activeSlideIndex;
                if (slide === 'next' || slide === '') {
                    base.activeSlideIndex += 1;
                } else if (slide === 'prev') {
                    base.activeSlideIndex -= 1;
                } else {
                    base.activeSlideIndex = parseInt(slide);
                }
                // End Handling of slide values

                // Disable first and last buttons on the first and last slide respectively
                if ( (base.o.disableLoop == 'first' || base.o.disableLoop == 'both' && base.activeSlideIndex < 0 ) || ( base.o.disableLoop == 'last' || base.o.disableLoop == 'both' && base.activeSlideIndex > base.slideIndexCount) ) {
                     return;
                }  // End Disable first and last buttons on the first and last slide respectively

                // Handle possible slide values
                if (base.activeSlideIndex > base.slideIndexCount) {
                    base.activeSlideIndex = 0;
                } else if (base.activeSlideIndex < 0) {
                    base.activeSlideIndex = base.slideIndexCount;
                }; // Handle possible slide values

                // Set values
                base.$sliderItemsActive = base.$sliderItems.eq( base.activeSlideIndex );
                // Values set

                // onSlide callback
                if (base.o.onSlide && typeof(base.o.onSlide) == 'function') base.o.onSlide(base);
                // End onSlide callback

                if (base.o.createPagination) {
                    base.$sliderControls.find('.' + base.o.attrNames.pagiItemClass).removeClass(base.o.attrNames.pagiItemActiveClass).eq( base.activeSlideIndex ).addClass(base.o.attrNames.pagiItemActiveClass);
                }; // base.o.createPagination

                if (base.o.sliderType == 'slider') {

                    var toPosition = base.wrapContainerWidth * base.$sliderItemsActive.index(); // Position for slider position to animate to next
                    // The below was removed due to a weird IE bug
                    // var toPosition =  base.$sliderItemsActive.position().left;

                    // Edit animation position to achieve the infinite slide effect
                    if ( base.o.infiniteSlide === true ) {
                        if ( base.activeSlideIndex == 0 && slide == 'next') { // only animate to the clone if toSlide('next') is run.
                            toPosition = base.$sliderItemsCloneFirst.position().left;
                        } else if ( base.activeSlideIndex == base.slideIndexCount && slide == 'prev') { // only animate to the clone if toSlide('prev') is run.
                            toPosition = base.$sliderItemsCloneLast.position().left;
                        };
                    };


                    // Animate slide position
                    base.$sliderList.animate({
                        'left': toPosition * -1 + 'px'
                    }, base.o.speed, base.o.sliderEasing, function() {

                        // Set current slide to correct position
                        if (base.activeSlideIndex == 0) {
                            base.$sliderList.css('left', base.$sliderItems.eq(0).position().left * -1);
                        } else if (base.activeSlideIndex == base.slideIndexCount) {
                            base.$sliderList.css('left', base.$sliderItems.eq(base.slideIndexCount).position().left * -1);
                        }

                        base.endToSlide(callback);

                    });

                // End slider
                } else {
                // Begin Fader
                    if (lastSlideIndex !== base.activeSlideIndex) {
                        base.$sliderItems.eq( lastSlideIndex ).fadeOut(base.o.speed);
                    }

                    base.$sliderItems.eq( base.activeSlideIndex ).fadeIn(base.o.speed, function() {
                        base.endToSlide(callback);
                    });

                }; // if sliderType slider/fader

                // // Animate wrapper size (for gradual transition between slides of differing sizes)
                // base.$sliderContainer.animate({
                //     'height': base.$sliderItemsActive.outerHeight(),
                //     'width': base.$sliderItemsActive.outerWidth()
                // }, base.o.speed, base.o.sliderEasing);

                // Set class on new "current" slide
                base.$sliderItems.removeClass( base.o.attrNames.slideItemActiveClass );
                base.$sliderItems.eq( base.activeSlideIndex );
                base.$sliderItems.addClass( base.o.attrNames.slideItemActiveClass );

            } // Don't slide while animated

            // Reset timer
            if (base.o.autoPlay) {
                base.beginTimer();
            }

        }; // base.toSlide

        base.endToSlide = function(toSlideCallback) { // perform cleanup operations after toSlide transition has finished (for both slider and fader type)

            base.animating = false;

            // afterSlide and onSlideEnd callback
            if (toSlideCallback && typeof toSlideCallback == 'function') toSlideCallback(base);
            if (base.o.afterSlide && typeof( base.o.afterSlide ) == 'function') base.o.afterSlide(base);
            if (base.o.onSlideEnd && typeof( base.o.onSlideEnd ) == 'function' && base.activeSlideIndex == base.slideIndexCount) base.o.onSlideEnd(base);
            // End afterSlide and onSlideEnd callback

        } // base.endToSlide

        base.init = function () {
            base._setupVars()
            // Handle dependant options
                if (base.slideCount === 1) {

                    base.o.autoPlay = false;
                    base.o.createArrows = false;
                    base.o.createPagination = false;

                }; // base.slideCount === 1

                if (base.o.sliderType == 'fader') {
                    base.$sliderItems.not('.' + base.o.attrNames.slideItemActiveClass).hide(); // Hide non-active slides
                    base.o.infiniteSlide = false;
                }

                // infinite Slide
                if (base.o.infiniteSlide === true) {
                    base.$sliderItems.css('display', 'block'); //override no-js fallback. Force to block for slider items
                    base.$sliderItemsCloneFirst = base.$sliderItems.first().clone().addClass(base.o.attrNames.slideItemCloneClass).removeClass(base.o.attrNames.slideItemActiveClass).insertAfter( base.$sliderItems.eq(base.slideIndexCount) );
                    base.$sliderItemsCloneLast = base.$sliderItems.last().clone().addClass(base.o.attrNames.slideItemCloneClass).insertBefore( base.$sliderItems.eq(0) );
                }

                base.setSliderDimensions();

                // Slider/Fader Settings
                if (base.o.sliderType == 'slider') {

                    base._calculateSliderWidth();

                    base.$sliderContainer.addClass(base.o.attrNames.elTypeSliderClass).find(base.$sliderList).width( base.sliderWidth );

                    base.setSliderDimensions();

                    $(window).resize(function() {

                        // Reset timer
                        if (base.o.autoPlay) {
                            base.clearTimer();
                            base.beginTimer();
                        }; // if base.o.autoPlay

                        // Reset dimensions
                        base.setSliderDimensions();

                    }); // window.resize

                    base.$sliderItems.css('display', 'block'); // force block instead of possible inline
                    base.$sliderList.css( 'left', base.$sliderItemsActive.position().left * -1 + 'px' );

                } else {

                    base.$sliderContainer.addClass(base.o.attrNames.elTypeFaderClass);
                    base.$sliderItems.eq(0).css('display', 'block'); // force block instead of possible inline

                }; // base.o.sliderType

                // Begin pagination
                if ( base.o.createPagination ) {

                    base.$sliderControls = $('<div />', {
                        'class': base.o.attrNames.pagiListClass
                    });

                    switch (base.o.paginationPosition) {

                        case 'before':
                            base.$sliderControls.insertBefore( base.$slider );
                            break;

                        case 'prepend':
                            base.$sliderControls.prependTo( base.$slider );
                            break;

                        case 'after':
                            base.$sliderControls.insertAfter( base.$slider );
                            break;

                        default: //'append'
                            base.$sliderControls.appendTo( base.$slider );
                            break;

                    }

                    base.$sliderControls.wrap('<div class="' + base.o.attrNames.pagiClass + '" />');

                    // Create Pagination
                    for ( var i = 0; i < base.slideCount; i++ ) {

                        $('<div />', {
                            'data-index': i,
                            'class': base.o.attrNames.pagiItemClass,
                            'text': (typeof base.$sliderItems.eq( i ).attr('data-title') === 'undefined') ? i + 1 : base.$sliderItems.eq( i ).attr('data-title')
                        }).appendTo(base.$sliderControls);

                    }; // Pagination appended

                    // Dynamic pagination width
                    if ( base.o.paginationWidth ) base.$sliderControls.width( base.$sliderControls.find('.' + base.o.attrNames.pagiItemClass).outerWidth(true) * base.slideCount );

                    // Pagination functionality
                    base.$sliderControls.find('.' + base.o.attrNames.pagiItemClass).click( function( ) {

                        var controlIndex = $(this).index();
                        base.toSlide( controlIndex );

                    }).eq( base.activeSlideIndex ).addClass(base.o.attrNames.pagiItemActiveClass);
                    // base.$sliderControls.find('li').click

                }; // End settings.pagination

                // Create Arrows
                if ( base.o.createArrows ) {

                    base.$arrows = $('<div />', {
                        'class': base.o.attrNames.arrowListClass
                    });

                    switch (base.o.arrowsPosition) {

                        case 'before':
                            base.$arrows.insertBefore( base.$slider );
                            break;

                        case 'append':
                            base.$arrows.appendTo( base.$slider );
                            break;

                        case 'after':
                            base.$arrows.insertAfter( base.$slider );
                            break;

                        default: //'prepend'
                            base.$arrows.prependTo( base.$slider );
                            break;

                    }

                    base.$arrows.wrap('<div class="' + base.o.attrNames.arrowClass + '" />');

                    // Prepend Next Arrow
                    $('<div />', {
                        'class': base.o.attrNames.arrowItemClass + ' ' + base.o.attrNames.arrowItemNextClass,
                        text: base.o.nextText
                    }).prependTo( base.$arrows );

                    // Prepend Previous Arrow
                    $('<div />', {
                        'class': base.o.attrNames.arrowItemClass + ' ' + base.o.attrNames.arrowItemPrevClass,
                        text: base.o.prevText
                    }).prependTo( base.$arrows );

                    base.$arrows.find('.' + base.o.attrNames.arrowItemNextClass).click( function() {
                        base.toSlide('next');
                    }); // .next.click

                    base.$arrows.find('.' + base.o.attrNames.arrowItemPrevClass).click( function() {
                        base.toSlide('prev');
                    }); // prev.click

                }; // base.o.createArrows

                // base.o.autoPlay
                if ( base.o.autoPlay ) {

                    base.beginTimer();

                    // Pause on hover
                    if ( base.o.pauseOnHover) {

                        base.$sliderList.hover( function () {
                            base.clearTimer();
                        }, function() {
                            base.beginTimer();
                        }); // base.$sliderList.hover

                    }; //  base.o.pauseOnHover

                }; // base.o.autoPlay

                // Keyboard navigation
                if ( base.o.keyboardNavigation ) {

                    base.$sliderList.click( function () {
                        $('.' + base.o.attrNames.elActiveClass).removeClass(base.o.attrNames.elActiveClass);
                        $(this).addClass(base.o.attrNames.elActiveClass);

                    });

                    $(window).keyup( function ( e ) {

                        if ( base.$sliderList.is('.' + base.o.attrNames.elActiveClass) ) {
                            if ( e.keyCode == 39 ) { // Right arrow
                                base.toSlide('next');
                            } else if ( e.keyCode == 37 ) { // Left arrow
                                base.toSlide('prev');
                            }; // e.keyCode
                        }; // if is .active-plusslider

                    }); // window.keyup

                }; // base.o.keyboardNavigation

                // Touch event support
                if (base.o.touchEvents) {
                    if (document.addEventListener) { // Supports addEventListener. Basically ignores IE.

                        base.$sliderList.get(0).addEventListener('touchstart', function(e) {
                            var touchPosX = e.touches[0].pageX;
                            var touchPosY = e.touches[0].pageY;
                            var touchObj = {
                                'posX': touchPosX,
                                'posY': touchPosY
                            };
                            base.touchEventArr = [];

                            base.touchEventArr.push(touchObj);
                        }, false);

                        base.$sliderList.get(0).addEventListener('touchmove', function(e) {
                            if (base.o.touchEventScroll === false) {
                                e.preventDefault();
                            }

                            var touchPosX = e.touches[0].pageX;
                            var touchPosY = e.touches[0].pageY;
                            var touchObj = {
                                'posX': touchPosX,
                                'posY': touchPosY
                            };

                            base.touchEventArr.push(touchObj);
                        }, false);

                        base.$sliderList.get(0).addEventListener('touchend', function(e) {
                            var firstPosX      = base.touchEventArr[0]['posX'];
                            var lastPosX       = base.touchEventArr[base.touchEventArr.length -1]['posX'];
                            var differencePosX = lastPosX - firstPosX;

                            // Swipe Right
                            if(differencePosX < 0 && Math.abs(differencePosX) > 80) {
                                base.toSlide('next');

                            // Swipe Right
                            } else if (differencePosX > 0 && Math.abs(differencePosX) > 80){
                                base.toSlide('prev');
                            }
                        });

                    }
                }

            // onInit callback
            if ( base.o.onInit && typeof( base.o.onInit ) == 'function' ) base.o.onInit( base );

        } // base.init

        // Check to see if plugin has run before
        // If so then modify the existing plugin with the options supplied
        // Otherwise initialize it with those options

        var oldBase = $(el).data('plusSlider');
        if (typeof oldBase === 'object') {
            $.each(options, function(k, v) {
                if(typeof oldBase[k] === 'function') {
                    oldBase[k](v);
                } else {
                    oldBase[k] = v;
                }
            });
        } else {
            // Run initializer
            base.init();
        }

    };

    $.plusSlider.defaults = {

        /* General */
        sliderType          : 'slider', // Choose whether the carousel is a 'slider' or a 'fader'
        infiniteSlide       : true, // Gives the effect that the slider doesn't ever "repeat" and just continues forever
        disabelLoop         : false, // Disables prev or next buttons if they are on the first or last slider respectively. 'first' only disables the previous button, 'last' disables the next and 'both' disables both

        /* Display related */
        defaultSlide        : 0, // Sets the default starting slide - Number based on item index
        displayTime         : 4000, // The amount of time the slide waits before automatically moving on to the next one. This requires 'autoPlay: true'
        sliderEasing        : 'linear', // Anything other than 'linear' and 'swing' requires the easing plugin
        speed               : 500, // The amount of time it takes for a slide to fade into another slide

        /* Functioanlity related */
        autoPlay            : true, // Creats a times, looped 'slide-show'
        keyboardNavigation  : true, // The keyboard's directional left and right arrows function as next and previous buttons
        pauseOnHover        : true, // AutoPlay does not continue ifsomeone hovers over Plus Slider.
        touchEvents         : true,
        touchEventScroll    : true,

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

    }; // $.plusSlider

    $.fn.plusSlider = function(key, val) {

        return this.each( function () {
            var options;

            // Allow for passing in an object or a single key and value
            if (typeof key !== 'object' && typeof val !== 'undefined') {
                options = {};
                options[key] = val;
            } else {
                options = key;
            }

            (new $.plusSlider(this, options));
        }); // this.each

    }; // $.fn.plusSlider

})(jQuery);
