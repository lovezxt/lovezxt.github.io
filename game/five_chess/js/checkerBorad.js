var count = 0;//记录点击次数判断棋子颜色
var win = 0;//计算胜利返回值，一方胜利后函数返回值为1
var end = 0;//一方胜利后值变为1，无法下子
var myTimer1;//关闭练习按键div时用到的定时器
var myTimer2;//关闭选场按键div时用到的定时器
var gameNumber = 1;//第几局
var whiteGameWin = 0;//白方胜场
var blackGameWin = 0;//黑方胜场
var closeCartoon;//右边文字一个一个出来的定时器
var WinNumber = 0;//0是单人模式，1为三局两胜，2为五局三胜
var nextGameButtonShow = 0;//若值为1,则不是单人模式
var ourTimer1;//下子定时器
var ourTimer2;//下子定时器
var index=0;//右边显示字的个数
var strin = "棋子恒久远一颗永流传";//默认右边显示的字
var whiteWin = new Array();//数组记录白方下子所有位置
var blackWin = new Array();//数组记录黑方下子所有位置
var num;//倒计时的秒数 
var windowWidth = document.documentElement.clientWidth;//获取浏览器可用窗口宽度
var windowHeight = document.documentElement.clientHeight;//获取浏览器可用窗口高度
//var borderDiv = windowHeight/931*900;//大div边框大小
var dynamicLoading = {
css: function(path){
	   if(!path || path.length === 0){
	throw new Error('argument "path" is required !');
	   }
	   var head = document.getElementsByTagName('head')[0];
	    var link = document.createElement('link');
	    link.href = path;
	    link.rel = 'stylesheet';
	    link.type = 'text/css';
	    head.appendChild(link);
	},
	js: function(path){
	   if(!path || path.length === 0){
	throw new Error('argument "path" is required !');
	   }
	   var head = document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');
	    script.src = path;
	    script.type = 'text/javascript';
	    head.appendChild(script);
		}
}
//动态加载CSS文件
	if(windowWidth >= 1900){
		dynamicLoading.css("../css/checkerBorad1920x1080.css");
		dynamicLoading.css("css/checkerBorad1920x1080.css");
	}else{
		dynamicLoading.css("../css/checkerBorad1600X900.css");
		dynamicLoading.css("css/checkerBorad1600X900.css");
		dynamicLoading.css("../css/text.css");
	}
//动态加载各元素大小
//window.onload=function(){
//	$("checkerBoradBigBox").style.cssText = 
//	"width:"+borderDiv+"px;height:"+borderDiv+"px;margin-left:"+windowHeight/931*700+"px;background-size:"+borderDiv+"px "+borderDiv+"px;"
//	$("divChessBoard").style.cssText = 
//	"width:"+borderDiv+"px;height:"+borderDiv+"px;padding-left:"+borderDiv/900*16+"px;padding-top:"+borderDiv/900*16+"px;"
//	if(windowWidth < 1900){
//	$("buttonimgOne").style.cssText = "display:none;"
//	$("buttonimgTwo").style.cssText = "display:none;"
//	}
//}
//function chessCss(){//棋子动态设置Css
//	for (var l = 0; l <= count; l++) {
//	$(""+l+"chess").style.cssText = 
//	"width:"+borderDiv/900*30+"px;height:"+borderDiv/900*30+"px;margin-left:"+borderDiv/900*7.5+"px;margin-top:"+borderDiv/900*7.5+"px;border-radius:"+borderDiv/900*15+"px;"
//	}
//}
//function chessSmallDivCss(){//给栅格化div框动态设置css
//	for (var l = 0; l < 361; l++) {
//	$(""+l+"").style.cssText =
//	"width:"+borderDiv/900*45.8+"px;height:"+borderDiv/900*45.8+"px;font-size:"+borderDiv/900*5+"px;"
//	}
//}
//页面加载时调用，控制功能按键是否可用
function keystrokeOperation(){
	setInterval("progressBarGo()",1000);//1s调一次数据给时间条
    closeCartoon = setInterval("type()", 500); //通过定时器来让文字逐步显示
	$("startAgain").disabled = true;
	$("overGame").disabled = true;
	$("whiteFall").disabled = true;
	$("blackFall").disabled = true;
}
//栅格下子函数
function checkerBoradStart(){
	var str = "";	
	for (var i = 0; i < 361; i++) {
		str += '<div onclick="clickCheckerBorad(this.id)" id = "'+i+'"></div>';
	}
	$("divChessBoard").innerHTML = str;
//	chessSmallDivCss();//动态给栅格添加属性
	$("overGame").disabled = false;
	$("startGame").disabled = true;
	startSelectingButton.style.display="none";
	mangPeopleChooseButton.style.display="none";
}
//棋盘点击下子函数
function clickCheckerBorad(id){
	if (end == 0) {//当某方胜利时end值为1，重开局前双方无法下子
		if(count%2==0){
		var isThereAnySon = $(id).innerHTML;
		}else{var isThereAnySon = "";}
		if(isThereAnySon == ""){
			if(count%2==0){	//双数白方下子
				$("whiteFall").disabled = false;
				$("blackFall").disabled = true;		//一方下子后此方悔棋按键可用，另外一方不可用
				$(id).innerHTML = "<div class='white' id='"+count+"chess'></div>";
				whiteWin[whiteWin.length] = id;
				$("firstlazi").innerHTML = "黑方";
				window.clearInterval(ourTimer2);//清掉黑方定时
				secondTimer(0);//开启白方定时
			}else{
				if(WinNumber == 1 || WinNumber == 2){
					$("whiteFall").disabled = true;
					$("blackFall").disabled = false;
					$(id).innerHTML = "<div class='black' id='"+count+"chess'></div>";
					blackWin[blackWin.length] = id;
				}else{ManMachineAlgorithm(count);}
				$("firstlazi").innerHTML = "白方";
				window.clearInterval(ourTimer1);//清掉白方定时
				secondTimer(1);//开启黑方定时
			}
//				chessCss();//动态给棋子添加属性
				$("startAgain").disabled = false;//棋盘上有子时重开按键可用
			if(count>7){
				judgeBunko();//下够8个子后开始进入获胜判断函数
			}
				count++;
				if(WinNumber == 0 && count%2 == 1){clickCheckerBorad();}
		}
	}
}
//计算胜利函数
function judgeBunko(){
		var victory = new Array();//victory数组存储函数返回值
			if(count%2==0){
				victory[0] = fiveConnectedNumberExceptBug(whiteWin,win,1,2,3,4);
				victory[1] = fiveConnectedNumber(whiteWin,win,19,38,57,76);
				victory[2] = fiveConnectedNumber(whiteWin,win,20,40,60,80);
				victory[3] = fiveConnectedNumber(whiteWin,win,18,36,54,72);
				//四种赢的计算方式，victory中原始值都为0，只要一种方式获胜，值变为1
			if (victory.indexOf(1) !== -1) {
					alert("游戏结束，白方获胜！");
					end = 1;
					stopTime();
					window.clearInterval(ourTimer1);//清掉白方定时
					$("whiteFall").disabled = true;
					whiteGameWin ++;
				if(nextGameButtonShow == 1 && WinNumber == 1 && whiteGameWin < 2){
						nextGameButton.style.display="block";
					}
				if(nextGameButtonShow == 1 && WinNumber == 2 && whiteGameWin < 3){
						nextGameButton.style.display="block";
					}
				if(WinNumber == 1 && whiteGameWin ==2){
						$("whiteWinGame").innerHTML = whiteGameWin;
						alert("三局两胜制结束，白方获胜！");
						alert("游戏结束，请重新开始");
					}
				if(WinNumber == 2 && whiteGameWin ==3){
						$("whiteWinGame").innerHTML = whiteGameWin;
						alert("五局三胜制结束，白方获胜！");
						alert("游戏结束，请重新开始");
					}
				}//只要有一个1，即获胜，下同
		}else{
			victory[0] = fiveConnectedNumberExceptBug(blackWin,win,1,2,3,4);
			victory[1] = fiveConnectedNumber(blackWin,win,19,38,57,76);
			victory[2] = fiveConnectedNumber(blackWin,win,20,40,60,80);
			victory[3] = fiveConnectedNumber(blackWin,win,18,36,54,72);
			if (victory.indexOf(1) !== -1) {
				alert("游戏结束，黑方获胜！");
				end = 1;
				stopTime();
				window.clearInterval(ourTimer2);//清掉黑方定时
				$("blackFall").disabled = true;
				blackGameWin ++;
				if(nextGameButtonShow == 1 && WinNumber == 1 && blackGameWin < 2){
					nextGameButton.style.display="block";
				}
				if(nextGameButtonShow == 1 && WinNumber == 2 && blackGameWin < 3){
					nextGameButton.style.display="block";
				}//如果满足这些条件就显示下一局按键，否则不显示
				if(WinNumber == 1 && blackGameWin ==2){
					$("blackWinGame").innerHTML = blackGameWin;
					alert("三局两胜制结束，黑方获胜！");
					alert("本轮游戏结束，请重新开始");
				}
				if(WinNumber == 2 && blackGameWin ==3){
					$("blackWinGame").innerHTML = blackGameWin;
					alert("五局三胜制结束，黑方获胜！");
					alert("本轮游戏结束，请重新开始");
				}
		}
	}
}
//白方悔棋函数
function whiteFallBack(){
	count--;
	window.clearInterval(ourTimer1);
	secondTimer(1);
	var FallBack = whiteWin.pop();
	$(FallBack).innerHTML = "";
	if(WinNumber == 0){
		blackFallBack();
		if(count == 0){$("whiteFall").disabled = true;}
	}else{
		if(count > 0){
			$("blackFall").disabled = false;//桌上没子了，拿啥悔棋？
			$("whiteFall").disabled = true;
		}
	}
}
//黑方悔棋函数
function blackFallBack(){
	count--;
	window.clearInterval(ourTimer2);
	secondTimer(0);
	var FallBack = blackWin.pop();
	$(FallBack).innerHTML = "";
	$("blackFall").disabled = true;
	$("whiteFall").disabled = false;
}
//三局两胜按键调用函数
function threeTwoWin(){
	nextGameButtonShow = 1;
	WinNumber = 1;
	startTime();
	energyBar.style.display="block";
	pgBar.style.display="block";
	checkerBoradStart();
	$('fiveTimer').innerHTML = 30+'秒' ; 
	startSelectingButton.style.display="none";
	mangPeopleChooseButton.style.display="none";
}
//五局三胜按键调用函数
function fiveThreeWin(){
	nextGameButtonShow = 1;
	WinNumber = 2;
	startTime();
	energyBar.style.display="block";
	pgBar.style.display="block";
	checkerBoradStart();
	$('fiveTimer').innerHTML = 30+'秒' ; 
	startSelectingButton.style.display="none";
	mangPeopleChooseButton.style.display="none";
}
//下一局按键函数
function nextGame(){
	win = 0;
	end = 0;
	gameNumber ++;
	whiteWin = new Array();
	blackWin = new Array();
	count = 0;
	ResetTime();
	startTime();
	$("divChessBoard").innerHTML = "";
	checkerBoradStart();
	$("firstlazi").innerHTML = "白方";
	$("whiteFall").disabled = true;
	$("blackFall").disabled = true;
	$("startAgain").disabled = true;
	nextGameButton.style.display="none";
	$('fiveTimer').innerHTML = 30+'秒' ; 
	$("blackWinGame").innerHTML = blackGameWin;
	$("whiteWinGame").innerHTML = whiteGameWin;
	$("numberGame").innerHTML = "第" + gameNumber + "局";
}
//重新开始函数
function reopenNewGame(){
	win = 0;
	end = 0;
	gameNumber = 1;
	whiteGameWin = 0;
	blackGameWin = 0;
	whiteWin = new Array();
	blackWin = new Array();
	count = 0;
	ResetTime();
	startTime();
	window.clearInterval(ourTimer1);//清掉白方定时
	window.clearInterval(ourTimer2);//清掉黑方定时
	$("firstlazi").innerHTML = "白方";
	$("divChessBoard").innerHTML = "";
	$("blackWinGame").innerHTML = "0";
	$("whiteWinGame").innerHTML = "0";
	$('fiveTimer').innerHTML = 30+'秒' ; 
	$("numberGame").innerHTML = "第" + "1" + "局";
	checkerBoradStart();
	$("whiteFall").disabled = true;
	$("blackFall").disabled = true;
	$("startAgain").disabled = true;
	nextGameButton.style.display="none";
}
//结束游戏函数
function gameOver(){
	win = 0;
	end = 0;
	count = 0;
	gameNumber = 1;
	whiteGameWin = 0;
	blackGameWin = 0;
	WinNumber = 0;
	nextGameButtonShow = 0;
	WinNumber = 0;
	ResetTime();
	whiteWin = new Array();
	blackWin = new Array();
	$("firstlazi").innerHTML = "白方";
	$("divChessBoard").innerHTML = "";
	$("blackWinGame").innerHTML = "0";
	$("whiteWinGame").innerHTML = "0";
	$("numberGame").innerHTML = "第" + "1" + "局";
	$("overGame").disabled = true;
	$("startGame").disabled = false;
	$("startAgain").disabled = true;
	$("whiteFall").disabled = true;
	$("blackFall").disabled = true;
	energyBar.style.display="none";
	pgBar.style.display="none";
	nextGameButton.style.display="none";
	window.clearInterval(ourTimer1);//清掉白方定时
	window.clearInterval(ourTimer2);//清掉黑方定时
}
//关闭动画按键函数
function closeAnimation(){
	animation.style.display="none";
//	marqueeGo.style.display="none";
	window.clearInterval(closeCartoon);
	$("judjeVictoryFirst").innerText = "棋子恒久远";
	$("judjeVictorySecond").innerText = "一颗永流传";
}
//游戏介绍函数
function introductionGame(){
	alert('        五子棋是世界智力运动会竞技项目之一，是一种两人对弈的纯策略型棋类游戏，通常双方分别使用黑白两色的棋子，下在棋盘直线与横线的交叉点上，先形成5子连线者获胜。');
}
//退出游戏按键函数
function contactUs(){
	window.location.href="../login.html";
}
//柱状计时条取值函数
function progressBarGo(){
	var bar = $("fiveTimer").innerHTML;
	bar = (bar.replace("秒",""))/30*100//将0-30的秒数转换为0-100供柱状计时条使用
	$("pgBar").value = bar;
	if(bar >= 50){
		$("pgBar").style.color = "green";
	}else if(bar < 50 && bar >= 20){
		$("pgBar").style.color = "yellow";
	}else{
		$("pgBar").style.color = "red";
	}
}
//最右侧文字逐个显示函数
function type() {
	if(index == strin.length + 1) {
		index = 0;
	}
	if(index <= 5){
		$("judjeVictorySecond").innerText = "";
		$("judjeVictoryFirst").innerText = strin.substring(0, index++);
	}else{
		$("judjeVictorySecond").innerText = strin.substring(5, index++);
	}
}
//开始游戏移入显示开局选择胜场按键
function openStartSelectingButton(){
	startSelectingButton.style.display="block";
}
//开始游戏移出1s后关闭开局选择胜场按键
function closeStartSelectingButton(){
	myTimer1 = setTimeout(timer1TransitionFunction,100);
}
//定时器过渡函数
function timer1TransitionFunction(){
	startSelectingButton.style.display="none";
}
//鼠标移入选择胜场按键div时使其可见
function openButton(){
	clearTimeout(myTimer1);
	startSelectingButton.style.display="block";
}
//鼠标移出选择胜场按键div时使其消失
function closeButton(){
	startSelectingButton.style.display="none";
}
//当鼠标放在多人对战时显示三局两胜和五局三胜按钮div
function openmangPeopleChooseButton(){
	mangPeopleChooseButton.style.display="block";
}
//当鼠标移开多人对战时1s后关闭三局两胜和五局三胜按钮div
function closemangPeopleChooseButton(){
	myTimer2 = setTimeout(timer2TransitionFunction,100);
}
//定时器过渡函数
function timer2TransitionFunction(){
	mangPeopleChooseButton.style.display="none";
}
//当鼠标放在三局两胜和五局三胜按钮div中时此div及单双人div不消失
function openWinButton(){
	clearTimeout(myTimer2);
	startSelectingButton.style.display="block";
	mangPeopleChooseButton.style.display="block";
}
//当鼠标移开三局两胜和五局三胜按钮div时此div及单双人div都消失
function closeWinButton(){
	startSelectingButton.style.display="none";
	mangPeopleChooseButton.style.display="none";
}
//五子棋算法判断竖着和斜着	是否获胜	arr数组	win胜负判定	aa.bb.cc.dd为传入值
function fiveConnectedNumber(arr,win,aa,bb,cc,dd){
	var newDigitalArray = new Array();
		for (var h = 0; h < arr.length; h++) {
			newDigitalArray[newDigitalArray.length] = parseInt(arr[h]); 
		}//将原字符串数组变为数字数组
			for (var j = 0; j < newDigitalArray.length; j++) {
				var value = newDigitalArray[j];
				if (newDigitalArray.indexOf(value+aa) !== -1) {
					if (newDigitalArray.indexOf(value+bb) !== -1) {
						if (newDigitalArray.indexOf(value+cc) !== -1) {
							if (newDigitalArray.indexOf(value+dd) !== -1) {
								win = 1;
								break;
							}
						}
					}
				}
			}
return win;
}
//五子棋算法计算横向胜利除bug
function fiveConnectedNumberExceptBug(arr,win,aa,bb,cc,dd){
	var newDigitalArray = new Array();
		for (var h = 0; h < arr.length; h++) {
			newDigitalArray[newDigitalArray.length] = parseInt(arr[h]); 
		}//将原字符串数组变为数字数组
			for (var j = 0; j < newDigitalArray.length; j++) {
				var value = newDigitalArray[j];
			if(value%19 != 15 && value%19 != 16 && value%19 != 17 && value%19 != 18){
				if (newDigitalArray.indexOf(value+aa) !== -1) {
					if (newDigitalArray.indexOf(value+bb) !== -1) {
						if (newDigitalArray.indexOf(value+cc) !== -1) {
							if (newDigitalArray.indexOf(value+dd) !== -1) {
								win = 1;
								break;
							}
						}
					}
				}
			}
		}
return win;
}
//生成8个数的随机数
	function randomNum(num1, num2,num3,num4,num5,num6,num7,num8){
		var num = Math.random();
		if(num < 0.125){
			 return num1;
		}else if(num >= 0.125 && num < 0.25){
			return num2;
		}else if(num >= 0.25 && num < 0.375){
			return num3;
		}else if(num >= 0.375 && num < 0.5){
			return num4;
		}else if(num >= 0.5 && num < 0.625){
			return num5;
		}else if(num >= 0.625 && num < 0.75){
			return num6;
		}else if(num >= 0.75 && num < 0.875){
			return num7;
		}else{
			return num8;
		}
	}
//横向	whiteOrBlack 0为白，1为黑，blackFallDown为布尔值为true时说明已经下子则跳出函数，method为方法，0是00001，1是01000，2是00100
function lookupNumTransverse(whiteOrBlack,blackFallDown,numBlack,numWhite,count,val,method){
	switch(method){
		case 1 : var methodval = [1,2,3,4];break;
		case 0 : var methodval = [2,3,4,1];break;
		case 2 : var methodval = [1,3,4,2];break;
	}
	var allChess = numBlack.concat(numWhite);
	var whiteChessArray = whiteOrBlack == 0 ? numWhite : numBlack;
	for (var f = 0; f < whiteChessArray.length; f++) {
		var end = whiteChessArray[whiteChessArray.length - f- 1];
		if(whiteOrBlack == 0){
			var wOrB = numWhite;
			var whiOrBla = numBlack;
		}else{
			var wOrB = numBlack;
			whiOrBla = numWhite;
		}
		for (var j = 1; j < 3; j++) {
		j == 1 ? b = 1 : b = -1;
		if(end%19 != 15 && end%19 != 16 && end%19 != 17 && end%19 != 18){
			if(wOrB.indexOf(end + b*methodval[0]) != -1){
				if(method == 0 && val == 2){
					if(allChess.indexOf(end + b*-1) == -1 && allChess.indexOf(end + b*3) == -1){
					blackFallDown = computerLazi(numWhite,numBlack,count,end + b*1)
					if(blackFallDown){return blackFallDown;}}
					}
				if(method == 1 && val == 2){
					if(allChess.indexOf(end + b*-1) == -1 && allChess.indexOf(end + b*3) == -1){
					blackFallDown = computerLazi(numWhite,numBlack,count,end + b*2)
					if(blackFallDown){return blackFallDown;}}
					}
				if(method == 2 && val == 2){
					if(allChess.indexOf(end + b*-1) == -1 && allChess.indexOf(end + b*3) == -1){
					blackFallDown = computerLazi(numWhite,numBlack,count,end + b*2)
					if(blackFallDown){return blackFallDown;}}
					}
				if(wOrB.indexOf(end + b*methodval[1]) != -1){
					for (var n = 0; n < 3; n++) {
						if(wOrB.indexOf(end + b*methodval[2]) != -1 && method == n && val == 4){
							blackFallDown = computerLazi(numWhite,numBlack,count,end + b*methodval[3])
							if(blackFallDown){return blackFallDown;}
						}
					}
					if(method == 1 && val == 3){
						if(allChess.indexOf(end + b*-1) == -1){
						blackFallDown = computerLazi(numWhite,numBlack,count,end + b*3)
						if(blackFallDown){return blackFallDown;}
						}
					}
					if(method == 0 && val == 3){
						if(allChess.indexOf(end + b*-1) == -1 || allChess.indexOf(end + b*4) == -1){
						blackFallDown = computerLazi(numWhite,numBlack,count,end + b*1)
						if(blackFallDown){return blackFallDown;}}
						}
					if(method == 2 && val == 3){
						if(allChess.indexOf(end + b*-1) == -1 || allChess.indexOf(end + b*4) == -1){
						blackFallDown = computerLazi(numWhite,numBlack,count,end + b*2)
						if(blackFallDown){return blackFallDown;}}
						}
					}
				}
			}
		}
	}
}
//其他方向，numBlack为黑色棋子所有数字数组numWhite为白色棋子所有数字数组num为哪个方向count为棋子计数val是控制已经有几个棋子在一块
function lookupNum(whiteOrBlack,blackFallDown,numBlack,numWhite,num,count,val,method){
	switch(method){
		case 0 : var methodval = [2,3,4,1];break;
		case 1 : var methodval = [1,2,3,4];break;
		case 2 : var methodval = [1,3,2,4];break;
	}//3种5子胜利方法，0是00001，1是01000，2是00100
	var allChess = numBlack.concat(numWhite);//所有棋子位置
	var whiteChessArray = whiteOrBlack == 0 ? numWhite : numBlack;//判断攻防
	for (var f = 0; f < whiteChessArray.length; f++) {//每个棋子挨个过
		var end = whiteChessArray[whiteChessArray.length - f- 1];//所要判断的棋子
	if(whiteOrBlack == 0){//攻防定义
		var wOrB = numWhite;//所有白色棋子数组
		var whiOrBla = numBlack;//所有黑色棋子数组
	}else{
		var wOrB = numBlack;
		var whiOrBla = numWhite;
	}
	for (var j = 1; j < 3; j++) {
	j == 1 ? num = num : num = -num;//反向
		if(wOrB.indexOf(end + num*methodval[0]) != -1){//所要判断棋子的后methodval[0]位
			//两个在一起的时候
			if(method == 0 && val == 2){
				if(allChess.indexOf(end + num*-1) == -1 && allChess.indexOf(end + num*3) == -1){
				blackFallDown = computerLazi(numWhite,numBlack,count,end + num*1)
				if(blackFallDown){return blackFallDown;}}
				}
			if(method == 1 && val == 2){
				if(allChess.indexOf(end + num*-1) == -1 && allChess.indexOf(end + num*3) == -1){
				blackFallDown = computerLazi(numWhite,numBlack,count,end + num*2)
				if(blackFallDown){return blackFallDown;}}
				}
			if(method == 2 && val == 2){
				if(allChess.indexOf(end + num*-1) == -1 && allChess.indexOf(end + num*3) == -1){
				blackFallDown = computerLazi(numWhite,numBlack,count,end + num*2)
				if(blackFallDown){return blackFallDown;}}
				}
			if(wOrB.indexOf(end + num*methodval[1]) != -1){
				for (var n = 0; n < 3; n++) {
					//4个在一起的时候
					if(wOrB.indexOf(end + num*methodval[2]) != -1 && method == n && val == 4){
						blackFallDown = computerLazi(numWhite,numBlack,count,end + num*methodval[3])
						if(blackFallDown){return blackFallDown;}
						}
					}
				//3个在一起的时候
				if(method == 1 && val == 3){
					if(allChess.indexOf(end + num*-1) == -1){
					blackFallDown = computerLazi(numWhite,numBlack,count,end + num*3)
					if(blackFallDown){return blackFallDown;}}
					}
				if(method == 0 && val == 3){
					if(allChess.indexOf(end + num*-1) == -1 || allChess.indexOf(end + num*4) == -1){
					blackFallDown = computerLazi(numWhite,numBlack,count,end + num*1)
					if(blackFallDown){return blackFallDown;}}
					}
				if(method == 2 && val == 3){
					if(allChess.indexOf(end + num*-1) == -1 || allChess.indexOf(end + num*4) == -1){
					blackFallDown = computerLazi(numWhite,numBlack,count,end + num*2)
					if(blackFallDown){return blackFallDown;}}
					}
				}
			}
		}
	}
}
//人机算法
function ManMachineAlgorithm(count){
	var numBlack = new Array();//黑色棋子所有位置数字数组
	var numWhite = new Array();//白色棋子所有位置数字数组
		for (var h = 0; h < whiteWin.length; h++) {
			numWhite[numWhite.length] = parseInt(whiteWin[h]);
		}//将原字符串数组变为数字数组
		for (var k = 0; k < blackWin.length; k++) {
			numBlack[numBlack.length] = parseInt(blackWin[k]);
		}//将原字符串数组变为数字数组
	var blackFallDown = false;
	for (var b = 4; b > 1; b--) {//从4个在一起开始判断
		for (var v = 1; v >= 0; v--) {	//偏攻
//		for (var v = 0; v < 2; v++) {	//偏防
			for (var c = 0; c < 3; c++) {//方法
				blackFallDown = lookupNumTransverse(v,blackFallDown,numBlack,numWhite,count,b,c);
				if(blackFallDown){return;}
				blackFallDown = lookupNum(v,blackFallDown,numBlack,numWhite,19,count,b,c);
				if(blackFallDown){return;}
				blackFallDown = lookupNum(v,blackFallDown,numBlack,numWhite,20,count,b,c);
				if(blackFallDown){return;}
				blackFallDown = lookupNum(v,blackFallDown,numBlack,numWhite,18,count,b,c);
				if(blackFallDown){return;}
			}
		}
	}
	if(count != 1){//第一次在白棋周围随机出现
		do{
			var chessOver = true;
			var randomOneNum = randomNum(1,-1,18,-18,19,-19,20,-20);
			var blackEnd = numBlack[numBlack.length - 1];
			chessOver = !computerLazi(numWhite,numBlack,count,blackEnd + randomOneNum)
		}while(chessOver);
	}else{//如果以上函数均跑完还未落子，则在最后一枚黑棋周围随机出现
		var chessOver = true;
		var randomOneNum = randomNum(1,-1,18,-18,19,-19,20,-20);
		var whiteEnd = numWhite[numWhite.length - 1];
		chessOver = !computerLazi(numWhite,numBlack,count,whiteEnd + randomOneNum)
	}
}
//落子函数
function computerLazi(numWhite,numBlack,count,posit){
	if(numWhite.indexOf(posit) == -1 && numBlack.indexOf(posit) == -1){
		$(posit).innerHTML = "<div class='black' id='"+count+"chess'></div>";
		blackWin[blackWin.length] = posit;
		return true;
	}
	return false;
}