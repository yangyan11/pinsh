$(function () {
//顶部开始
    var search = $('.header .header-inner .nav-list .nav-item .search');
    var bag = $('.header .header-inner .nav-list .nav-item .bag');
    search.on('click',function () {
        this.parentElement.parentElement.parentElement.parentElement.classList.add('searching');
        $(this).closest('.header').find('.search-box .search-box-inner').addClass('innerbox');
        $(this).closest('.header').find('.search-box .card').addClass('cardbox');
        $(this).closest('.header').find('.search-box .card ul li').addClass('libox');
        $(this).closest('.header').find('.search-box .card h3').addClass('h3box');
        $(this).closest('.header').next().css('display','block');
    });
    bag.on('click',function () {
        this.parentElement.parentElement.parentElement.parentElement.classList.remove('searching');
        $(this).closest('.header').find('.search-box .search-box-inner').removeClass('innerbox');
        $(this).closest('.header').find('.search-box .card').removeClass('cardbox');
        $(this).closest('.header').find('.search-box .card ul li').removeClass('libox');
        $(this).closest('.header').find('.search-box .card h3').removeClass('h3box');
        $(this).closest('.header').next().css('display','none');
    });

    //顶部左边小按钮动画
    var line = $('.header-nav .line');
    var upline = $('.header-nav .line .upline');
    var downline = $('.header-nav .line .downline');
    line.on('click',function () {
        upline.toggleClass('upli');
        downline.toggleClass('downli');
        bag.toggleClass('bagrun');
        bacha.toggleClass('ac-gn-list-xiala');
    });

    // 顶部右边小书包动画
    var bag = $('.header-nav .bag');

    //八叉动画
    var bacha = $('ul.ac-gn-list');

//顶部结束
// banner开始
    var sliders = $('.carousel .gallery-slide-wrapper a');
    var dots = $('.carousel .tab-list .dot-nav .dot');
    var lefta = $('.carousel .paddlenav .leftbtn a');
    var righta = $('.carousel .paddlenav .rightbtn a');
    var dir = 'left';
    var moving = false;
    //运动主函数
    moveTo = function(el,dir){
        moving = true;
        if (dir=='right'){
            sliders.filter('.active').removeClass('active')
                .addClass('leave')
                .delay(3000)
                .queue(function () {
                    moving = false;
                    $(this).removeClass('leave').dequeue();
                });
            $(el).addClass('right');
            $(el).get(0).offsetWidth; //强制浏览器重新绘制一帧
            $(el).removeClass('right').addClass('active');
        }else if(dir==='left'){
            sliders.filter('.active').removeClass('active')
                .addClass('right')
                .delay(3000)
                .queue(function () {
                    moving = false;
                    $(this).removeClass('right').dequeue();
                });
            $(el).addClass('enter').addClass('active').delay(3000).queue(function () {
                $(this).removeClass('enter').dequeue();
                moving = false;
            });
        }
        $(dots).eq(sliders.index(el)).addClass('active').delay(3000).queue(function () {
            if(sliders.index(el)==3){
                $(dots).each(function () {
                    $(this).removeClass('active').dequeue();
                });
            }
        });

    };
    //向右运动函数
    moveRight = function () {
        if(moving) return;
        var active = sliders.filter('.active');
        var el = active.next().length?active.next():sliders.eq(0);
        moveTo(el,'right');
    };
    //向左运动函数
    moveLeft = function () {
        if(moving) return;
        var active = sliders.filter('.active');
        var el = active.prev().length?active.prev():sliders.eq(-1);
        moveTo(el,'left');
    };
    // 下面点击按钮轮播
    dots.on('click',function (el) {
        if(moving) return;
        var now = sliders.index(sliders.filter('.active'));
        var on = $(this).index();
        if(now == on) return;
        if(now<on){
            moveTo(sliders.eq($(this).index()),'right');
        }else{
            moveTo(sliders.eq($(this).index()),'left');
        }
    });

    //左右按钮点击轮播
    lefta.on('click',function () {
        moveLeft();
    });
    righta.on('click',function () {
        moveRight();
    });
    //时间函数
    setInterval(moveRight,3000);

// banner结束

// 底部文字开始
    var p = $('.footer .footup-nav .footup-nav-item');
    p.on('click','.footup-nav-item-list',function () {
        $(this).find('.footup-nav-item-list-gf').toggleClass('footup-nav-item-list-gf-show');
        $(this).find('p').toggleClass('proate');
        $(this).toggleClass('proate');
    });
// 底部文字结束


});