/**
 * 容器不滚动组件
 *
 * Author xiangxu＠wisedu.com
 * history:
 *
 */
(function($){
    $.boxfix = {
        defaults: {
            fix_position: "top" //固定方向,可以传四个值，top.left .self-adaption，默认为top
        }
    };
    $.fn.boxfix = function(options) {

        // merge per-call options with defaults
        options = $.extend(true, {}, $.boxfix.defaults, options || {});
        var box_id = $(this).attr("id");
        var topfix = function(element) {
            //var top           = element.position().top;
            var top           = document.getElementById(box_id).getBoundingClientRect().top;
            var pos           = element.css("position");
            //var left            = element.position().left;
            var left            = document.getElementById(box_id).getBoundingClientRect().left;
            //var bottom            = $(document).height() - element.position().top -$(element).height();
            var bottom            = document.getElementById(box_id).getBoundingClientRect().bottom;
//            alert($(element).height());
//            alert(pos);
            var isIe6 = !window.XMLHttpRequest;
            var html = $("html");
            if( isIe6  ) {
                html.css({'backgroundAttachment':'fixed','backgroundImage':'url(about:blank)'});
            }
            $(this).scroll(function() {
                var scrolls     = $(this).scrollLeft();
                var scrolls_v  = $(this).scrollTop();
                switch (options.fix_position){
                    case 'top':
                        if ( scrolls_v > top) {
                            if (window.XMLHttpRequest) {
                                element.css({
                                    position: "fixed",
                                    top: 0
                                });
                            } else {
                                element.css({
                                    position: "absolute",
                                    top:scrolls_v
                                });
                            }
                        }else {
                            element.css({
                                position: pos,
                                top: top
                            });
                        }
                        break;
                    case 'left':
                        if ( scrolls > left) {
                            if (window.XMLHttpRequest) {
                                element.css({
                                    position: "fixed",
                                    left: 0
                                });
                            } else {
                                element.css({
                                    position: "absolute",
                                    left: scrolls
                                });
                            }
                        }else {
                            element.css({
                                position: pos,
                                left: left
                            });
                        }
                        break;
                    case 'self-adaption':
                        var scrolls_b = $(window).height();
                        //alert(scrolls_b+"========"+top);
                        if ( scrolls > left || scrolls_v > top || scrolls_b < top  ) {
                            if (window.XMLHttpRequest) {
                                element.css({
                                    position: "fixed",
                                    left: 0,
                                    bottom:0
                                });
                            } else {
                                element.css({
                                    position: "absolute",
                                    left: scrolls,
                                    bottom:0
                                });
                            }
                        }else {
                            element.css({
                                position: pos,
                                left: left,
                                bottom:bottom
                            });
                        }
                        break;
                }

            });
        };
        return $(this).each(function() {
            topfix($(this));
        });
    };
})
 (jQuery);
