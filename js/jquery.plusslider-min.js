/*
 * jQuery Plus Slider 1.2
 * By Jamy Golden
 * http://css-plus.com
 *
 * Copyright 2011
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($){$.plusSlider=function(el,options){var base=this;base.$el=$(el);base.el=el;base.$el.data('plusSlider',base);base.init=function(){base.options=$.extend({},$.plusSlider.defaults,options);base.$slides=base.$el.children();base.$totalSlides=base.$slides.length;base.$el.wrap('<div class="plusSlider" />');base.$slides.addClass('child');base.$slides.eq(0).addClass('current');if(base.options.sliderType=='slider'){base.$slideWidth=base.$el.find(':first').outerWidth(true);base.$sliderWidth=base.$slideWidth*base.$totalSlides;base.$stopPosition=base.$sliderWidth-base.$slideWidth;base.$el.width(base.$sliderWidth);base.$el.children().show();}else{base.$el.parent().addClass('fader');base.$el.children(':first').show();}
if(base.$totalSlides===1){base.options.autoPlay=false;base.options.createArrows=false;base.options.createPagination=false;}
if(base.options.width){base.$el.parent().width(base.options.width);}
if(base.options.height){base.$el.parent().height(base.options.height);}
if(base.options.createPagination){if(base.options.paginationBefore){base.$el.before('<div class="plusSlider-controls" />');base.$sliderControls=base.$el.prev('.plusSlider-controls');}else{base.$el.after('<div class="plusSlider-controls" />');base.$sliderControls=base.$el.next('.plusSlider-controls');}
base.$sliderControls.wrap('<div class="plusSlider-controls-wrapper" />');for(var i=0;i<base.$totalSlides;i++){base.$sliderControls.append('<a href="#" rel="'+i+'">'+(i+1)+'</a>');}
if(base.options.paginationWidth){base.$sliderControls.width(base.$sliderControls.find('a').outerWidth(true)*base.$totalSlides);}
if(base.options.sliderType=='slider'){base.$sliderControls.find('a').click(function(){var $this=$(this);if(!base.$slides.is(':animated')){base.$rel=$this.attr('rel');$this.addClass('current').siblings().removeClass('current');base.$el.animate({left:base.$slideWidth*base.$rel*-1+"px"},base.options.speed,base.options.sliderEasing);if(base.options.autoPlay){base.clearTimer();base.beginTimer();}}
return false;});}else{base.$sliderControls.find('a').click(function(){var $this=$(this);if(!base.$slides.is(':animated')){$this.addClass('current').siblings().removeClass('current');base.$slides.eq($this.attr('rel')).siblings().css('zIndex',50).removeClass('current');base.$slides.eq($this.attr('rel')).css('zIndex',100).addClass('current').fadeIn(base.options.speed,function(){base.$slides.not('.current').hide();});if(base.options.autoPlay){base.clearTimer();base.beginTimer();}}
return false;});}
base.$sliderControls.find('a').eq(0).addClass('current');}
if(base.options.sliderType=='slider'){base.nextSlide=function(direction){if(direction!==false){direction=true;}
if(direction==true&&!base.$el.is(':animated')){if(base.$el.position().left>(base.$stopPosition-1)*-1){if(base.options.createPagination){base.$sliderControls.find('a.current').removeClass('current').next().addClass('current');}
base.$el.animate({left:"-="+base.$slideWidth+"px"},base.options.speed,base.options.sliderEasing);}else{if(base.options.createPagination){base.$sliderControls.find('a:last').removeClass('current').siblings('a:first').addClass('current');}
base.$el.animate({left:0},base.options.speed,base.options.sliderEasing);}}else if(direction==false&&!base.$el.is(':animated')){if(base.$el.position().left<0&&!base.$slides.is(':animated')){if(base.options.createPagination){base.$sliderControls.find('a.current').removeClass('current').prev().addClass('current');}
base.$el.animate({left:"+="+base.$slideWidth+"px"},base.options.speed,base.options.sliderEasing);}else{if(base.options.createPagination){base.$sliderControls.find('a:first').removeClass('current').siblings('a:last').addClass('current');}
base.$el.animate({left:"-="+base.$stopPosition+"px"},base.options.speed,base.options.sliderEasing);}}
if(base.options.autoPlay){base.clearTimer();base.beginTimer();}}}else{base.nextSlide=function(direction){if(direction!==false){direction=true;}
if(direction==true&&!base.$slides.is(':animated')){if(base.$el.children(':last').is('.current')){if(base.options.createPagination){base.$sliderControls.find('a:last').removeClass('current').siblings('a:first').addClass('current');}
base.$el.children('.current').removeClass('current').css('zIndex',60).siblings().css('zIndex',50);base.$el.children(':first').css('zIndex',100).addClass('current').fadeIn(base.options.speed,function(){base.$slides.not('.current').hide();});}else{if(base.options.createPagination){base.$sliderControls.find('a.current').removeClass('current').next().addClass('current');}
base.$el.children('.current').removeClass('current').css('zIndex',60).siblings().css('zIndex',50).end().next().css('zIndex',100).addClass('current').fadeIn(base.options.speed,function(){base.$slides.not('.current').hide();});}}else if(direction==false&&!base.$slides.is(':animated')){if(base.$el.children(':first').is('.current')){if(base.options.createPagination){base.$sliderControls.find('a:first').removeClass('current').siblings('a:last').addClass('current');}
base.$el.children('.current').removeClass('current').css('zIndex',60).siblings().css('zIndex',50);base.$el.children(':last').css('zIndex',100).addClass('current').fadeIn(base.options.speed,function(){base.$slides.not('.current').hide();});}else if(!base.$slides.is(':animated')){if(base.options.createPagination){base.$sliderControls.find('a.current').removeClass('current').prev().addClass('current');}
base.$el.children('.current').removeClass('current').siblings().css('zIndex',50).end().css('zIndex',60).prev().css('zIndex',100).addClass('current').fadeIn(base.options.speed,function(){base.$slides.not('.current').hide();});}}
if(base.options.autoPlay){base.clearTimer();base.beginTimer();}}}
if(base.options.autoPlay){base.clearTimer=function(){if(base.timer){window.clearInterval(base.timer);}}
base.beginTimer=function(){base.timer=window.setInterval(function(){base.nextSlide();},base.options.displayTime);}
base.beginTimer();if(base.options.pauseOnHover){base.$el.hover(function(){base.clearTimer();},function(){base.beginTimer();});}}
if(base.options.createArrows){base.$el.before('<a class="arrow prev" href="#">prev</a><a class="arrow next" href="#">next</a>').siblings('.next').click(function(){base.nextSlide();return false;});base.$el.siblings('.prev').click(function(){base.nextSlide(false);return false;});}
if(base.options.keyboardNavigation){base.$el.click(function(){$('.activePlusSlider').removeClass('activePlusSlider');$(this).addClass('activePlusSlider');});$(window).keyup(function(e){if(base.$el.is('.activePlusSlider')){if(e.keyCode==39){base.nextSlide();}else if(e.keyCode==37){base.nextSlide(false);}}});}};base.init();};$.plusSlider.defaults={createArrows:true,createPagination:true,paginationBefore:false,paginationWidth:true,displayTime:4000,speed:500,autoPlay:true,keyboardNavigation:true,pauseOnHover:true,sliderEasing:'linear',sliderType:'slider',width:false,height:false};$.fn.plusSlider=function(options){return this.each(function(){(new $.plusSlider(this,options));});};})(jQuery);
