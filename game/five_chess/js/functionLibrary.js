//产生随机数:	start:开始	end:结束		length：长度
function randomNumber(start,end,length){
	var balls = new Array();
	if (length > end - start +1) {
		alert("参数有误");
	}else{
		var size = end - start + 1;
		var allBalls = new Array(size);
		for (var i = 0; i < allBalls.length; i++) {
			allBalls[i] = i + start;
		}
		while(balls.length < length){
			var m = Math.floor(Math.random()*size);
			if(allBalls[m]!= 0){
				if (allBalls[m] < 10) {
					balls[balls.length] = "0"+allBalls[m];
				}else{
					balls[balls.length] = allBalls[m];
				}
				allBalls[m] = 0;
			}
		}
		balls.sort();	
		return balls;	
	}
}

//用$代替document.getElementById():
function $(id){
	return document.getElementById(id);
}
//用$$代替document.getElementsByName():
function $$(name){
	return document.getElementsByName(name);
}
//数组排序:	var 数列 = 数列.sort(sortNumber);
function sortNumber(a,b)
{
return a - b;
}
//合并字符串:  arr:字符串	joinOperator:合并的符号	var 数列 = joinArray2String(arr,joinOperator);
function joinArray2String(arr,joinOperator){
	var ns = arr[0];
	for (var i = 1; i < arr.length; i++) {
	ns += joinOperator + arr[i] ;
	}
		return ns;
}
//计数器	arr:数列		element:计的数字
function myCounter(arr,element){
	var count = 0;
	var indexes = new Array();
	var values = new Array();
	for (var i = arr.length-1; i >= 0; i--) {
		if(arr[i] > element){
			indexes[count] = i;
			values[count] = arr[i];
			count++;
		}
	}
	return count;
}
//冒泡排序		array:数列	sort:ture/false		新数列 = sortArray(旧数列,ture/false);
function sortArray(array,sort){
	for (var i = 0; i < array.length - 1; i++) {
		for (var j = 0; j < array.length - 1 - i; j++) {
			
			if(sort){
				if (array[j] < array[j+1]) {
					var temp = array[j];
					array[j] = array[j+1];
					array[j+1] = temp;
				}
			}else{
				if (array[j] > array[j+1]) {
					var temp = array[j];
					array[j] = array[j+1];
					array[j+1] = temp;
				}
			}
		}
			
	}
	return array;
}
//替换字符串		str旧字符串	oldStr:需要替换的字符		newSt:替换的字符
function replaceAll(str,oldStr,newStr){
	var s = str.split(oldStr);
	var dest = "";
	for (var i = 0; i < s.length; i++) {
		dest += s[i] + newStr;
	}
	return dest.substr(0,dest.length-newStr.length);
}
//倒计时函数
function leftTimer(year,month,day,hour,minute,second){
	 var leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数 
	 var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
	 var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
	 var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
	 var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
	 days = checkTime(days); 
	 hours = checkTime(hours); 
	 minutes = checkTime(minutes); 
	 seconds = checkTime(seconds); 
	 setInterval("leftTimer(2016,11,11,11,11,11)",1000); 
	 $("timer").innerHTML = days+"天" + hours+"小时" + minutes+"分"+seconds+"秒"; 
}
function checkTime(val){ //将0-9的数字前面加上0，例1变为01 
 if(val<10) 
 { 
  val = "0" + val; 
 } 
 return val; 
}


//计时函数
var hour,minute,second;//时 分 秒
hour=minute=second=0;//初始化
var millisecond=0;//毫秒
var openingTime;
function ResetTime()//重置
    {
      window.clearInterval(openingTime);
      millisecond=hour=minute=second=0;
      $('timeText').innerHTML=00+':'+00;
    }
  
function startTime()//开始
    {
      openingTime=setInterval(timerTime,50);
    }
function stopTime()//暂停
    {
      window.clearInterval(openingTime);
    }
function timerTime()//计时
    {
      millisecond=millisecond+50;
      if(millisecond>=1000)
      {
        millisecond=0;
        second=second+1;
      }
      if(second>=60)
      {
        second=0;
        minute=minute+1;
      }
      if(minute>=60)
      {
        minute=0;
        hour=hour+1;
      }
     hours = checkTime(hour); 
	 minutes = checkTime(minute); 
	 seconds = checkTime(second); 
      $('timeText').innerHTML = minutes + ':' + seconds;
}

//倒计秒函数
function secondTimer(winOrLose){
	num = 31; //倒计时的秒数 
	if(WinNumber > 0){
			if(winOrLose == 0){
				ourTimer1 = setInterval('doUpdateWhiteWin()',1000);
			}else{
				ourTimer2 = setInterval('doUpdateBlackWin()',1000);
		}
	}
}
function doUpdateWhiteWin(){
	num--;
	$('fiveTimer').innerHTML = num+'秒' ; 
	if(num == 0) {
		alert("黑方落子超时，本局白方获胜");
		whiteGameWin ++;
		window.clearInterval(ourTimer1);//清掉白方定时
		stopTime();
		$("whiteFall").disabled = true;
		end = 1;
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
	}
}
function doUpdateBlackWin(){
	num--;
	$('fiveTimer').innerHTML = num+'秒' ; 
	if(num == 0) {
		alert("白方落子超时，本局黑方获胜");
			blackGameWin ++;
			window.clearInterval(ourTimer2);//清掉黑方定时
			stopTime();
			$("blackFall").disabled = true;
			end = 1;
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
//动态加载 CSS 文件
//dynamicLoading.css("test.css");
//动态加载 JS 文件
//dynamicLoading.js("test.js");
