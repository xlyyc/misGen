(function ($) {
    $.fn.extend({
        flashImgPlay:function (options) {
            return this.each(function () {
                var defaults = $.extend({
                    width:400,
                    height:250,
                    btn_pos:3,
                    stop_time:3000,
                    show_text:1,
                    txtcolor:'000000',
                    bgcolor:'dddddd',
                    flash_src:'focus.swf'
                }, options);

                var images = {
                    imgs:[],
                    links:[],
                    texts:[]
                };

                $('a', this).each(function () {
                    images.imgs.push($('img', this).attr('src'));
                    images.links.push($(this).attr('href'));
                    images.texts.push($('img', this).attr('alt'));
                });

                var swf_height = (defaults.show_text == 1) ? (defaults.height + 20) : defaults.height,
                        pics = '', links = '', texts = '';

                for (var i = 0, length = images.imgs.length; i < length; i++) {
                    pics += '|' + images.imgs[i];
                    links += '|' + images.links[i];
                    texts += '|' + images.texts[i];
                }
                ;

                pics = pics.substring(1),
                        links = links.substring(1),
                        texts = texts.substring(1);

                $(this).html(
                        '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cabversion=6,0,0,0" width="' + defaults.width + '" height="' + swf_height + '">' +
                                '<param name="movie" value="' + defaults.flash_src + '">' +
                                '<param name="quality" value="high"><param name="wmode" value="opaque">' +
                                '<param name="FlashVars" value="pics=' + pics + '&links=' + links + '&texts=' + texts + '&pic_width=' + defaults.width + '&pic_height=' + defaults.height + '&show_text=' + defaults.show_text + '&txtcolor=' + defaults.txtcolor + '&bgcolor=' + defaults.bgcolor + '&button_pos=' + defaults.btn_pos + '&stop_time=' + defaults.stop_time + '">' +
                                '<embed src="' + defaults.flash_src + '" FlashVars="pics=' + pics + '&links=' + links + '&texts=' + texts + '&pic_width=' + defaults.width + '&pic_height=' + defaults.height + '&show_text=' + defaults.show_text + '&txtcolor=' + defaults.txtcolor + '&bgcolor=' + defaults.bgcolor + '&button_pos=' + defaults.btn_pos + '&stop_time=' + defaults.stop_time + '" quality="high" width="' + defaults.width + '" height="' + swf_height + '" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />' +
                                '</object>'
                );
            });
        }
    });
})(jQuery);