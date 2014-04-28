/*
 **	Anderson Ferminiano
 **	contato@andersonferminiano.com -- feel free to contact me for bugs or new implementations.
 **	jQuery ScrollPagination
 **	28th/March/2011
 **	http://andersonferminiano.com/jqueryscrollpagination/
 **	You may use this script for free, but keep my credits.
 **	Thank you.
 */

(function($) {


    $.fn.scrollPagination = function(options) {

        var opts = $.extend($.fn.scrollPagination.defaults, options);
        var target = opts.scrollTarget;
        if (target == null) {
            target = obj;
        }
        opts.scrollTarget = target;

        return this.each(function() {
            $.fn.scrollPagination.init($(this), opts);
        });

    };

    $.fn.stopScrollPagination = function() {
        return this.each(function() {
            $(this).attr('scrollPagination', 'disabled');
        });

    };

    $.fn.scrollPagination.loadContent = function(obj, opts) {
        var target = opts.scrollTarget;
        var mayLoadContent = $(target).scrollTop() + opts.heightOffset >= $(document).height() - $(target).height();
        if (mayLoadContent) {
            if (opts.beforeLoad != null) {
                opts.beforeLoad();
            }
            //对外部参数不处理临时解决
            var start = $("#start");
            if (start) {
                opts.contentData.start = start.val();
            }
            $(obj).children().attr('rel', 'loaded');
            $.ajax({
                type: 'POST',
                url: opts.contentPage,
                data: opts.contentData,
                success: function(data) {
                    $(obj).append(data);
                    var objectsRendered = $(obj).children('[rel!=loaded]');
                    if (opts.afterLoad != null) {
                        opts.afterLoad(objectsRendered);
                    }
                },
                dataType: 'html'
            });
        }

    };

    $.fn.scrollPagination.init = function(obj, opts) {
        var target = opts.scrollTarget;
        $(obj).attr('scrollPagination', 'enabled');
        var resizeTimer = null;

        $(target).scroll(function(event) {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if ($(obj).attr('scrollPagination') == 'enabled') {
                    $.fn.scrollPagination.loadContent(obj, opts);
                }
                else {
                    event.stopPropagation();
                }
            }, 500);
        });

        $.fn.scrollPagination.loadContent(obj, opts);

    };

    $.fn.scrollPagination.defaults = {
        'contentPage' : null,
        'contentData' : {},
        'beforeLoad': null,
        'afterLoad': null    ,
        'scrollTarget': null,
        'heightOffset': 0
    };
})(jQuery);