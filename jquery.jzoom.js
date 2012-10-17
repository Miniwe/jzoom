!function ($) {
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