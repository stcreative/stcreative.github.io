$(document).ready(function(){
    var $menu=$(".tab.type02 .tab-btn li");
	var $cnt=$(".tab.type02 .tab-cnt article");
	var headHei=$("#header").outerHeight();
	var total=$cnt.size();		//length 프로퍼티, size() 메서드
	var cntPosY;
	//console.log(headHei, total);

	//4) 열려진 윈도창의 높이에 최적화 시키기
	$(window).on("resize",function  () {
		var cntHei=$(window).height()-$("#header").outerHeight();
		//console.log($(window).height(), cntHei);
		$cnt.css("height",cntHei);
		//resize가 일어난 경우 현재 $cnt의 offset().top 값을 찾아가게 한다


		//7개의 article 태그의 offset().top값을 배열에 저장하고 호출
		cntPosY=new Array(total+1);

		for (var i=0; i<total; i++) {
			cntPosY[i]=$cnt.eq(i).offset().top-headHei;
		}
		cntPosY[i]=$(document).height()-$(window).height();		//마지막 컨텐츠의 높이가 낮아 스크롤바가 가장 마지막에 위치한 경우도 변수에 저장
		console.log(cntPosY);

		
		var onIdx=$(".tab.type02 .tab-btn li.on").index();
		var tgPos=cntPosY[onIdx];
		//console.log(onIdx);

		$(window).off("scroll");
		$("html, body").stop().animate({scrollTop:tgPos}, 400, function  () {
			$(window).on("scroll", scrollMove);
		})
	});

	$(window).trigger("resize");



	//1) 인디케이터 click
	$menu.children().on("click",function  () {
		console.log(cntPosY);
		//1-1) .on 클래스명 제어
		$(this).parent().addClass("on").siblings().removeClass("on");
		//1-2) animate
		var tgIdx=$(this).parent().index();
		var tgPosY=cntPosY[tgIdx];
		//console.log(tgIdx, tgPosY);
		$(window).off("scroll");
		$("html, body").stop().animate({scrollTop:tgPosY}, 400, function  () {
			$(window).on("scroll",scrollMove);
		});

		return false;
	});

	//2) 스크롤바 움직이기
	$(window).on("scroll",scrollMove);
	function scrollMove () {
		var srollY=$(window).scrollTop();
		//console.log(srollY);

		for (var i=0; i<=total; i++) {
			if (srollY>=cntPosY[i]) $menu.eq(i).addClass("on").siblings().removeClass("on");
			else if (srollY==cntPosY[total]) $menu.eq(i).addClass("on").siblings().removeClass("on");
		}
	}

	//3) 마우스휠 움직이기
	$cnt.on("mousewheel DOMMouseScroll",function  (e) {
		var wheelNum=e.originalEvent.wheelDelta || e.originalEvent.detail*-1;
		var thisIdx=$(this).index();
		console.log(wheelNum, thisIdx);

		if (!$("html, body").is(":animated")) {
			//아래로 이동(음수), 위로 이동(양수)
			if (wheelNum<0 && thisIdx<total-1) {
				$("html, body").stop().animate({scrollTop:cntPosY[thisIdx+1]});
			}
			else if (wheelNum>0 && thisIdx>0) {
				$("html, body").stop().animate({scrollTop:cntPosY[thisIdx-1]});
			}
		}
	});
});