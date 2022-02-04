$( document ).ready(function() {
    $(".bg").addClass("active");
    function webFooter(){
        $("body, html").on("mousewheel DOMMouseScroll",function  (e) {
            var wheelNum=e.originalEvent.wheelDelta || e.originalEvent.detail*-1;
            if (wheelNum<0){
                $("#footer").addClass("on");
            }else{
                $("#footer").removeClass("on");
            }	
        });
    }
    function device_resize(){
        var device = $(window).width();
        if(device > 960){
            webFooter();
        }else{
            $(".bg").addClass("active");
        }
    }
    device_resize();
    $(window).resize(function(){
        device_resize();
    });
});