$(function() {
	$('#dowebok').pbTouchSlider({
		slider_Wrap: '#dowebokWrap',
		slider_Drag: false,//禁止拖动
		slider_Dots: {
			enabled : false//不显示圆点
		},
		slider_Breakpoints: {
			default: {
				height: 500
			},
			tablet : {
				height : 400,
				media : 1024
			},
			smartphone : {
				height : 300,
				media : 768
			}
		}
	});
	
	$(".icon-right-open-big").click();
	
	$(".side ul li").hover(function() {
		$(this).find(".sidebox").stop().animate({
			"width": "140px"
		}, 200).css({
			"opacity": "1",
			"filter": "Alpha(opacity=100)",
			"background": "rgba(0,0,0,0.3)"
		})
	}, function() {
		$(this).find(".sidebox").stop().animate({
			"width": "54px"
		}, 200).css({
			"opacity": "0.8",
			"filter": "Alpha(opacity=80)",
			"background": "#000"
		})
	});
});

function goTop(){
	$('html,body').animate({'scrollTop':0},1000);
}
function goNav1(){
	$('html,body').animate({scrollTop: $("#nav-1").offset().top},600);
}
function goNav2(){
	$('html,body').animate({scrollTop: $("#nav-2").offset().top},600);
}
function goNav3(){
	$('html,body').animate({scrollTop: $("#nav-3").offset().top},600);
}
function goNav4(){
	$('html,body').animate({scrollTop: $("#nav-4").offset().top},600);
}
function goNav5(){
	$('html,body').animate({scrollTop: $("#nav-5").offset().top},600);
}