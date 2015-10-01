$().extend('drag',function(){
    var tags = arguments;
    console.log(tags);
    for (var i = 0; i < this.elements.length; i++) {
        addEvent(this.elements[i],'mousedown',function(e){
            //点击空白区域无效
            if(trim(this.innerHTML).length == 0) e.preventDefault();

            var _this = this;

            var diffX = e.clientX - _this.offsetLeft;
            var diffY = e.clientY - _this.offsetTop;

            //自定义拖拽区域
            var flag = false;

            for (var i = 0; i < tags.length; i++) {
                if (e.target == tags[i]) {
                    flag = true;
                    //只要有yrue,就立刻返回
                    break;
                };
            };


            if (flag) {
                addEvent(document,'mousemove',move);
                addEvent(document,'mouseup',up);
            } else {
                removeEvent(document,'mousemove',move);
                removeEvent(document,'mouseup',up);
            }


            function move(e){
                var left = e.clientX - diffX;
                var top = e.clientY - diffY;

                if (left < 0) {
                    left = 0;
                } else if (left > getInner().width - _this.offsetWidth){
                    left = getInner().width - _this.offsetWidth;
                }

                if (top < 0) {
                    top = 0;
                } else if(top > getInner().height - _this.offsetHeight){
                    top = getInner().height - _this.offsetHeight;
                }

                _this.style.left = left + 'px';
                _this.style.top = top + 'px';
                //IE浏览器在拖出浏览器外部的时候，还是会出现空白。这个bug是IE独有的，所以我们需要禁止这种行为。
                //IE浏览器有两个独有的方法：setCapture、releaseCapture，这两个方法，可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，限制超过的功能就失效了。用这个方法，即可解决这个问题。
                if (typeof _this.setCapture != 'undefined') {
                    _this.setCapture();
                };

            }

            function up(){
                removeEvent(document,'mousemove',move);
                removeEvent(document,'mouseup',up);
                if (typeof _this.releaseCapture != 'undefined') {
                    _this.releaseCapture();
                };
            }


        })
    };

    return this;

})