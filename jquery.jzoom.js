/*
 *  Project: Kupikupon
 *  Description: Zooming Loyalty Gifts Images
 *  Author: Miniwe
 *  License: 
 */

  ;(function ( $, window, undefined ) {


    var css = {
      "position": "absolute",
      "z-index": "2000",
      "border": "1px solid #ccc",
      "background-color": "#fff",
      "overflow": "hidden",
      "border-radius": "12px",
      "box-shadow": "0 0 12px  #999",
      "display": "none"
    };

    // Create the defaults once
    var pluginName = 'jZoom',
        document = window.document,
        defaults = {
          viewport: null
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
      this.element = element;

      // jQuery has an extend method which merges the contents of two or 
      // more objects, storing the result in the first object. The first object
      // is generally empty as we don't want to alter the default options for
      // future instances of the plugin
      this.options = $.extend( {}, defaults, options) ;

      this._defaults = defaults;
      this._name = pluginName;

      this.init();
    }

    Plugin.prototype.init = function () {
      $(this.element).hover(this.show, this.hide);
      $(this.element).mousemove(this.scrollbig);

    };

    function isCreated () {
      return true;
    };

    Plugin.prototype.show = function () {
      console.log('show');
      return false;
      if ( !this.isCreated() ) {
        create();
      }
      
      imgEl
        .appendTo(el);
      el.fadeIn( function(){
        el.css("opacity", 1)
        imgEl
        .animate(
          {
            width: baseImgEl.width() * 10 + "px",
            height: baseImgEl.height() * 10 + "px"
          }
        );
      })
    };

    Plugin.prototype.hide = function () {
      console.log('hide');
      return false;
      el.fadeOut(function(){
        el.css("opacity", 0)
        // this.destroy();
      })
    };

    function destroy () {
      $(".viewport *").remove();
      $(".viewport").remove();
    };

    function create () {
      b.width = $(".stage.details .right").outerWidth() - 10 + "px";
      b.height = $(".stage.details").outerHeight() - 10 + "px";
      b.left = $(".stage.details .right").offset().left + "px";
      b.top = $(".stage.details .right").offset().top + "px";

      destroy();
      el.appendTo("body").css(css).css(b);
    };  

    Plugin.prototype.scrollbig = function ( e ) {
      console.log('scroll');
      return false; 
      var border = 10,
          xS = imgEl.width()  / baseImgEl.width() * e.offsetX, 
          yS = imgEl.height()  / baseImgEl.height() * e.offsetY;
      
      xS = e.offsetX < border ? 0 : e.offsetX > baseImgEl.width() - border ? imgEl.width() : xS;
      yS = e.offsetY < border ? 0 : e.offsetY > baseImgEl.height() - border ? imgEl.height() : yS;

      el.scrollLeft(xS);
      el.scrollTop(yS);
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
        }
      });
    }

  }(jQuery, window));

  $(".stage.details .primary_img img").jZoom();

// ============================================================================
!function ($) {
 
  var Viewport = function ( baseImg ) {
    var
      baseImgEl = baseImg,
      imgPath = baseImg,
      el = $("<div class='viewport'></div>"),
      imgEl = $('<img src="' + baseImgEl.attr("src") + '" alt="" />'),
      b = {
        left: 0,  
        top: 0,  
        width: 0,  
        height: 0  
      },
      bImg = {
        left: 0,  
        top: 0,  
        width: 0,  
        height: 0  
      },
      init = function () {
        baseImgEl.hover(show, hide);
        baseImgEl.mousemove(scrollbig);
      },
      scrollbig = function ( e ) {
        
        var border = 10,
            xS = imgEl.width()  / baseImgEl.width() * e.offsetX, 
            yS = imgEl.height()  / baseImgEl.height() * e.offsetY;
        
        xS = e.offsetX < border ? 0 : e.offsetX > baseImgEl.width() - border ? imgEl.width() : xS;
        yS = e.offsetY < border ? 0 : e.offsetY > baseImgEl.height() - border ? imgEl.height() : yS;

        el.scrollLeft(xS);
        el.scrollTop(yS);
      },
      show = function () {
        create();
        imgEl
          .appendTo(el);
        el.fadeIn( function(){
          el.css("opacity", 1)
          imgEl
          .animate(
            {
              width: baseImgEl.width() * 10 + "px",
              height: baseImgEl.height() * 10 + "px"
            }
          );
        })
      },
      hide = function () {
        el.fadeOut(function(){
          el.css("opacity", 0)
          destroy();
        })
      },
      destroy = function () {
        $(".viewport *").remove();
        $(".viewport").remove();
      },
      create = function () {
        b.width = $(".stage.details .right").outerWidth() - 10 + "px";
        b.height = $(".stage.details").outerHeight() - 10 + "px";
        b.left = $(".stage.details .right").offset().left + "px";
        b.top = $(".stage.details .right").offset().top + "px";

        destroy();
        el.appendTo("body").css(css).css(b);
      };

      init();

      return this;
  };

  var viewport = new Viewport( $(".stage.details .primary_img img") );

}(window.jQuery);