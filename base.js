//前台调用
var $= function(args){
    return new Base(args);
}

//基础库
function Base(args){
    //创建一个数组，用来保存获取到的节点
    this.elements = [];

    if (typeof args == 'string') {
        //模拟css
        if(args.indexOf(' ') != -1){
            //把结点拆开放到数组里面
            var elements = args.split(' ');
            //存放临时节点对象的数组，解决被覆盖的问题
            var tempElements = [];
            //用来存放父节点用的
            var node = [];

            for (var i = 0; i < elements.length; i++) {
                //第一次没有父节点，所以把document放入
                if(node.length == 0) node.push(document);
                switch (elements[i].charAt(0)){
                    case '#' :
                        //清理临时节点,以便存储新的临时节点
                        tempElements = [];
                        tempElements.push(this.getId(elements[i].substring(1)));
                        //保存在父节点，在下次循环中使用
                        node = tempElements;
                        break;

                    case '.' :
                        tempElements = [];
                        for (var j = 0; j < node.length; j++) {

                            var temps = this.getClass(elements[i].substring(1),node[j]);
                            for (var k = 0; k < temps.length; k++) {
                                tempElements.push(temps[k]);
                            };
                        };

                        node = tempElements;
                        break;

                    default :
                        tempElements = [];

                        for (var j = 0; j < node.length; j++) {
                            var temps = this.getTagName(elements[i],node[j]);

                            for (var k = 0; k < temps.length; k++) {
                                tempElements.push(temps[k]);
                            };
                        };


                        node = tempElements;
                      
                }

                this.elements = tempElements;


            };

        } else {
            //find模拟
            switch (args.charAt(0)){
                case '#' :
                    this.elements.push(this.getId(args.substring(1)));
                    break;
                case '.' :
                    this.elements = this.getClass(args.substring(1));
                    break;
                default :
                    this.elements = this.getTagName(args);
            }
        }

    } else if (typeof args == 'object'){
        //用于$(this)
        if (args != undefined) {
            this.elements[0] = args;
        };
    } else if (typeof args == 'function'){
        this.ready(args);
    }

}


//addDomLoaded
Base.prototype.ready = function(fn){
    addDomLoaded(fn);
}

//获取ID节点
Base.prototype.getId = function(id){
    return document.getElementById(id);
}



//利用CLASS获取节点
Base.prototype.getClass = function(className,parentNode){
    var node = null;
    var temps = [];

    if (parentNode != undefined) {
        node = parentNode;
    } else {
        node = document;
    }

    var all = node.getElementsByTagName('*');

    for (var i = 0; i < all.length; i++) {
        if (all[i].className == className) {
            temps.push(all[i]);
        };
    };

    return temps;

}

//获取元素节点数组
Base.prototype.getTagName = function(tag,parentNode){
    var node = null;
    var temps = [];

    if (parentNode != undefined) {
        node = parentNode;
    } else {
        node = document;
    }

    temps = node.getElementsByTagName(tag);

    console.log(tag);

    return temps;

}


//设置CSS选择器子节点
Base.prototype.find = function(str){
    var tempElements = [];
    for (var i = 0; i < this.elements.length; i++) {
        
        switch(str.charAt(0)){
            case '#' :
                tempElements.push(this.getId(str.substring(1)));
                break;
            case '.' :
                var temps = this.getClass(str.substring(1),this.elements[i]);
                for (var j = 0; j < temps.length; j++) {
                    tempElements.push(temps[j]);
                };
                break;
            default :
                var temps = this.getTagName(str,this.elements[i]);
                for (var j = 0; j < temps.length; j++) {
                    tempElements.push(temps[j]);
                };
        }
    };
    
    this.elements = tempElements;
    return this;
}


//获取某一个节点，并返回这个节点对象
Base.prototype.ge = function(num){
    return this.elements[num];
}


//获取首个节点，并返回这个节点对象
Base.prototype.first = function(){
    return this.elements[0];
}

//获取末个节点，并返回这个节点对象
Base.prototype.last = function(){
    return this.elements[this.elements.length - 1];
}

//获取某一个节点，并且Base对象
Base.prototype.eq = function(num){
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
}


//设置CSS
Base.prototype.css = function(attr,value){
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 1) {
            return getStyle(this.elements[i],attr);
        };
        this.elements[i].style[attr] = value;
    };
    return this;
}

//添加Class
Base.prototype.addClass = function(className){
    for (var i = 0; i < this.elements.length; i++) {
        if (!hasClass(this.elements[i],className)) {
            this.elements[i].className += ' ' + className;
        };   
    };
    return this;
}

//移除Class
Base.prototype.removeClass = function(className){
    for (var i = 0; i < this.elements.length; i++) {
        if (hasClass(this.elements[i],className)) {
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'),' ');
        };
    };
    return this;
}


//设置innerHTML

Base.prototype.html = function(str){
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 0) {
            return this.elements[i].innerHTML;
        };
        this.elements[i].innerHTML = str;
    };
    return this;
}

//设置鼠标移入移除方法
Base.prototype.hover = function(over,out){
    for (var i = 0; i < this.elements.length; i++) {
        addEvent(this.elements[i],'mouseover',over);
        addEvent(this.elements[i],'mouseout',out);
    };
    return this;
}


//设置显示
Base.prototype.show = function(){
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'block';
    };
    return this;
}


//设置隐藏
Base.prototype.hide = function(){
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none';
    };
    return this;
}


//设置物体居中
Base.prototype.center = function(width,height){
    var top = (getInner().height - height) / 2;
    var left = (getInner().width - width) / 2;
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.top = top + 'px';
        this.elements[i].style.left = left + 'px';
    };
    return this;
}

//锁屏功能
Base.prototype.lock = function(){
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.width = getInner().width + 'px';
        this.elements[i].style.height = getInner().height + 'px';
        this.elements[i].style.display = 'block';
        //Document.documentElement 是一个只读属性，返回文档对象（document）的根元素（例如，HTML文档的 <html> 元素）。
        document.documentElement.style.overflow = 'hidden';
        scrollTop();
        addEvent(window,'scroll',scrollTop);
    };
    return this;
}


//解屏功能
Base.prototype.unlock = function(){
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none';
        document.documentElement.style.overflow = 'auto';
        removeEvent(window,'scroll',scrollTop);
    };
    return this;
}

//触发点击事件
Base.prototype.click = function(fn){
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onclick = fn;
    };
    return this;
}


//触发浏览器窗口事件
Base.prototype.resize = function(fn){
    for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        addEvent(window,'resize',function(){
            fn();
            if (element.offsetLeft > getInner().width - element.offsetWidth) {
                element.style.left = getInner().width - element.offsetWidth + 'px';
            };

            if (element.offsetTop > getInner().height - element.offsetHeight) {
                element.style.top = getInner().height - element.offsetHeight + 'px';
            }
        })
    };
    return this;
}



//设置动画
Base.prototype.animate = function(obj){
    for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
         
        var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' : obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' : obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';

        var start = obj['start'] != undefined ? obj['start'] : attr == 'opacity' ? parseFloat(getStyle(element,attr)) * 100 : parseInt(getStyle(element,attr));

        //默认1毫秒执行一次
        var t = obj['t'] != undefined ? obj['t'] : 10;

        var alter = obj['alter'];
        var target = obj['target'];
        var mul = obj['mul'];

         //默认缓冲速度为6
        var speed = obj['speed'] != undefined ? obj['speed'] : 6;

         //可选，0表示匀速，1表示缓冲，默认缓冲
        var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';

         if (alter != undefined && target == undefined) {
            target = alter + start;
         } else if (alter == undefined && target == undefined && mul == undefined) {
            throw new Error('alter增量或target目标量必须传一个！');
         };


         if (start > target) step = -step;

         if (attr == 'opacity') {
            element.style.opacity = parseInt(start) / 100;
            element.style.filter = 'alpha(opacity='+parseInt(start) + ')';
         } else {
            element.style[attr] = start + 'px';
         }


         if (mul == undefined) {
            mul = {};
            mul[attr] = target;
         };

        clearInterval(element.timer);

        element.timer = setInterval(function(){
            //创建一个布尔值，用来确定动画是否执行完毕
            var flag = true;

            for(var i in mul){
                attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';

                target = mul[i];

                if (type == 'buffer') {
                    step = attr == 'opacity' ? (target - parseFloat(getStyle(element,attr)) * 100) / speed : (target - parseInt(getStyle(element,attr))) / speed;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                };


                if (attr == 'opacity') {
                    if (step == 0) {
                        setOpacity();
                    } else if(step > 0 && Math.abs(parseFloat(getStyle(element,attr)) * 100 - target) <= step){
                        setOpacity();
                    } else if(step < 0 && (parseFloat(getStyle(element,attr)) * 100 - target) <= Math.abs(step)){
                        setOpacity();
                    } else {
                        var temp = parseFloat(getStyle(element,attr)) * 100;
                        element.style.opacity = parseInt(temp + step) / 100;
                        element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
                    }

                    if (parseInt(target) != parseInt(parseFloat(getStyle(element,attr)) * 100)) {
                        flag = false;
                    };


                } else {

                    if (step == 0) {
                        setTarget();
                    } else if(step > 0 && Math.abs(parseInt(getStyle(element,attr)) - target) <= step){
                        setTarget();
                    } else if(step < 0 && (parseInt(getStyle(element,attr)) - target) <= Math.abs(step)){
                        setTarget();
                    } else {
                        element.style[attr] = parseInt(getStyle(element,attr)) + step + 'px';
                    }

                    if (parseInt(target) != parseInt(getStyle(element,attr))) {
                        flag = false;
                    };

                }
            }

            if (flag) {
                clearInterval(element.timer);
                if (obj.fn != undefined) obj.fn();
            };

        },t);
        
        function setTarget(){
            element.style[attr] = target + 'px';
        }

        function setOpacity(){
            element.style.opacity = parseInt(target) / 100;

            element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';

        }



    };

    return this;
}




//插件入口
Base.prototype.extend = function(name,fn){
    Base.prototype[name] = fn;
}














