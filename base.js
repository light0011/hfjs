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
                        childElements = [];
                        for (var j = 0; j < node.length; j++) {
                            var temps = this.getClass(elements[i].substring(1),node[j]);
                            for (var k = 0; k < temps.length; k++) {
                                childElements.push(temps[i]);
                            };
                        };

                        node = childElements;
                        break;

                    default :
                        childElements = [];
                        for (var j = 0; j < node.length; j++) {
                            var temps = this.getTagName(elements[i].substring(1),node[j]);
                            for (var k = 0; k < temps.length; k++) {
                                childElements.push(temps[i]);
                            };
                        };

                        node = childElements;
                        break;
                }

                this.elements = childElements;


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
        
    }

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

    return temps;

}












