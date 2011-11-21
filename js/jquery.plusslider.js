/*
 * jQuery Plus Slider 1.4.1.1
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

            // Vasic variables & Injected HTML elements
            base.$el.addClass('plusslide-container').wrap('<div class="plusslider ' + base.el.getAttribute('id') + '" />');
            base.$wrap = base.$el.parent();
            base.$wrapContainer = base.$wrap.parent();
            base.$slides = base.$el.children();

            // Slider value variables
            var totalSlides = base.$slides.length,
                totalIndex = totalSlides - 1,
                sliderWidth = 0,
                wrapContainerWidth = base.$wrapContainer.width();

                console.log ( wrapContainerWidth )

            // Default slide options
            if ( base.options.defaultSlide > totalIndex ) {

                base.options.defaultSlide = 0;

            } else if ( base.options.defaultSlide < 0 ) {

                base.options.defaultSlide = totalIndex;

            }; // Handle incorrect default slide options

            // Current slide data
            base.$el.data('slides', { 

                current: base.options.defaultSlide,
                dimensionsRecorded: false

            }); // base.$el.data.slides

            for ( var i = 0; i < totalSlides; i++ ) {

                if ( i == 0 ) sliderWidth = 0;
                
                sliderWidth += base.$slides.eq( i ).outerWidth();

            }; // Calculate the total slider width
            

            var currentTotalWidth = base.$slides.eq( base.options.defaultSlide ).outerWidth(),
                currentTotalHeight = base.$slides.eq( base.options.defaultSlide ).outerHeight();

            base.$slides.addClass('child').eq( base.options.defaultSlide ).addClass('current');
            base.$wrap.width( currentTotalWidth ).height( currentTotalHeight );
            base.$el.height( currentTotalHeight );


            // Slider/Fader Settings
            if ( base.options.sliderType == 'slider' ) {

                base.$wrap.addClass('plustype-slider');
                base.$el.width( sliderWidth );

                        if ( base.options.fullBleed ) {

                            function setSliderWidth () {

                                for ( var i = 0; i < totalSlides; i++ ) {

                                    if ( i == 0 ) sliderWidth = 0;
                                    
                                    var $currentSlide = base.$slides.eq( i );

                                    $currentSlide.width();
                                    sliderWidth += $currentSlide.outerWidth();

                                    base.$el.width( sliderWidth );

                                }; // Calculate the total slider width

                            };

                            base.$el.width( 9999 );
                            for ( var i = 0; i < totalSlides; i++ ) {

                                var $currentSlide = base.$slides.eq( i );
                                if ( base.$el.data('slides').dimensionsRecorded == false ) {
                                    $currentSlide.data('dimensions', {
                                        originalWidth: $currentSlide.width(),
                                        widthPercentage: Math.round ( parseFloat( 100 * $currentSlide.outerWidth() ) / parseFloat( wrapContainerWidth ) )
                                    });
                                };

                                var $currentSlide = base.$slides.eq( i );

                                if ( $currentSlide.data('dimensions').originalWidth > wrapContainerWidth ) {

                                    $currentSlide.width( wrapContainerWidth );

                                } else {

                                    $currentSlide.width( $currentSlide.data('dimensions').originalWidth );

                                } // $currentSlide.data.dimensions.originalWidth


                                if ( i == totalIndex ) base.$el.data('slides').dimensionsRecorded = true;
                            }

                            setSliderWidth();
                            
                        }

                base.$slides.show();
                base.$el.css( 'left', base.$slides.eq( base.options.defaultSlide ).position().left * -1 + 'px' );


            } else {

                base.$wrap.addClass('plustype-fader');
                base.$slides.eq(0).show();

            }; // base.options.sliderType
            
            // Handle the slider if only one slide exists
            if ( totalSlides === 1 ) {

                base.options.autoSlide = false;
                base.options.createArrows = false;
                base.options.createPagination = false;

            }; // totalSlides === 1

            // Overide default CSS width
            if ( base.options.width) base.$wrap.width( base.options.width );

            // Overide default CSS height
            if ( base.options.height) base.$wrap.height( base.options.height );

            // Begin pagination
            if ( base.options.createPagination ) {

                base.$sliderControls = $('<ul />', {

                        'class': 'plusslider-controls'

                    });

                // base.options.paginationBefore
                base.options.paginationBefore ? base.$sliderControls.prependTo( base.$wrap ) : base.$sliderControls.appendTo( base.$wrap ); 

                base.$sliderControls.wrap('<div class="plusslider-controls-wrapper" />');

                // Create Pagination
                for ( var i = 0; i < totalSlides; i++ ) {

                    $('<li />', {

                        href: '#',
                        'data-index': i,
                        text: base.options.paginationTitle ? base.$slides.eq( i ).attr('data-title') : i + 1

                    }).appendTo(base.$sliderControls);

                }; // Pagination appended

                // Dynamic pagination width
                if ( base.options.paginationWidth ) base.$sliderControls.width( base.$sliderControls.find('li').outerWidth(true) * totalSlides );

                // Pagination functionality

                var controlIndex = 0;
                base.$sliderControls.find('li').click( function( e ) {

                    controlIndex = $(this).index();

                    base.toSlide( controlIndex );

                }).eq( controlIndex ).addClass('current'); // base.$sliderControls.find('li').click

            }; // End settings.pagination

            // Begin Functions
            base.toSlide = function ( slide ) {

                if ( slide == 'next' || slide == '' ) {

                    slide = base.$el.data('slides').current + 1;
                
                } else if ( slide == 'prev' ) {

                    slide = base.$el.data('slides').current - 1;
                
                }; 

                if ( slide > totalIndex ) {

                    slide = 0;
                
                } else if ( slide < 0 ) {

                    slide = totalIndex;
                
                }; // Handle possible slide values

                if ( base.options.sliderType == 'slider' ) {

                    if ( !base.$el.is(':animated') ) {

                        if ( base.options.createPagination ) {

                            base.$sliderControls.find('li').removeClass('current').eq( slide ).addClass('current');

                        }; // base.options.createPagination

                        // Animate slide position
                        base.$el.animate({
                            height: base.$slides.eq( slide ).outerHeight(),
                            left: base.$slides.eq( slide ).position().left * -1 + 'px'
                        
                        }, base.options.speed, base.options.sliderEasing);

                        // Animate wrapper width
                        base.$wrap.animate({

                            height: base.$slides.eq( slide ).outerHeight(),
                            width: base.$slides.eq( slide ).outerWidth()
                        
                        }, base.options.speed, base.options.sliderEasing);

                        // Handle current slide
                        base.$slides.removeClass('current').eq( slide ).addClass('current');

                    }; // Don't slide while animated

                // End slider

                } else { 
                
                // Begin Fader
                    if ( !base.$slides.is(':animated') ) {
  
                        if ( base.options.createPagination ) {

                            base.$sliderControls.find('li').removeClass('current').eq( slide ).addClass('current');

                        }; // base.options.createPagination

                        base.$slides.removeClass('current').eq( slide ).addClass('current').fadeIn(base.options.speed, function() {

                            base.$slides.not('.current').hide();

                        });

                    }; // if !animated

                }; // if sliderType slider/fader

                // Clear Timer
                if ( base.options.autoSlide ) {

                    base.clearTimer();
                    base.beginTimer();

                }; // if base.options.autoSlide 

                // Callback
                if ( base.options.onSlide && typeof( base.options.onSlide ) == 'function' ) {

                    base.options.onSlide( );

                }; // base.options.onSlide

                // Modify PlusSlider data
                base.$el.data('slides',{ 

                    current: slide 

                });

            }; // base.toSlide
            
            // Auto Play Begins
            if ( base.options.autoSlide ) {
                base.clearTimer = function() {

                    // Clear the timer only if it is set
                    if ( base.timer) {

                        window.clearInterval(base.timer);

                    }; // if base.timer
                }; // base.clearTimer

                base.beginTimer = function() {
                    base.timer = window.setInterval( function () {
                        base.toSlide('next');
                    }, base.options.displayTime);
                }; // base.beginTimer

                base.beginTimer();

                // Pause on hover
                if ( base.options.pauseOnHover) {

                    base.$el.hover( function () {

                        base.clearTimer();

                    }, function() {

                        base.beginTimer();

                    }); // base.$el.hover

                }; //  base.options.pauseOnHover

            }; // base.options.autoSlide
            
            // Create Arrows
            if ( base.options.createArrows ) {

                $('<ul />', {
                    'class': 'plusnav'
                }).prependTo(base.$wrap);

                base.$arrows = base.$wrap.find('.plusnav');

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
            
            // Keyboard navigation
            if ( base.options.keyboardNavigation ) {

                base.$el.click( function () {
                    $('.active-plusslider').removeClass('active-plusslider');
                    $(this).addClass('active-plusslider');

                });

                $(window).keyup( function ( e ) {

                    if ( base.$el.is('.active-plusslider') ) {

                        if ( e.keyCode == 39 ) {

                            base.toSlide();

                        } else if ( e.keyCode == 37 ) {

                            base.toSlide('prev');

                        }; // e.keyCode

                    }; // if is .active-plusslider

                }); // window.keyup

            }; // base.options.keyboardNavigation

        }; // base.init

        // Run initializer
        base.init();

    };

    $.plusSlider.defaults ={

        /* General */
        sliderType: 'slider', // Choose whether the carousel is a 'slider' or a 'fader'
        fullBleed: false,
        width: false, // Overide the default CSS width
        height: false, // Overide the default CSS width
        
        /* Display related */
        defaultSlide: 0, // Sets the default starting slide - Number based on item index
        displayTime: 4000, // The amount of time the slide waits before automatically moving on to the next one. This requires 'autoSlide: true'
        sliderEasing: 'linear', // Anything other than 'linear' and 'swing' requires the easing plugin
        speed: 500, // The amount of time it takes for a slide to fade into another slide

        /* Functioanlity related */
        autoSlide: true, // Creats a times, looped 'slide-show'
        keyboardNavigation: true, // The keyboard's directional left and right arrows function as next and previous buttons
        pauseOnHover: true, // AutoSlide does not continue ifsomeone hovers over Plus Slider.

            /* Arrow related */
            createArrows: true, // Creates forward and backward navigation
            nextText: 'Next', // Adds text to the 'next' trigger
            prevText: 'Previous', // Adds text to the 'prev' trigger

            /* Pagination related */
            createPagination: true, // Creates Numbered pagination
            paginationBefore: false, // Place the pagination above the slider within the HTML
            paginationWidth: false, // Automatically gives the pagination a dynamic width
            paginationTitle: false, // Checks for attribute 'data-title' on each slide and names the pagination accordingly

        /* Callbacks */
        onSlide: null // Callback function

    }; // $.plusSlider

    $.fn.plusSlider = function(options) {

        return this.each( function () {

            (new $.plusSlider(this, options));

        }); // this.each

    }; // $.fn.plusSlider

})(jQuery);