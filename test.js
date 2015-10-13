var wait_load = $('.wait_load');
    wait_load.opacity(0);
    $(window).bind('scroll', function () {
        setTimeout(function () {
            for (var i = 0; i < wait_load.length(); i ++) {
                var _this = wait_load.ge(i);
                if (getInner().height + getScroll().top >= offsetTop(_this)) {
                    $(_this).attr('src', $(_this).attr('xsrc')).animate({
                        attr : 'o',
                        target : 100,
                        t : 30,
                        step : 10
                    });
                }
            }
        }, 100);
    });