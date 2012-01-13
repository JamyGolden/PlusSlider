/*
 * jQuery Plus Slider 1.4.5
 * By Jamy Golden
 * http://css-plus.com
 * @jamygolden
 *
 * Copyright 2011
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
( function( $ ) {

    $.plusSlider = function( el, options ) {

        // To avoid scope issues, use 'base' instead of 'this'
        // To reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $( el );
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data('plusSlider', base);
        
        base.init = function () {

            base.options = $.extend( {}, $.plusSlider.defaults, options );
            base.$el.addClass('plusslider-container').wrap('<div class="plusslider ' + base.$el.attr('id') + '" />');
            base.$wrap                  = base.$el.parent();
            base.$slides                = base.$el.children();
            base.$wrapContainer         = base.$wrap.parent();
            base.slideCount             = base.$slides.length;
            base.slideIndexCount        = base.slideCount - 1;
            base.sliderWidth            = 0;
            base.animating              = false;
            base.wrapContainerWidth     = base.$wrapContainer.width();
            base.wrapContainerHeight    = base.$wrapContainer.height();
            base.currentSlideIndex      = base.options.defaultSlide;
            base.$currentSlide          = base.$slides.eq( base.currentSlideIndex );
            base.currentSlideWidth      = base.$currentSlide.outerWidth();
            base.currentSlideHeight     = base.$currentSlide.outerHeight();

            // base.functions
            base.calculateSliderWidth   = function() {

                for ( var i = 0; i < base.slideCount; i++ ) {
                    if ( i == 0 ) base.sliderWidth = 0;
                    base.sliderWidth += base.$slides.eq( i ).outerWidth();
                };

            }; // base.calculateSliderWidth

            base.beginTimer             = function() {

                base.timer = window.setInterval( function () {
                    base.toSlide('next');
                }, base.options.displayTime);

            }; // base.beginTimer

            base.clearTimer             = function() {
                
                if ( base.timer) { // If the timer is set, clear it
                    window.clearInterval(base.timer);
                };

            }; // base.clearTimer

            base.setSliderDimensions    = function() {

                // Set values
                base.calculateSliderWidth();
                base.currentSlideWidth  = base.$currentSlide.outerWidth();
                base.currentSlideHeight = base.$currentSlide.outerHeight();
                // Values Set
                
                if ( base.options.fullWidth ) {

                    base.sliderWidth        = base.wrapContainerWidth * base.slideCount;
                    base.wrapContainerWidth = base.$wrapContainer.width();

                    base.$slides.width( base.wrapContainerWidth );
                    base.calculateSliderWidth();

                    base.$wrap.width( base.wrapContainerWidth ).height( base.currentSlideHeight );
                    base.$el.width( base.sliderWidth ).css('left', base.$currentSlide.position().left * -1 + 'px');

                } else if ( base.options.sliderType == 'slider' ) {

                    base.$wrap.width( base.currentSlideWidth );
                    base.$wrap.height( base.currentSlideHeight );

                }

            }; // base.setSliderDimensions

            base.toSlide                = function( slide ) {

                if ( base.animating == false ) {

                    // Set values
                    base.animating = true;
                    // Values set

                    // Handling of slide values
                    if ( slide === 'next' || slide === '' ) {

                        base.currentSlideIndex += 1;
                    
                    } else if ( slide === 'prev' ) {

                        base.currentSlideIndex -= 1;
                    
                    } else {

                        base.currentSlideIndex = parseInt(slide);

                    }
                    // End Handling of slide values

                    // Disable first and last buttons on the first and last slide respectively
                    if ( ( base.options.disableLoop == 'first' || base.options.disableLoop == 'both' && base.currentSlideIndex < 0 ) || ( base.options.disableLoop == 'last' || base.options.disableLoop == 'both' && base.currentSlideIndex > base.slideIndexCount )) {
                         return;
                    }  // End Disable first and last buttons on the first and last slide respectively

                    // Handle possible slide values
                    if ( base.currentSlideIndex > base.slideIndexCount ) {

                        base.currentSlideIndex = 0;
                    
                    } else if ( base.currentSlideIndex < 0 ) {

                        base.currentSlideIndex = base.slideIndexCount;
                    
                    }; // Handle possible slide values

                    // Set values
                    base.$currentSlide      = base.$slides.eq( base.currentSlideIndex );
                    base.currentSlideWidth  = base.$currentSlide.width();
                    base.currentSlideHeight = base.$currentSlide.height();
                    // Values set

                    // onSlide callback
                    if ( base.options.onSlide && typeof( base.options.onSlide ) == 'function' ) base.options.onSlide( base );
                    // End onSlide callback

                    if ( base.options.sliderType == 'slider' ) {

                        if ( base.options.createPagination ) {

                            base.$sliderControls.find('li').removeClass('current').eq( base.currentSlideIndex ).addClass('current');

                        }; // base.options.createPagination

                        // Animate slide position
                        base.$el.animate({
                            height: base.$currentSlide.outerHeight(),
                            left: base.$currentSlide.position().left * -1 + 'px'
                        
                        }, base.options.speed, base.options.sliderEasing, function() {

                            // Set values
                            base.animating = false;
                            // Values set

                            // afterSlide and onSlideEnd callback
                            if ( base.options.afterSlide && typeof( base.options.afterSlide ) == 'function' ) base.options.afterSlide( base );
                            if ( base.options.onSlideEnd && typeof( base.options.onSlideEnd ) == 'function' && base.currentSlideIndex == base.slideIndexCount ) base.options.onSlideEnd( base );
                            // End afterSlide and onSlideEnd callback

                        });

                        // Animate wrapper width
                        base.$wrap.animate({

                            height: base.$currentSlide.outerHeight(),
                            width: base.$currentSlide.outerWidth()
                        
                        }, base.options.speed, base.options.sliderEasing);

                        // Handle current slide
                        base.$slides.removeClass('current').eq( base.currentSlideIndex ).addClass('current');

                    // End slider

                    } else { 
                
                    // Begin Fader  
                        if ( base.options.createPagination ) {

                            base.$sliderControls.find('li').removeClass('current').eq( base.currentSlideIndex ).addClass('current');

                        }; // base.options.createPagination

                        base.$slides.removeClass('current').eq( base.currentSlideIndex ).addClass('current').fadeIn(base.options.speed, function() {

                            base.$slides.not('.current').hide();

                            // Set values
                            base.animating = false;
                            // Values set

                            // afterSlide and onSlideEnd callback
                            if ( base.options.afterSlide && typeof( base.options.afterSlide ) == 'function' ) base.options.afterSlide( base );
                            if ( base.options.onSlideEnd && typeof( base.options.onSlideEnd ) == 'function' && base.currentSlideIndex == base.slideIndexCount ) base.options.onSlideEnd( base );
                            // End afterSlide and onSlideEnd callback

                        });

                    }; // if sliderType slider/fader

                }; // Don't slide while animated

                // Clear Timer
                if ( base.options.autoPlay ) {

                    base.clearTimer();
                    base.beginTimer();

                }; // if base.options.autoPlay 

            }; // base.toSlide

            ////////////////////////////////////////////////////////////////////////////// End of methods

            // Handle dependant options
                if ( base.slideCount === 1 ) {

                    base.options.autoPlay = false;
                    base.options.createArrows = false;
                    base.options.createPagination = false;

                }; // base.slideCount === 1

                if ( base.options.sliderType == 'fader' ) base.options.fullWidth = false;
        
            // DOM manipulations

                base.$slides.addClass('child').eq( base.currentSlideIndex ).addClass('current');
                base.setSliderDimensions();

                // Overide default CSS width and height
                if ( base.options.width) base.$wrap.width( base.options.width );
                if ( base.options.height) base.$wrap.height( base.options.height );
                // End CSS overide

                // Set values
                base.currentSlideWidth  = base.$currentSlide.outerWidth();
                base.currentSlideHeight = base.$currentSlide.outerHeight();
                // Values set

                // Slider/Fader Settings
                if ( base.options.sliderType == 'slider' ) {

                    base.calculateSliderWidth();

                    base.$wrap.addClass('plustype-slider').find( base.$el ).width( base.sliderWidth );

                    if ( base.options.fullWidth ) {

                        base.setSliderDimensions();
                    
                        $(window).resize( function () {

                            // Reset timer
                            base.clearTimer();
                            base.beginTimer();

                            // Reset dimensions
                            base.setSliderDimensions();


                        }); // window.resize
          
                    }; // base.options.fullWidth

                    base.$slides.show();
                    base.$el.css( 'left', base.$currentSlide.position().left * -1 + 'px' );

                } else {

                    base.$wrap.addClass('plustype-fader');
                    base.$slides.eq(0).show();

                }; // base.options.sliderType

                // Begin pagination
                if ( base.options.createPagination ) {

                    base.$sliderControls = $('<ul />', {

                            'class': 'plusslider-pagination'

                        });

                    switch (base.options.paginationPosition) {

                        case 'before':
                            base.$sliderControls.insertBefore( base.$wrap );
                            break;

                        case 'prepend':
                            base.$sliderControls.prependTo( base.$wrap );
                            break;

                        case 'after':
                            base.$sliderControls.insertAfter( base.$wrap );
                            break;

                        default: //'append'
                            base.$sliderControls.appendTo( base.$wrap );
                            break;

                    }

                    base.$sliderControls.wrap('<div class="plusslider-pagination-wrapper" />');

                    // Create Pagination
                    for ( var i = 0; i < base.slideCount; i++ ) {

                        $('<li />', {

                            'data-index': i,
                            text: base.options.paginationTitle ? base.$slides.eq( i ).attr('data-title') : i + 1

                        }).appendTo(base.$sliderControls);

                    }; // Pagination appended

                    // Dynamic pagination width
                    if ( base.options.paginationWidth ) base.$sliderControls.width( base.$sliderControls.find('li').outerWidth(true) * base.slideCount );

                    // Pagination functionality
                    base.$sliderControls.find('li').click( function( ) {

                        var controlIndex = $(this).index();

                        base.toSlide( controlIndex );

                    }).eq( base.currentSlideIndex ).addClass('current'); 
                    // base.$sliderControls.find('li').click

                }; // End settings.pagination

                // Create Arrows
                if ( base.options.createArrows ) {

                    base.$arrows = $('<ul />', {

                        'class': 'plusslider-arrows'

                    });

                    switch (base.options.arrowsPosition) {

                        case 'before':
                            base.$arrows.insertBefore( base.$wrap );
                            break;

                        case 'append':
                            base.$arrows.appendTo( base.$wrap );
                            break;

                        case 'after':
                            base.$arrows.insertAfter( base.$wrap );
                            break;

                        default: //'prepend'
                            base.$arrows.prependTo( base.$wrap );
                            break;

                    }

                    base.$arrows.wrap('<div class="plusslider-arrows-wrapper" />');

                    // Prepend Next Arrow
                    $('<li />', {
                        'class': 'next',
                        text: base.options.nextText
                    }).prependTo( base.$arrows );

                    // Prepend Previous Arrow
                    $('<li />', {
                        'class': 'prev',
                        text: base.options.prevText
                    }).prependTo( base.$arrows );

                    base.$arrows.find('.next').click( function() {

                        base.toSlide('next');

                    }); // .next.click

                    base.$arrows.find('.prev').click( function() {

                        base.toSlide('prev');

                    }); // prev.click

                }; // base.options.createArrows

                // base.options.autoPlay
                if ( base.options.autoPlay ) {

                    base.beginTimer();

                    // Pause on hover
                    if ( base.options.pauseOnHover) {

                        base.$el.hover( function () {

                            base.clearTimer();

                        }, function() {

                            base.beginTimer();

                        }); // base.$el.hover

                    }; //  base.options.pauseOnHover

                }; // base.options.autoPlay
                
                // Keyboard navigation
                if ( base.options.keyboardNavigation ) {

                    base.$el.click( function () {
                        $('.active-plusslider').removeClass('active-plusslider');
                        $(this).addClass('active-plusslider');

                    });

                    $(window).keyup( function ( e ) {

                        if ( base.$el.is('.active-plusslider') ) {

                            if ( e.keyCode == 39 ) { // Right arrow

                                base.toSlide('next');

                            } else if ( e.keyCode == 37 ) { // Left arrow

                                base.toSlide('prev');

                            }; // e.keyCode

                        }; // if is .active-plusslider

                    }); // window.keyup

                }; // base.options.keyboardNavigation
                
            // onInit callback
                if ( base.options.onInit && typeof( base.options.onInit ) == 'function' ) base.options.onInit( base );


        }; // base.init

        // Run initializer
        base.init();

    };

    $.plusSlider.defaults = {

        /* General */
        sliderType          : 'slider', // Choose whether the carousel is a 'slider' or a 'fader'
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

    }; // $.plusSlider

    $.fn.plusSlider = function(options) {

        return this.each( function () {

            (new $.plusSlider(this, options));

        }); // this.each

    }; // $.fn.plusSlider

})(jQuery);