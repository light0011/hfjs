

$(function () {

    
    //个人中心
    $('#header .member').hover(function () {
        $(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
        $('#header .member_ul').show().animate({
            t : 30,
            step : 10,
            mul : {
                o : 100,
                h : 120
            }
        });
    }, function () {
        $(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
        $('#header .member_ul').animate({
            t : 30,
            step : 10,
            mul : {
                o : 0,
                h : 0
            },
            fn : function(){
                $("#header .member_ul").hide();
            }
        });
    });
    
    //登录框
    var login = $('#login');
    var screen = $('#screen');
    login.center(350, 250).resize(function () {
        if (login.css('display') == 'block') {
            screen.lock();
        }
    });
    $('#header .login').click(function () {
        login.center(350, 250).css('display', 'block');
        screen.lock().animate({
            attr : 'o',
            target : 30,
            t : 30,
            step : 10
        });
    });
    $('#login .close').click(function () {
        login.css('display', 'none');
        screen.animate({
            attr : 'o',
            target : 0,
            t : 30,
            step : 10,
            fn : function(){
                screen.unlock();
            }
        });
    });

    //滑动导航
    $('#nav .about li').hover(function () {
        var target = $(this).first().offsetLeft;
        $('#nav .nav_bg').animate({
            attr : 'x',
            target : target + 20,
            t : 30,
            step : 10,
            fn : function () {
                $('#nav .white').animate({
                    attr : 'x',
                    target : -target
                });
            }
        });
    }, function () {
        $('#nav .nav_bg').animate({
            attr : 'x',
            target : 20,
            t : 30,
            step : 10,
            fn : function () {
                $('#nav .white').animate({
                    attr : 'x',
                    target : 0
                });
            }
        });
    });
    
  
    //拖拽
    login.drag($('#login h2').last());


    //左侧菜单
  
    $('#sidebar h2').toggle(function () {
        $(this).next().animate({
            mul : {
                h : 0,
                o : 0
            }
        });
    }, function () {
        $(this).next().animate({
            mul : {
                h : 150,
                o : 100
            }
        });
    });



    //百度分享初始化位置
    $('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');
    

    addEvent(window, 'scroll', function () {
        $('#share').animate({
            attr : 'y',
            target : getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2
        });
    });
    
    //百度分享收缩效果
    $('#share').hover(function () {
        $(this).animate({
            attr : 'x',
            target : 0
        });
    }, function () {
        $(this).animate({
            attr : 'x',
            target : -211
        });
    });

    //轮播器初始化
    $('#banner img').opacity(0);
    $('#banner img').eq(0).opacity(100);
    $('#banner ul li').eq(0).css('color','#333');
    $('#banner strong').html($('#banner img').eq(0).attr('alt'));


    //轮播器计数器
    var banner_index = 1;

    //轮播器的种类,1表示透明度，2表示上下滚动
    var banner_type = 1;

    //自动轮播器
    var banner_timer = setInterval(banner_fn,3000);


    //手动播放器
    $('#banner ul li').hover(function(){
        clearInterval(banner_timer);
        if ($(this).css('color') != 'rgb(51,51,51)' && $(this).css('color') != '#333') {
            banner(this,banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
        };
    },function(){
        banner_index = $(this).index() + 1;
        banner_timer = setInterval(banner_fn,3000);
    })


    function banner_fn(){

        if (banner_index >= $('#banner ul li').length()) {
            banner_index = 0;
        };

        banner($('#banner ul li').eq(banner_index).first(),banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
        banner_index++;

    }

    function banner(obj,prev){
        console.log(obj);
        $('#banner ul li').css('color','#999');
        $(obj).css('color','#333');
        $('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));

        if (banner_type == 1) {
            $('#banner img').eq(prev).css('zIndex',1).animate({
                attr : 'o',
                target : 0,
                t : 30,
                step : 10
            });

            $('#banner img').eq($(obj).index()).css('zIndex',2).animate({
                attr : 'o',
                target : 100,
                t : 30,
                step : 10
            })
        } else if (banner_type == 2) {
            $('#banner img').eq(prev).css('zIndex',1).opacity(100).animate({
                attr : 'y',
                target : 150,
                t : 30,
                step : 10
            });
            $('#banner img').eq($(obj).index()).css('top','-150px').css('zIndex',2).opacity(100).animate({
                attr : 'y',
                target : 0,
                t : 30,
                step : 10
            })
        };
    }


    //延迟加载
    var wait_load = $('.wait_load');
    wait_load.opacity(0);

    $(window).bind('scroll',function(){
        setTimeout(function(){
            for(var i = 0;i < wait_load.length();i++){
                var _this = wait_load.ge(i);
                if (getInner().height + getScroll().top >= offsetTop(_this)) {
                    $(_this).attr('src', $(_this).attr('xsrc')).animate({
                        attr : 'o',
                        target : 100,
                        t : 30,
                        step : 10
                    });
                };

            }

        },100)
    })



});















