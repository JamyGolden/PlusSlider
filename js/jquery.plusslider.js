/*
 * jQuery Plus Slider 1.5.2
 * By Jamy Golden
 * http://css-plus.com
 * @jamygolden
 *
 * Regarding licensing read license.txt.
 * tl;dr MIT
 */
(function($) {

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
                base.sliderWidth += base.$slideItems.eq( i ).outerWidth();
            }

            if (base.o.infiniteSlide) {
                base.sliderWidth += base.$slideItems.eq(0).outerWidth();
                base.sliderWidth += base.$slideItems.eq(base.slideIndexCount).outerWidth();
            }
        }

        // Vars and DOM environment
        // ==========================================================================
        base.o = $.extend( {}, $.plusSlider.defaults, options );
        // Create css namespace
        base.o.attrNames = base._applyCssNamespace(base.o.attrNames, base.o.namespace);

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Create elements
        base.$slider = $('<div />', {
            'class': base.o.attrNames.elClass + ' '
        });
        base.$sliderContainer = $('<div />', {
            'class': base.o.attrNames.containerClass
        });


        base.$sliderContainer.appendTo(base.$slider);

        base.$slider.insertBefore(base.$el);
        base.$el.appendTo(base.$sliderContainer);

        base.$wrap                  = base.$sliderContainer              // References the .plusslider jQuery object

        // Slides
        base.$slideItems            = base.$el.children();

        base.$slideCloneFirst;                                        // First clone needed for infinite slide
        base.$slideCloneLast;                                         // Last clone needed for infinite slide
        base.$wrapContainer         = base.$slider;            // References the jQuery object of .plusSlider's container - This object isn't part of PlusSlider
        base.slideCount             = base.$slideItems.length;        // A numerical value of the amount of slides
        base.slideIndexCount        = base.slideCount - 1;            // The index value of the amount of slides
        base.sliderWidth            = 0;                              //Stores the slider width value. This changes on resize if fullWidth is enableds
        base.animating              = false;                          // Boolean - true means the slider is busy animating.
        base.wrapContainerWidth     = base.$wrapContainer.innerWidth();    // A numerical value of the width of base.$wrapContainer
        base.wrapContainerHeight    = base.$wrapContainer.innerHeight();   // A numerical value of the height of base.$wrapContainer
        base.currentSlideIndex      = base.o.defaultSlide;      // References the index number of the current slide
        base.$currentSlide          = base.$slideItems.eq( base.currentSlideIndex ); // References the current/active slide's jQuery object
        base.currentSlideWidth      = base.$currentSlide.outerWidth(); // References a numerical value of the width of the current/active slide
        base.currentSlideHeight     = base.$currentSlide.outerHeight(); // References a numerical value of the height of the current/active slide

        base.$slideItems
            .addClass(base.o.attrNames.slideItemClass)
            .eq( base.currentSlideIndex )
            .addClass(base.o.attrNames.slideItemActiveClass);

        base.$el.addClass(base.o.attrNames.slideListClass);

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
            // Set values
            base._calculateSliderWidth();
            base.currentSlideWidth  = base.$currentSlide.outerWidth();
            base.currentSlideHeight = base.$currentSlide.outerHeight();
            // Values Set

            if ( base.o.fullWidth ) {

                base.sliderWidth = base.wrapContainerWidth * base.slideCount;
                if ( base.o.infiniteSlide == true ) {
                    base.sliderWidth = base.wrapContainerWidth * base.slideCount + 2;
                }

                base.wrapContainerWidth = base.$wrapContainer.innerWidth();

                base.$slideItems.width( base.wrapContainerWidth );

                if ( base.o.infiniteSlide ) {
                    base.$slideCloneFirst.width( base.wrapContainerWidth );
                    base.$slideCloneLast.width( base.wrapContainerWidth );
                }

                base._calculateSliderWidth();

                base.$wrap.width( base.wrapContainerWidth ).height( base.currentSlideHeight );
                base.$el.width( base.sliderWidth ).height( base.currentSlideHeight ).css('left', base.$currentSlide.position().left * -1 + 'px');

            } else {
                // Set wrapper dimensions to equal the slide
                base.$wrap.width( base.currentSlideWidth ).height( base.currentSlideHeight );
            }
        }

        base.toSlide = function( slide ) {

            if (base.animating == false) {

                // Set values
                base.animating = true;
                // Values set

                // Handling of slide values
                var lastSlideIndex = base.currentSlideIndex;
                if ( slide === 'next' || slide === '' ) {
                    base.currentSlideIndex += 1;
                } else if ( slide === 'prev' ) {
                    base.currentSlideIndex -= 1;
                } else {
                    base.currentSlideIndex = parseInt(slide);
                }
                // End Handling of slide values

                // Disable first and last buttons on the first and last slide respectively
                if ( ( base.o.disableLoop == 'first' || base.o.disableLoop == 'both' && base.currentSlideIndex < 0 ) || ( base.o.disableLoop == 'last' || base.o.disableLoop == 'both' && base.currentSlideIndex > base.slideIndexCount )) {
                     return;
                }  // End Disable first and last buttons on the first and last slide respectively

                // Handle possible slide values
                if ( base.currentSlideIndex > base.slideIndexCount ) {
                    base.currentSlideIndex = 0;
                } else if ( base.currentSlideIndex < 0 ) {
                    base.currentSlideIndex = base.slideIndexCount;
                }; // Handle possible slide values

                // Set values
                base.$currentSlide      = base.$slideItems.eq( base.currentSlideIndex );
                base.currentSlideWidth  = base.$currentSlide.width();
                base.currentSlideHeight = base.$currentSlide.height();
                // Values set

                // onSlide callback
                if ( base.o.onSlide && typeof( base.o.onSlide ) == 'function' ) base.o.onSlide( base );
                // End onSlide callback

                if ( base.o.createPagination ) {
                    base.$sliderControls.find('.' + base.o.attrNames.pagiItemClass).removeClass(base.o.attrNames.pagiItemActiveClass).eq( base.currentSlideIndex ).addClass(base.o.attrNames.pagiItemActiveClass);
                }; // base.o.createPagination

                if ( base.o.sliderType == 'slider' ) {

                    var toPosition = base.$currentSlide.position().left; // Position for slider position to animate to next

                    // Edit animation position to achieve the infinite slide effect
                    if ( base.o.infiniteSlide === true ) {
                        if ( base.currentSlideIndex == 0 && slide == 'next') { // only animate to the clone if toSlide('next') is run.
                            toPosition = base.$slideCloneFirst.position().left;
                        } else if ( base.currentSlideIndex == base.slideIndexCount && slide == 'prev') { // only animate to the clone if toSlide('prev') is run.
                            toPosition = base.$slideCloneLast.position().left;
                        };
                    };

                    // Animate slide position
                    base.$el.animate({
                        height: base.$currentSlide.outerHeight(),
                        left: toPosition * -1 + 'px'
                    }, base.o.speed, base.o.sliderEasing, function() {

                        if ( base.currentSlideIndex == 0 ) {
                            base.$el.css('left', base.$slideItems.eq(0).position().left * -1);
                        } else if ( base.currentSlideIndex == base.slideIndexCount ) {
                            base.$el.css('left', base.$slideItems.eq(base.slideIndexCount).position().left * -1);
                        }

                        base.endToSlide();

                    });

                // End slider

                } else {

                // Begin Fader

                    if (lastSlideIndex !== base.currentSlideIndex) {
                        base.$slideItems.eq( lastSlideIndex ).fadeOut(base.o.speed);
                    }

                    base.$slideItems.eq( base.currentSlideIndex ).fadeIn(base.o.speed, function() {

                        base.endToSlide();

                    });

                }; // if sliderType slider/fader

                // Animate wrapper size (for gradual transition between slides of differing sizes)
                base.$wrap.animate({
                    height: base.$currentSlide.outerHeight(),
                    width: base.$currentSlide.outerWidth()
                }, base.o.speed, base.o.sliderEasing);

                // Set class on new "current" slide
                base.$slideItems.removeClass( base.o.attrNames.slideItemActiveClass ).eq( base.currentSlideIndex ).addClass( base.o.attrNames.slideItemActiveClass );

            } // Don't slide while animated

            // Clear Timer
            if ( base.o.autoPlay ) {
                base.beginTimer();
            } // if base.o.autoPlay

        }; // base.toSlide

        base.endToSlide = function() { // perform cleanup operations after toSlide transition has finished (for both slider and fader type)

            base.animating = false;

            // afterSlide and onSlideEnd callback
            if ( base.o.afterSlide && typeof( base.o.afterSlide ) == 'function' ) base.o.afterSlide( base );
            if ( base.o.onSlideEnd && typeof( base.o.onSlideEnd ) == 'function' && base.currentSlideIndex == base.slideIndexCount ) base.o.onSlideEnd( base );
            // End afterSlide and onSlideEnd callback

        }; // base.endToSlide

        ////////////////////////////////////////////////////////////////////////////// End of methods

        base.init = function () {
            // Handle dependant options
                if ( base.slideCount === 1 ) {

                    base.o.autoPlay = false;
                    base.o.createArrows = false;
                    base.o.createPagination = false;

                }; // base.slideCount === 1

                if ( base.o.sliderType == 'fader' ) {
                    base.$slideItems.not('.' + base.o.attrNames.slideItemActiveClass).hide(); // Hide non-active slides
                    base.o.infiniteSlide = false;
                    base.o.fullWidth = false;
                }

                // infinite Slide
                if ( base.o.infiniteSlide === true ) {
                    base.$slideItems.show(); //override no-js fallback in CSS that hides non-first slides (otherwise infiniteSlide effect won't work when moving backwards from first to last slide)
                    base.$slideCloneFirst = base.$slideItems.first().clone().addClass(base.o.attrNames.slideItemCloneClass).removeClass(base.o.attrNames.slideItemActiveClass).insertAfter( base.$slideItems.eq(base.slideIndexCount) );
                    base.$slideCloneLast = base.$slideItems.last().clone().addClass(base.o.attrNames.slideItemCloneClass).insertBefore( base.$slideItems.eq(0) );
                }

                base.setSliderDimensions();

                // Set values
                base.currentSlideWidth  = base.$currentSlide.outerWidth();
                base.currentSlideHeight = base.$currentSlide.outerHeight();
                // Values set

                // Slider/Fader Settings
                if ( base.o.sliderType == 'slider' ) {

                    base._calculateSliderWidth();

                    base.$wrap.addClass(base.o.attrNames.elTypeSliderClass).find( base.$el ).width( base.sliderWidth );

                    if ( base.o.fullWidth ) {

                        base.setSliderDimensions();

                        $(window).resize( function () {

                            // Reset timer
                            if ( base.o.autoPlay ) {
                                base.clearTimer();
                                base.beginTimer();
                            }; // if base.o.autoPlay

                            // Reset dimensions
                            base.setSliderDimensions();

                        }); // window.resize

                    }; // base.o.fullWidth

                    base.$slideItems.show();
                    base.$el.css( 'left', base.$currentSlide.position().left * -1 + 'px' );

                } else {

                    base.$wrap.addClass(base.o.attrNames.elTypeFaderClass);
                    base.$slideItems.eq(0).show();

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
                            'text': (typeof base.$slideItems.eq( i ).attr('data-title') === 'undefined') ? i + 1 : base.$slideItems.eq( i ).attr('data-title')
                        }).appendTo(base.$sliderControls);

                    }; // Pagination appended

                    // Dynamic pagination width
                    if ( base.o.paginationWidth ) base.$sliderControls.width( base.$sliderControls.find('.' + base.o.attrNames.pagiItemClass).outerWidth(true) * base.slideCount );

                    // Pagination functionality
                    base.$sliderControls.find('.' + base.o.attrNames.pagiItemClass).click( function( ) {

                        var controlIndex = $(this).index();
                        base.toSlide( controlIndex );

                    }).eq( base.currentSlideIndex ).addClass(base.o.attrNames.pagiItemActiveClass);
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

                        base.$el.hover( function () {
                            base.clearTimer();
                        }, function() {
                            base.beginTimer();
                        }); // base.$el.hover

                    }; //  base.o.pauseOnHover

                }; // base.o.autoPlay

                // Keyboard navigation
                if ( base.o.keyboardNavigation ) {

                    base.$el.click( function () {
                        $('.' + base.o.attrNames.elActiveClass).removeClass(base.o.attrNames.elActiveClass);
                        $(this).addClass(base.o.attrNames.elActiveClass);

                    });

                    $(window).keyup( function ( e ) {

                        if ( base.$el.is('.' + base.o.attrNames.elActiveClass) ) {
                            if ( e.keyCode == 39 ) { // Right arrow
                                base.toSlide('next');
                            } else if ( e.keyCode == 37 ) { // Left arrow
                                base.toSlide('prev');
                            }; // e.keyCode
                        }; // if is .active-plusslider

                    }); // window.keyup

                }; // base.o.keyboardNavigation

            // onInit callback
                if ( base.o.onInit && typeof( base.o.onInit ) == 'function' ) base.o.onInit( base );

        }; // base.init

        // Run initializer
        base.init();

    };

    $.plusSlider.defaults = {

        /* General */
        sliderType          : 'slider', // Choose whether the carousel is a 'slider' or a 'fader'
        infiniteSlide       : true, // Gives the effect that the slider doesn't ever "repeat" and just continues forever
        disableLoop         : false, // Disables prev or next buttons if they are on the first or last slider respectively. 'first' only disables the previous button, 'last' disables the next and 'both' disables both
        fullWidth           : false, // sets the width of the slider to 100% of the parent container

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

    }; // $.plusSlider

    $.fn.plusSlider = function(options) {

        return this.each( function () {
            (new $.plusSlider(this, options));
        }); // this.each

    }; // $.fn.plusSlider

})(jQuery);
