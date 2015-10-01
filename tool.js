//浏览器检测
(function () {
    window.sys = {};
    var ua = navigator.userAgent.toLowerCase(); 
    var s;      
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : 
    (s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] : 
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
    
    if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
})();


//DOM加载
function addDomLoaded(fn){
    var isReady = false;
    var timer = null;

    function doReady(){
        if (timer) clearInterval(timer);
        if(isReady) return;
        isReady = true;
        fn();
    }

    //兼容不同浏览器
    //现在几乎没有这种浏览器了呢
    if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)) {
        timer = setInterval(function(){
            if (document && document.getElementById && document.getElementsByTagName && document.body) {
                doReady();
            };
        },1);
    } else if(document.addEventListener){  //W3C,页面文档完全加载并解析完毕之后,会触发DOMContentLoaded事件
        addEvent(document,'DOMContentLoaded',function(){
            fn();
            //callee 是 arguments 对象的属性。在该函数的函数体内，它可以指向当前正在执行的函数。当函数是匿名函数时，这是很有用的。
            removeEvent(document,'DOMContentLoaded',arguments.callee);

            
        })
    } else if(sys.ie && sys.ie < 9){
        var timer = null;
        timer = setInterval(function(){
            try{
                //IE9以下判断文档是否加载完毕的方法
                document.documentElement.doScroll('left');
                doReady();
            } catch (e){};
        },1);
    }
}


//跨浏览器添加事件绑定
function addEvent(obj,type,fn){
    //  W3C
    if (typeof obj.addEventListener != 'undefined') {
        obj.addEventListener(type,fn,false);
    } else {
        //创建一个存放事件的hash表
        if(!obj.events) obj.events = {};
        //第一次执行
        if(!obj.events[type]){
            //创建一个存放事件处理函数的数组
            obj.events[type] = [];
        } else {
            //对同一个注册函数进行屏蔽
            if(addEvent.equal(obj.events[type],fn)) return false;
        }

        //存储事件
        obj.events[type][addEvent.ID++] = fn;

        obj['on'+type] = addEvent.exec;

    }
    
}


//为事件分配计数器
addEvent.ID = 0;


//执行事件处理函数
addEvent.exec = function(event){
    var e = event || addEvent.fixEvent(window.event);
}


//同一个注册函数进行屏蔽
addEvent.equal = function(es,fn){
    for(var i in es){
        if (es[i] == fn) return true;
    }
    return false;
}


//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function(event){
    event.preventDefault = addEvent.fixEvent.preventDefault;
    event.stopPropagation = addEvent.fixEvent.stopPropagation;
    event.target = event.srcElement;
    return event;

}

//IE阻止默认行为
addEvent.fixEvent.preventDefault = function(){
    this.returnValue = false;
}


//IE取消冒泡
addEvent.fixEvent.stopPropagation = function(){
    this.cancelBubble = true;
}


//跨浏览器删除事件
function removeEvent(obj,type,fn){
    if (typeof obj.removeEventListener != 'undefined') {
        obj.removeEventListener(type,fn,false);
    } else {
        if (obj.events) {
            for(var i in obj.events[type]){
                if (obj.events[type][i] == fn) {
                    delete obj.events[type][i];
                };
            }
        };
    }
}


//跨浏览器获取视口大小
function getInner(){

    if (typeof window.innerWidth != 'undefined') {
        //对于Internet Explorer、Chrome、Firefox、Opera 以及 Safari：
        return {
            width : window.innerWidth,
            height : window.innerHeight
        }
    } else {
        //对于 Internet Explorer 8、7、6、5：
        return {
            width : document.documentElement.clientWidth,
            height : document.documentElement.clientHeight
        }
    }

}


//判断class是否存在
function hasClass(element,className){
    return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

//删除左右空格
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g,'');
}


//滚动条清零
//页面具有 DTD，或者说指定了 DOCTYPE 时，使用 document.documentElement。

//页面不具有 DTD，或者说没有指定了 DOCTYPE，时，使用 document.body。

//在 IE 和 Firefox 中均是如此。
function scrollTop(){
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}


//设置CSS
function getStyle(element,attr){
    //W3C
    if (typeof window.getComputedStyle != 'undefined') {
        return window.getComputedStyle(element,null)[attr];
    } else if(typeof element.currentStyle != 'undefined'){
        //IE
        return element.currentStyle[attr];
    }
}




