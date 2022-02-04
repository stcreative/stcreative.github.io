$( document ).ready(function() {
    onePage();
    headerScroll();
    headerFixed();
    product();
    topBtn();
    tab_split();
    more();
    moreNews();
    $(window).resize(function(){
        headerScroll();
    });

    $(".all-menu").on("click",function(){
        logo();
    });

    function logo(){
        if($("#header").hasClass("on")){
            $(".logo img").attr("src","img/logo.png");
        }else{
            $(".logo img").attr("src","img/logo2.png");
        }
    }
    function onePage () {
		var $menu=$(".tab > ul > li");
		var $cnt=$(".tab .tab-cnt article");
		var headHei=$("#header").outerHeight();	//70

		//1)indicator에 a를 클릭하는 경우
		$menu.children().on("click",function  () {
			//1-1) indicator li에 .on 제어
			$(this).parent().addClass("on").siblings().removeClass("on");

			//1-2) html과 body를 animate시켜 원하는 article에 이동
			var tg=$(this).attr("href");
			var posY=$(tg).offset().top-headHei;	//fixed 속성의 indicator가 컨텐츠를 가리기 때문
			console.log(tg, posY);

            $(window).off("scroll");	//animate 직전 scroll 이벤트를 제거하고
            $(window).on("scroll", headerScroll);
            $(window).on("scroll", logo);
            $(window).on("scroll", product);
			$("html, body").animate({scrollTop:posY}, 600, function  () {
                $(tg).addClass("active");
				$(window).on("scroll", scrollMove);	//animate 완료후에 다시 scroll 이벤트를 연결
			});

			return false;
		});

		//2)window가 scroll 되는 경우
        $(window).on("scroll", scrollMove);
        $(window).on("scroll", headerScroll);
        $(window).on("scroll", product);
		function scrollMove () {
			var scrollY=$(window).scrollTop();
			// console.log(scrollY);

			//indicator li에 .on 클래스명 제어
			$cnt.each(function  (idx) {
				if (scrollY>=$(this).offset().top-headHei){
                    $menu.eq(idx).addClass("on").siblings().removeClass("on");
                }else if(scrollY == $(document).height()-$(window).height()){
                    $menu.eq(idx).addClass("on").siblings().removeClass("on");
                }
				//마지막 컨텐츠의 높이가 낮은 경우 li.on이 되지 못하므로 스크롤바를 가장 하단으로 내린 경우는 마지막 li를 활성화 시킨다
				
			});
        }
        
    }
    
    function allMenu(){
        $(".all-menu").unbind("click").on("click",function(){
            $(this).stop().toggleClass("on");
            $("#header").toggleClass("on");
            logo();
            if($(this).hasClass("on")){
                $("#gnb").show();
            }else{
                $("#gnb").hide();
            }
        });
    }
   
    function headerScroll(){
        var scrollY= $(window).scrollTop();
        var device = $(window).width() + 17;
        //console.log(device);
        if(device > 960){
            logo();
            allMenu();
            if(scrollY > 0){
                $(".all-menu").off("click");
                $("#header, .all-menu").addClass("on");
                $("#header .container").addClass("scroll");
                $("#gnb").show();
            }else{
                $("#header, .all-menu").removeClass("on");
                $("#header .container").removeClass("scroll");
                $("#gnb").hide();
                if(scrollY == 0){
                    allMenu();
                    logo();
                }
            }
        }else{
            if(scrollY > 0){
                $("#gnb").hide();
                $("#header, .all-menu").removeClass("on");
                $("#header .container").removeClass("scroll");
            }
            allMenu();
            logo();
        }
    }
    function headerFixed(){
        $(window).on("scroll", headerScroll);
        $(window).on("scroll", logo);
	}
    
    function topBtn(){
        $(".top-btn a").on("click",function(){
            $("html, body").animate({scrollTop:0});
            
            return false;
        });
    }
    function product(){
        $(".tab .tab-cnt article").each(function(index, item){
            var scrollY=$(window).scrollTop()+200;
            var articleTop = $(this).offset().top;
            if(scrollY > articleTop){
                $(this).addClass("active");
            }else{
                $(".tab .tab-cnt article.cnt01").addClass("active");
            }
        });
    }   
    function tab_split () {
        $(".reference-list > div").eq(0).addClass("on");
		$(".tab-split .reference-tab-btn li a, .slider-toggle li a").on("click",function  () {
            var tg=$(this).attr("href");
            var val = $(this).parent().val();
            $(".location span").eq(2).text(val);
            $(".toggle-btn").text(val);
			console.log(val);
            $(".slider-toggle").slideUp();
			//1) 버튼 li.on 클래스명 제어
			$(this).parent().addClass("on").siblings().removeClass("on");

			//2) 컨텐츠 .cnt > div 제어
            $(this).closest(".reference-tab-btn").next().children(tg).css({display:"flex"}).siblings().hide();
            $(this).closest(".reference-tab-btn").next().children(tg).addClass("on").siblings().removeClass("on");

            $(this).closest(".slider-toggle").next().next().children(tg).css({display:"flex"}).siblings().hide();
            $(this).closest(".slider-toggle").next().next().children(tg).addClass("on").siblings().removeClass("on");
            
			return false;
        });
    }
    
    $(".tab-split .reference-tab-btn li, .tab-split .slider-toggle.tab-btn li").each(function(idx, el){
        $(el).find("a").on("click",function(){
            $(".location span").eq(2).text($(el).text());
            $(".toggle-btn").text($(el).text());
        });
    });

    $(".toggle-btn").on("click",function(){
        $(".slider-toggle").stop().slideToggle();
    });

    function more(){
        var $listBox = $(".reference-list .container");
        $listBox.each(function(index, item){
            var block = $(item).find(".block");
            var total = block.length;
            var view_list = 6;
            for (var i=0; i<view_list;i++ )
                {
                    block.eq(i).addClass("active");
                }
            var moreBtn = $(item).find(".load");
            block.slice(0, 6).addClass("active");
            moreBtn.on("click",function(){
                view_list += 3;
                for (var i=0; i<view_list;i++ )
                {
                    block.eq(i).addClass("active");
                }
                if (view_list>=total)
                {
                    moreBtn.hide();
                }
            });
        });
    }
    
    function moreNews(){
        var $listBox = $(".news-container");
        $listBox.each(function(index, item){
            var block = $(item).find(".box");
            var total = block.length;
            var view_list = 8;
            for (var i=0; i<view_list;i++ )
                {
                    block.eq(i).addClass("active");
                }
            var moreBtn = $(item).find(".load");
            block.slice(0, 8).addClass("active");
            moreBtn.on("click",function(){
                view_list += 4;
                for (var i=0; i<view_list;i++ )
                {
                    block.eq(i).addClass("active");
                }
                if (view_list>=total)
                {
                    moreBtn.hide();
                }
            });
        });
    }
    
    function newsDetail(){

        var $newsBox = $(".box.active"),
            $HtmlBody = $("html, body"),
            $popBox = $(".popup-box"),
            $mask = $(".mask"),
            $exit = $(".exit, .contact-link");

        $newsBox.each(function(index, item){
            var box = $(item),
                device = $(window).width() + 17,
                deviceHeight = $(window).height(),
                deviceCenter = deviceHeight/3,
                itemOffset = box.offset().top,
                scrollCenter = colCenter(itemOffset , deviceCenter),
                title = $(item).find(".news-title").html(),
                cnt = $(item).find(".box-cnt").html(),
                date = $(item).find(".news-more span").html();
                
            
            if(device <= 1307){
                tabletsPopupSize();
            }else{
                webPopupSize();
            }
            
            if(device < 960){
                $(item).removeClass("on");
                $mask.fadeOut();
            }else{
                $popBox.css({marginTop:"-292.5px",top:"50%"});
                if($popBox.hasClass("on")){
                    $mask.stop().fadeIn();
                    $(item).addClass("on");
                }
            }
            $(item).find("a").on("click",function(){
                var itemPosi = box.position();
                $HtmlBody.stop().animate({scrollTop:scrollCenter});
                if(device < 960){
                    $(item).removeClass("on");
                    $mask.stop().hide();
                    $popBox.css({top:(itemPosi.top)+"px",marginTop:"0"});
                }else{
                    $(item).addClass("on");
                    $popBox.css({marginTop:"-292.5px",top:"50%"});
                    $mask.stop().fadeIn();
                }
                popupData();
                return false;
            });
            $exit.on("click",function(){
                $mask.fadeOut();
                $popBox.removeClass("on");
                $(item).removeClass("on");
            });

            function colCenter(itemOffset, deviceCenter){
                var scrollCenter = itemOffset - deviceCenter;
                return scrollCenter;
            }
            
            function tabletsPopupSize(){
                $popBox.css({
                    width:(device-44)+"px",
                    left:"50%",
                    marginLeft:-(device-44)/2+"px"
                });
            }

            function webPopupSize(){
                $popBox.css({
                    maxWidth:"1200px",
                    width:"100%",
                    left:"50%",
                    marginLeft:"-600px",
                    marginTop:"-292.5px"
                });
            }

            function popupData(){
                $popBox.addClass("on");
                $popBox.find(".news-title").html(title);
                $popBox.find("p").html(cnt);
                $popBox.find(".date").html(date);
            }

        });
    }
    newsDetail();
    $(window).resize(newsDetail);
    $(window).on("load",function(){
        $(".load").click(newsDetail);
    });

    // $(".banner ul li:nth-child(2) a").on("click",function(){
    //     alert("준비중입니다.");
    // });

    
});