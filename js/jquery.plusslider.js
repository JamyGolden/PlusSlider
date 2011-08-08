/*
 * jQuery Plus Slider 1.2.6
 * By Jamy Golden
 * http://css-plus.com
 *
 * Copyright 2011
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
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
            base.$slides = base.$el.children();
            base.$totalSlides = base.$slides.length;
            base.$el.wrap('<div class="plusSlider ' + base.$el.attr('id') + '" />');
            base.$wrap = base.$el.parent();
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
                    base.$el.before('<div class="plusSlider-controls" />');
                    base.$sliderControls = base.$el.prev('.plusSlider-controls');
                } else{
                   base.$el.after('<div class="plusSlider-controls" />');
                   base.$sliderControls = base.$el.next('.plusSlider-controls');
                }
                base.$sliderControls.wrap('<div class="plusSlider-controls-wrapper" />');
                // Pagination
                for (var i = 0; i < base.$totalSlides; i++){
                    base.$sliderControls.append('<a href="#" rel="' + i + '">' + (i + 1) + '</a>');
                }
                if(base.options.paginationWidth){
                     base.$sliderControls.width(base.$sliderControls.find('a').outerWidth(true) * base.$totalSlides);
                 }
                base.$sliderControls.find('a').click(function(){
                    base.toSlide($(this).attr('rel'));
                    return false;
                });
                base.$sliderControls.find('a').eq(0).addClass('current');
            } // End settings.pagination

            // Add plusSlider data
            base.$el.data("slides",{ current: base.$el.children('.current').index() })
            base.$wrap.before(base.$el.data("slides").current);
            
            // Begin Functions
            base.toSlide = function (slide){
                if(slide == 'next' || slide == null) slide = base.$el.data("slides").current + 1;
                if(slide == 'prev') slide = base.$el.data("slides").current - 1;
                if(slide >= base.$totalSlides) slide = 0;
                if(slide <= -1) slide = base.$totalSlides -1;

                if(base.options.sliderType == 'slider'){
                    if(!base.$el.is(':animated')){
                        if(base.options.createPagination){
                            base.$sliderControls.find('a[rel="' + slide + '"]').addClass('current').siblings().removeClass('current');
                        }
                        base.$el.animate({
                            left: base.$slideWidth * slide * -1 + "px"
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
                if (base.options.onSlide && typeof(base.options.onSlide) == "function") {
                    base.options.onSlide(base.$slides.filter('.current').index());
                }

                base.$el.data("slides",{ current: base.$el.children('.current').index() })
                base.$wrap.before(base.$el.data("slides").current);
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
                base.$el.before('<a class="arrow prev" href="#">prev</a><a class="arrow next" href="#">next</a>').siblings('.next').click(function(){
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

            // Pagination Titles-
            if(base.options.paginationTitle){
                for (var i = 0; i < base.$totalSlides; i++){
                    base.$sliderControls.find('a[rel="' + i + '"]').text(base.$slides.eq(i).attr('data-title'));
                }
            } // End Pagination Titles

            // Pagination Thumbnails - FIREFOX 5+ ONLY
            if(base.options.paginationThumbnails){

                for(i = 0; i < base.$slides.length; i++){
                    var $this = base.$slides.eq(i);
                    if(!$this.attr('id')){
                        $this.attr('id', 'plusSlider-slide-' + $this.index()); 
                    }
                }

                base.$sliderControls.after($("<div />", {'class': "plusSlider-thumbnail"}));
                var sliderThumbnail = base.$sliderControls.next('.plusSlider-thumbnail');

                sliderThumbnail.css({'height':base.$el.height(), 'width':base.$wrap.width()}).siblings('.plusSlider-controls').find('a').hover(function(){
                    sliderThumbnail.css('background-image', '-moz-element(#' + base.$slides.eq($(this).attr('rel')).attr('id') + ')').toggleClass('plusSlider-active');
                });

            } // End Pagination Thumbnails

        };
        // Run initializer
        base.init();
    };
    $.plusSlider.defaults ={
        createArrows: true, // Creates forward and backward navigation
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