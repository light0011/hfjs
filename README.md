# hfjs
一个微型的js框架

base.js---基础函数库

tool.js----常用函数库

加载顺序为

tool.js   base.js   

最后为插件js文件


特点介绍：

支持连贯操作，用法与jquery一致。

对大部分浏览器进行了兼容性处理。

支持插件扩展开发。



使用举例（具体使用方法请参照blog文件夹内容）：


获取ID节点

$('#idName')

获取class节点

$('.className')


获取元素节点

$('tagName')


获取元素子节点(className只是举例，tagName，IDName等亦可。下同)

$('.className').find('tagName')

获取某一个节点，并返回这个节点对象

$('.className').ge(num);


获取首个节点，并返回这个节点对象

$('.className').first();


获取末个节点，并返回这个节点对象

$('.className').last();

获取某一个节点，并且Base对象

$('.className').eq(num);


设置或者获取css,参数个数为1为获取，为2为设置

$('.className').css(attr,value);

添加class

$('.className').addClass('className');

移除class

$('.className').removeClass('className');


设置或者获取innerHTML

$('.className').html(str);


鼠标移入移除方法

$('.className').hover(over,out);

设置显示

$('.className').show();

设置隐藏

$('.className').hide();


设置居中

$('.className').center(width,height);

锁屏功能

$('.className').lock();

解屏功能

$('.className').unlock();

点击事件

$('.className').click(fn);

浏览器窗口事件

$('.className').resize(fn);

设置动画

$('.className').animate(obj);

点击切换方法

$('.className').toggle();

获取当前元素的下一个节点

$('.className').next();

获取当前元素的上一个节点

$('.className').prev();

透明度

$('.className').opacity(num);

获取的节点个数

$('.className').length();

获取某一个节点在整个节点组中是第几个索引

$('.className').index();

获取或者设置某一个节点的属性

$('.className').attr(attr,value);

绑定事件

$('.className').bind(event,fn);

插件

$('.className').extend(name,fn);


插件编写格式

$().extend(extendName,function(){
    
    code......

})





