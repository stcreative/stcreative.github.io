$( document ).ready(function() {
    function gnb(){
        var device = $(window).width();
        var hamburger = $(".all-menu");
        hamburger.on("click",function(){
            $("#header").toggleClass("on");
            $(this).stop().toggleClass("on");
            if($(this).hasClass("on")){
                $("#gnb").show();
            }else{
                $("#gnb").hide();
            }
        });
    }
    gnb();
    function globalMenu(){
        $("#gnb ul > li").on('mouseenter focusin',function(){
            var t = $(this);
            t.addClass("current").siblings().removeClass("current");
            var tabActive = $("#gnb ul > li.current").position().left;
            var width = $("#gnb ul > li.current").find("a").width();
            $("#gnb > .bar").css("opacity","1").css("transform","translateX("+tabActive+"px)").css("width",width+"px");
        });
        $("#header").on("mouseleave",function(){
            $("#gnb ul > li").removeClass('current');
            $("#gnb > .bar").css("opacity","0");
        });
    }
    globalMenu();
});