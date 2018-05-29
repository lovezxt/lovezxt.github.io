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
});