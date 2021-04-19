//监听浏览器窗口变化
$(window).resize(function(){
	var winWidth = $(window).width();//获取浏览器可用窗口宽度
	var winHeight = $(window).height();//获取浏览器可用窗口高度
	var sideValue = winWidth - winHeight > 0 ? winHeight - 30 : winWidth - 30;//宽度高度哪个小用哪个
	var side = sideValue*0.25;//动态设定长度
	$("#bigDiv").width(sideValue).height(sideValue);//动态设定大div宽度高度
	$("#bigDiv>div").width(side).height(side)//动态设定小div宽度高度
	.css({"font-size":""+sideValue*0.1+"px","line-height":""+side+"px"});//动态设定小div字体及行高
});
//文档就绪函数
$(function(){
	var score = 0;//得分,所有数字总和
	var newCard = false;//是否生成新卡片
	initialization();//初始化函数
	var winWidth = $(window).width();//获取浏览器可用窗口宽度
	var winHeight = $(window).height();//获取浏览器可用窗口高度
	var sideValue = winWidth - winHeight > 0 ? winHeight - 30 : winWidth - 30;//宽度高度哪个小用哪个
	var side = sideValue*0.25;//动态设定长度
	$("#bigDiv").width(sideValue).height(sideValue);//动态设定大div宽度高度
	$("#bigDiv>div").width(side).height(side)//动态设定小div宽度高度
	.css({"font-size":""+sideValue*0.1+"px","line-height":""+side+"px"});//动态设定小div字体及行高
	startGame();//开局随机位置出现2-3个2或4
	$(document).keydown(function(k){
			KeyBoard(k.keyCode);//按键
	});
//初始化函数，在bigDiv中放16个小div
	function initialization(){
		var str = "";
		for (var i = 0; i < 16; i++) {
			str += '<div id = "'+i+'"></div>';
			}
		$("#bigDiv").html(str);
	}
//开局随机位置出现2-3个2或4
	function startGame(){
		var start = repeatNum();
//		$("div[id = "+start[0]+"]").addClass("two").html("2");
		if(randomTwoNum(2,4) == 2){
		$("#"+start[0]).text(""+randomTwoNum(2,4)+"");
		$("#"+start[1]).text(""+randomTwoNum(2,4)+"");
		}else{
		$("#"+start[0]).text(""+randomTwoNum(2,4)+"");
		$("#"+start[1]).text(""+randomTwoNum(2,4)+"");
		$("#"+start[2]).text(""+randomTwoNum(2,4)+"");
		}
		colorsGame();
	}
//判断生成随机数重复函数
	function repeatNum(){
		do{
			var num1 = randomNum(0,15);
			var num2 = randomNum(0,15);
			var num3 = randomNum(0,15);
		}while(num1 == num2 || num1 == num3 || num3 == num2)
			return [num1,num2,num3];
		}
//按键函数
	function KeyBoard(k){
		switch(k){
			case 37 ://左
					var moveNum = -1;
					stickMergeLeftTop(moveNum);
					break;
			case 38 ://上
					var moveNum = -4;
					stickMergeLeftTop(moveNum);
					break;
			case 39 ://右
					var moveNum = 1;
					stickMergeLowerRight(moveNum);
					break;
			case 40 ://下
					var moveNum = 4;
					stickMergeLowerRight(moveNum);
					break;
		}
	}
//执行左上置顶及合并函数
	function stickMergeLeftTop(moveNum){
		stickLeftTop(moveNum);
		mergeLeftTop(moveNum);
		stickLeftTop(moveNum);
		newNum();
		colorsGame();
	}
//执行右下置顶及合并函数
	function stickMergeLowerRight(moveNum){
		stickLowerRight(moveNum);
		mergeLowerRight(moveNum);
		stickLowerRight(moveNum);
		newNum();
		colorsGame();
	}
//左上置顶函数
	function stickLeftTop(moveNum){
		for (var i = 0; i < 16; i++) {
			stickAlgorithm(moveNum,i);
		}
	}
//右下置顶函数
	function stickLowerRight(moveNum){
		for (var i = 15; i >= 0; i--) {
			stickAlgorithm(moveNum,i);
		}
	}
//左上合并函数
	function mergeLeftTop(moveNum){
		for (var i = 0; i < 16; i++) {
			judgeEqualMerge(moveNum,i);
		}
	}
//右下合并函数
	function mergeLowerRight(moveNum){
		for (var i = 15; i >= 0; i--) {
			judgeEqualMerge(moveNum,i);
		}
	}
//置顶算法
	function stickAlgorithm(moveNum,i){
		var htmlNum = $("#"+i).text();
		if(htmlNum != ""){
			var move = haveClass(moveNum,i);
			if(move){
				count = i;
				newCard = true;
				do{
					count += moveNum;
					moveDiv(moveNum,count,htmlNum);
					move = haveClass(moveNum,count);
				}while(move);
			}
		}
	}
//判断相等合并函数
	function judgeEqualMerge(dir,who){
		posi = who + dir;	
		switch(dir){
			case -1 :
					if(who%4 != 0){
						equalMerge(dir,who);
						}
					break;
			case -4 :
					if(posi >= 0){
						equalMerge(dir,who);
						}
					break;
			case 1 :
					if(posi%4 != 0){
						equalMerge(dir,who);
						}
					break;
			case 4 :
					if(posi <= 15){
						equalMerge(dir,who);
						}
					break;
		}
	}
//相等合并
	function equalMerge(dir,who){
		var value = $("#"+who).text();
		var value1 = $("#"+(who+dir)).text();
		if(value == value1 && value != ""){
			moveDiv(dir,posi,value*2);
		}
	}
//判断有无class函数，dir方向：-1左-4上1右4下,who为哪一个div
	function haveClass(dir,who){
		posi = who + dir;
		var haveOrNone = $("#"+posi).text();
		switch(dir){
			case -1 :
					if(haveOrNone == "" && who%4 != 0){
						return true;
						}
					break;
			case -4 :
					if(haveOrNone == "" && posi >= 0){
						return true;
						}
					break;
			case 1 :
					if(haveOrNone == "" && posi%4 != 0){
						return true;
						}
					break;
			case 4 :
					if(haveOrNone == "" && posi <= 15){
						return true;
						}
					break;
		}
		return false;
	}
//移动函数，dir方向，posi移动到的位置
	function moveDiv(dir,posi,several){
		newCard = true;
		$("#"+posi).text(several);
		$("#"+(posi-dir)).text("");
	}
//产生新位置不能与已有重复
	function newNum(){
		var cardposi = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
		for (var i = 0; i < 16; i++) {
			var haveOrNone = $("#"+i).text();
			if(haveOrNone != ""){
				removeByValue(cardposi,i);
			}
		}
		if(cardposi.length > 1 && newCard){
			newCard = false;
			newPosition(cardposi);
		}else if(cardposi.length == 1 && newCard){
			newCard = false;
			newPosition(cardposi);
			var equal = TwoNumEqual();
			if(equal){overGame();}
		}
	}
//产生一个新位置
	function newPosition(cardposi){
		var num = randomNum(0,cardposi.length);
		$("#"+cardposi[num]).text(""+randomTwoNum(2,4)+"");
	}
//判断有没有两个一样的在一起的函数
	function TwoNumEqual(){
		for (var i = 0; i < 15; i++) {
			var value0 = $("#"+i).text();
			if(i == 3 || i == 7 || i == 11){
				var value1 ="";
			}else{var value1 = $("#"+(i+1)).text();}
			var value2 = $("#"+(i+4)).text();
			if(value0 == value1 || value0 == value2){return false;}
		}
		return true;
	}
//游戏结束
	function overGame(){
		var score = computeFraction();
		alert("游戏结束！   得分:"+score);
	}
//计算得分函数
	function computeFraction(){
	  for(var i=0; i<16; i++) {
		score += parseInt($("#"+i).text());
	  }
	  return score;
	}
//生成范围内随机数
	function randomNum(min, max) {
	    return Math.floor(min + Math.random() * (max - min));
	}
//生成两个数的随机数，num1概率为90
	function randomTwoNum(num1, num2) {
		if(Math.random() >= 0.1){
			 return num1;
		}else{
			return num2 ;
		}
	}
//从数组中删除指定值函数
	function removeByValue(arr, val) {
	  for(var i=0; i<arr.length; i++) {
	    if(arr[i] == val) {
	      arr.splice(i, 1);
	      break;
	    }
	  }
	}
//通过数字上色函数
	function colorsGame(){
		for (var i = 0; i < 16; i++) {
			$("#"+i).removeClass();
			var htmlNum = parseInt($("#"+i).text());
			switch(htmlNum){
				case 2 : $("#"+i).addClass("two");
						break;
				case 4 : $("#"+i).addClass("four");
						break;
				case 8 : $("#"+i).addClass("eight");
						break;
				case 16 : $("#"+i).addClass("sixTeen");
						break;
				case 32 : $("#"+i).addClass("thirtyTwo");
						break;
				case 64 : $("#"+i).addClass("sixtyFore");
						break;
				case 128 : $("#"+i).addClass("oneHundredAndTwentyEight");
						break;
				case 256 : $("#"+i).addClass("twoHundredAndFiftySix");
						break;
				case 512 : $("#"+i).addClass("fiveHundredAndTwelve");
						break;
				case 1024 : $("#"+i).addClass("oneThousandAndTwentyFour");
						break;
				case 2048 : $("#"+i).addClass("twoThousandAndFortyEight");
			}
		}
	}
});
