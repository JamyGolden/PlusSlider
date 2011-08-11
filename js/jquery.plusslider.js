/*
 * jQuery Plus Slider 1.3
 * By Jamy Golden
 * http://css-plus.com
 *
 * Copyright 2011
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function($){
    $.plusSlider = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        // Add a reverse reference to the DOM object
        base.$el.data('plusSlider', base);
        
        base.init = function(){
            base.options = $.extend({}, $.plusSlider.defaults, options);
            // Vasic variables & Injected HTML elements
            base.$el.wrap('<div class="plusSlider ' + base.$el.attr('id') + '" />');
            base.$wrap = base.$el.parent();
            base.$slides = base.$el.children();
            base.$totalSlides = base.$slides.length;
            base.$slides.addClass('child');
            base.$slides.eq(0).addClass('current');
            
            // Slider/Fader Settings
            if(base.options.sliderType == 'slider'){
                base.$wrap.addClass('plusTypeSlider');
                base.$slideWidth = base.$el.find(':first').outerWidth(true);
                base.$sliderWidth = base.$slideWidth * base.$totalSlides;
                base.$stopPosition = base.$sliderWidth - base.$slideWidth;
                base.$el.width(base.$sliderWidth);
                base.$slides.show();
            }else{
                base.$wrap.addClass('plusTypeFader');
                base.$slides.eq(0).show();
            }
            if(base.$totalSlides === 1){
                base.options.autoPlay = false;
                base.options.createArrows = false;
                base.options.createPagination = false;
            }

            // Overide default CSS width
            if(base.options.width) base.$wrap.width(base.options.width);
            // Overide default CSS height
            if(base.options.height) base.$wrap.height(base.options.height);
            // Begin settings.pagination
            if(base.options.createPagination){
                // #slider-controls
                if(base.options.paginationBefore){
                    $('<div />', {
                        class: 'plusSlider-controls'
                    }).prependTo(base.$wrap);
                    base.$sliderControls = base.$el.prev('.plusSlider-controls');
                } else{
                   $('<div />', {
                       class: 'plusSlider-controls'
                    }).appendTo(base.$wrap);
                   base.$sliderControls = base.$el.next('.plusSlider-controls');
                }
                base.$sliderControls.wrap('<div class="plusSlider-controls-wrapper" />');

                // Create Pagination
                for (var i = 0; i < base.$totalSlides; i++){
                    $('<a />', {
                        href: '#',
                        rel: i,
                        text: i + 1
                    }).appendTo(base.$sliderControls);
                }

                // Pagination Titles
                if(base.options.paginationTitle){
                    for (var i = 0; i < base.$totalSlides; i++){
                        base.$sliderControls.find('a[rel="' + i + '"]').text(base.$slides.eq(i).attr('data-title'));
                    }
                } // End Pagination Titles

                // Dynamic pagination width
                if(base.options.paginationWidth){
                     base.$sliderControls.width(base.$sliderControls.find('a').outerWidth(true) * base.$totalSlides);
                 } // End dynamic pagination width

                // Pagination functionality
                base.$sliderControls.find('a').click(function(){
                    base.toSlide($(this).attr('rel'));
                    return false;
                }).eq(0).addClass('current');
            } // End settings.pagination

            // PlusSlider data
            base.$el.data('slides',{ current: base.$el.children('.current').index() })
            
            // Begin Functions
            base.toSlide = function (slide){
                if(slide == 'next' || slide == null) slide = base.$el.data('slides').current + 1;
                if(slide == 'prev') slide = base.$el.data('slides').current - 1;
                if(slide >= base.$totalSlides) slide = 0;
                if(slide <= -1) slide = base.$totalSlides -1;

                if(base.options.sliderType == 'slider'){
                    if(!base.$el.is(':animated')){
                        if(base.options.createPagination){
                            base.$sliderControls.find('a[rel="' + slide + '"]').addClass('current').siblings().removeClass('current');
                        }
                        base.$el.animate({
                            left: base.$slideWidth * slide * -1 + 'px'
                        }, base.options.speed, base.options.sliderEasing);
                        base.$el.children('.current').removeClass('current').parent().children().eq(slide).addClass('current');
                    }
                }else{ // Begin Fader
                    if(!base.$slides.is(':animated')){
  
                        if(base.options.createPagination){
                            base.$sliderControls.find('a[rel="' + slide + '"]').addClass('current').siblings().removeClass('current');
                        }
                        base.$slides.eq(slide).css('zIndex', 100).addClass('current').fadeIn(base.options.speed, function(){
                            base.$slides.not('.current').hide();
                        }).siblings().css('zIndex', 50).removeClass('current');
                    }
                }
                // Clear Timer
                if(base.options.autoPlay){
                    base.clearTimer();
                    base.beginTimer();
                }
                // Callback
                if (base.options.onSlide && typeof(base.options.onSlide) == 'function') {
                    base.options.onSlide(base.$slides.filter('.current').index());
                }
                // Modify PlusSlider data
                base.$el.data('slides',{ current: base.$el.children('.current').index() })
            }
            
            // Auto Play Begins
            if(base.options.autoPlay){
                base.clearTimer = function(){
                    // Clear the timer only ifit is set
                    if(base.timer){
                        window.clearInterval(base.timer);
                    }
                }
                base.beginTimer = function(){
                    base.timer = window.setInterval(function(){
                        base.toSlide('next');
                    }, base.options.displayTime);
                }
                base.beginTimer();
                // Pause on hover
                if(base.options.pauseOnHover){
                    base.$el.hover(function(){
                        base.clearTimer();
                    }, function(){
                        base.beginTimer();
                    });
                }
            } // Auto Play Ends
            
            // Create Arrows
            if(base.options.createArrows){
                // Prepend Next Arrow
                $('<a />', {
                    class: 'arrow next',
                    href: '#',
                    text: base.options.nextText
                }).prependTo(base.$wrap);

                // Prepend Previous Arrow
                $('<a />', {
                    class: 'arrow prev',
                    href: '#',
                    text: base.options.prevText
                }).prependTo(base.$wrap);
                base.$el.siblings('.next').click(function(){
                    base.toSlide('next');
                    return false;
                }).siblings('.prev').click(function(){
                    base.toSlide('prev');
                    return false;
                });
            } // End Arrow Creation
            
            // Keyboard navigation
            if(base.options.keyboardNavigation){
                base.$el.click(function(){
                    $('.activePlusSlider').removeClass('activePlusSlider');
                    $(this).addClass('activePlusSlider');
                });
                $(window).keyup(function(e){
                    if(base.$el.is('.activePlusSlider')){
                        if(e.keyCode == 39){
                            base.toSlide();
                        }else if(e.keyCode == 37){
                            base.toSlide('prev');
                        }
                    }
                });
            } // End Keyboard navigation

            // Pagination Thumbnails
            if(base.options.paginationThumbnails){
                // This functionality only works in IE 9+, Firefox, Chrome and Opera. The following if statement prohibits LT IE 9 from running this
                if($.browser.msie ? $.browser.version >= 9 : true == true){

                    for(i = 0; i < base.$slides.length; i++){
                        var $this = base.$slides.eq(i);
                        if(!$this.attr('id')){
                            $this.attr('id', 'plusSlider-slide-' + $this.index()); 
                        }
                    }

                    base.$el.after($('<div />', {
                        class: 'plusSlider-thumbnails'
                    }));

                    var sliderThumbnail = base.$el.next('.plusSlider-thumbnails');
                    base.$slides.clone().removeAttr('style').appendTo(sliderThumbnail);

                    base.$sliderControls.children().hover(function(){
                        sliderThumbnail.addClass('plusSlider-active').children().hide().eq($(this).index()).show();
                    }, function(){
                        sliderThumbnail.removeClass('plusSlider-active').children();
                    });
                }; // End LT IE 9 protection

            } // End Pagination Thumbnails

        };
        // Run initializer
        base.init();
    };
    $.plusSlider.defaults ={
        createArrows: true, // Creates forward and backward navigation
        nextText: 'Next',
        prevText: 'Previous',

        createPagination: true, // Creates Numbered pagination
        paginationBefore: false, // Place the pagination above the slider within the HTML
        paginationWidth: true, // Automatically gives the pagination a dynamic width
        paginationTitle: false, // Checks for attribute 'data-title' on each slide and names the pagination accordingly
        paginationThumbnails: false, // FIREFOX 5+ ONLY - Creates thumbnails of the slides once you hover over the pagination
        
        displayTime: 4000, // The amount of time the slide waits before automatically moving on to the next one. This requires 'autoPlay: true'
        speed: 500, // The amount of time it takes for a slide to fade into another slide
        
        autoPlay: true, // Creats a times, looped 'slide-show'
        keyboardNavigation: true, // The keyboard's directional left and right arrows function as next and previous buttons
        pauseOnHover: true, // Autoplay does not continue ifsomeone hovers over Plus Slider.
        
        sliderEasing: 'linear', // Anything other than 'linear' and 'swing' requires the easing plugin
        sliderType: 'slider', // Choose whether the carousel is a 'slider' or a 'fader'
        
        width: false, // Overide the default CSS width
        height: false, // Overide the default CSS width
        
        onSlide: null // Callback function
    };
    $.fn.plusSlider = function(options){
        return this.each(function(){
            (new $.plusSlider(this, options));
        });
    };
})(jQuery);