$( document ).ready(function() {
    function newsDetail(){
        $(".box").each(function(index, item){
            var itemPosi = $(item).position();
            var device = $(window).width() + 17;
            var deviceHeight = $(window).height();
            var deviceCenter = deviceHeight/3;
            var itemOffset = $(item).offset().top;
            if(device <= 1307){
                $(".popup-box").css({width:(device)+"px",left:"50%",marginLeft:-(device-44)/2+"px"});
            }
            if(device > 960){
                $(".popup-box").css({marginTop:"-292.5px"});
            }
            $(item).find("a").on("click",function(){
                var title = $(item).find(".news-title").html();
                var cnt = $(item).find(".box-cnt").html();
                var date = $(item).find(".news-more span").html();
                console.log("top",itemOffset);
                $(".mask").fadeIn();
                $(".popup-box").addClass("on");
                //$(item).addClass("on").css({transform:"translateY(-200px)",opacity:0});
                $(item).removeClass("on").css({transform:"scale(0.1)",opacity:0});
                $(".popup-box").find(".news-title").html(title);
                $(".popup-box").find("p").html(cnt);
                $(".popup-box").find(".date").html(date);
                
                if(device < 960){
                    $(".mask").fadeOut();
                    $("html, body").stop().animate({scrollTop:itemOffset-deviceCenter});
                    $(".popup-box").css({top:(itemPosi.top)+"px"});
                }
                return false;
            });
            $(".exit, .listBtn button").on("click",function(){
                //$(item).removeClass("on").css({transform:"translateY(0px)",opacity:1});
                $(item).removeClass("on").css({transform:"scale(1)",opacity:1});
                // $(".news-container").css("margin","109px 0");
                $(".popup-box").removeClass("on");
                $(".mask").fadeOut();  
            });
            $(window).resize(function(){
                $(item).removeClass("on").css({transform:"scale(1)",opacity:1});
                // $(".mask").fadeOut();
                $("html, body").stop().animate({scrollTop:itemOffset});
                $(".popup-box").css({top:(itemPosi.top)+270+"px"});
            });
            $(window).on("scroll",function(){
                if(!$(".popup-box").hasClass("on")){
                    $(this).addClass("on");
                }else{
                    $(this).removeClass("on");
                }
                $(item).removeClass("on").css({transform:"scale(1)",opacity:1});
            });
            // $(".load").on("click", function () {
            //    console.log(itemOffset);
            // });
        });
    }
    $(window).resize(function(){
        newsDetail();
        var device = $(window).width() + 17;
        $(".popup-box").css({width:(device-44)+"px"});
        $(".popup-box").removeClass("on");
    });
    newsDetail();   
    function more(){
        var $listBox = $(".reference-list .container");
        $listBox.each(function(index, item){
            var block = $(item).find(".block");
            var moreBtn = $(item).find(".load");
            block.slice(0, 6).show();
            moreBtn.on("click",function(){
                $(item).find(".block:hidden").slice(0, 3).show();
                if( $(item).find(".block:hidden").length == 0){
                    $(item).find(".load").hide();
                }
            });
        });
    }
    more();

    $(window).on('load', function () {
        load('#js-load', '8');
        $(".load").on("click", function () {
            load('#js-load', '4', '.load');
        })
    });

    function load(id, cnt, btn) {
        var girls_list = id + " .box:not(.active)";
        var girls_length = $(girls_list).length;
        var girls_total_cnt;
        if (cnt < girls_length) {
            girls_total_cnt = cnt;
        } else {
            girls_total_cnt = girls_length;
            $('.load').hide()
        }
        $(girls_list + ":lt(" + girls_total_cnt + ")").addClass("active");
    }















    function newsDetail(){
        const $newsBox = $(".box.active");
        
        $newsBox.each(function(index, item){
            var box = $(item);
            var itemOffset = box.offset().top;
            var itemPosi = box.position(); 
            var itemTop = parseInt(itemOffset);
            var title = $(item).find(".news-title").html();
            var cnt = $(item).find(".box-cnt").html();
            var date = $(item).find(".news-more span").html();
            var device = $(window).width() + 17;
            var deviceHeight = $(window).height();
            var deviceCenter = deviceHeight/3;
            var $popBox = $(".popup-box");
            var $mask = $(".mask");
            var $exit = $(".exit, .contact-link");
            console.log(itemPosi);
            function newsResize(){
                if(device <= 1307){
                    $popBox.css({width:(device-44)+"px",left:"50%",marginLeft:-(device-44)/2+"px"});
                }else{
                    $popBox.css({maxWidth:"1200px",width:"100%",left:"50%",marginLeft:"-600px",marginTop:"-292.5px"});
                }
                if(device > 960){
                    console.log("web");
                    $popBox.css({marginTop:"-292.5px",top:"50%"});
                    if($popBox.hasClass("on")){
                        $mask.stop().fadeIn();
                        $(item).addClass("on");
                    }
                }else{
                    $(item).removeClass("on");
                    $mask.stop().fadeOut();
                    console.log("mobile");
                }
            }
            newsResize();
            function newClick(){
                $(item).find("a").on("click",function(){
                    var itemPosi = box.position();
                    var itemOffset = box.offset().top; 
                    var deviceCenter = deviceHeight/3;
                    $popBox.addClass("on");
                    $popBox.find(".news-title").html(title);
                    $popBox.find("p").html(cnt);
                    $popBox.find(".date").html(date);
                    $("html, body").stop().animate({scrollTop:itemOffset-deviceCenter});
                    if(device < 960){
                        $(item).removeClass("on");
                        $mask.stop().hide();
                        $popBox.css({top:(itemPosi.top)+"px",marginTop:"0"});
                    }else{
                        $(item).addClass("on");
                        $popBox.css({marginTop:"-292.5px",top:"50%"});
                        $mask.stop().fadeIn();
                    }
                    return false;
                });
            }
            newClick();
            $exit.on("click",function(){
                $mask.fadeOut();
                $popBox.removeClass("on");
                $(item).removeClass("on");
            });
        });
    }

    $(window).on("resize",function(){
        newsDetail();
    });
    $(window).on("load",function(){
        newsDetail();
        $(".load").on("click", function () {
            $(".popup-box").removeClass("on");
            newsDetail();
        })
    });
});