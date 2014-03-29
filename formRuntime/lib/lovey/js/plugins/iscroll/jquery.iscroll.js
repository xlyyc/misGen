var myScroll,
        pullDownEl, pullDownOffset,
        generatedCount = 0;
(function($) {
    $.fn.iScroll = function() {
        initScroll(this);
        setTimeout(loaded(pullDownAction), 200);
    };

    function initScroll(obj) {
        $(obj).wrap("<div id=\"wrapper\" class=\"LM-wrapper\"><\/div>");
        $(obj).wrap("<div id=\"scroller\" class=\"LM-scroller\"><\/div>");
        $(obj).before("<div id=\"pullDown\"><span class=\"pullDownIcon\"><\/span><span class=\"pullDownLabel\">下拉刷新...<\/span></div>");
        $(obj).after($("#pullUp"));
    }

    function loaded(pullDownAction) {
        pullDownEl = document.getElementById('pullDown');
        pullDownOffset = pullDownEl.offsetHeight;
        myScroll = new iScroll('wrapper',
        {
            useTransition: true,
            topOffset: pullDownOffset,
            onRefresh: function () {
                if (pullDownEl.className.match('loading')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                }
            },
            onScrollMove: function () {
                if (this.y > 5 && !pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'flip';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放刷新...';
                    this.minScrollY = 0;
                }
                else if (this.y < 5 && pullDownEl.className.match('flip')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                    this.minScrollY = -pullDownOffset;
                }
            },
            onScrollEnd: function () {
                if (pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'loading';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '记载中...';
                    if (pullDownAction) {
                        setTimeout(pullDownAction(), 200);
                    }
                }
            }
        });
    }

})(jQuery);

