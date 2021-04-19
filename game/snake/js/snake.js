var keyNum = "";//键值
var food = "";//食物
var len = 11;//蛇长度
var speed = 200;//速度
var over = true;//游戏结束
var pause = false;//开始暂停
var snakeGo = "";//定时器控制蛇前进
var stepNumber = 0;//计数器，总共步数
var directionRecord = 39;//记录方向
document.onkeydown=showkey;//检测按键
var directionNumber = 1;//控制上下左右的数字
var snakeLength = [0,1,2,3,4,5,6,7,8,9,10];//蛇的数组，最后一位为蛇头
function snakeDiv(){
	var str = "";
	for (var i=0;i<2025;i++) {
		str += '<div id = "'+i+'"></div>'
	}
	$("bigDiv").innerHTML = str;//生成2025个小Div框
	snakeColor();//给蛇上颜色
	foodNoRepeat();//产生食物
}
//蛇一直在走
function snakeWalk(){
	for (var j = 0; j < snakeLength.length; j++) {
		$(snakeLength[j]).className = "";
	}//清除所有颜色
	var tail = snakeLength.shift();//截掉蛇尾
	snakeLength[snakeLength.length] = snakeLength[snakeLength.length - 1] + directionNumber;//蛇头
	theWall();//判断撞墙
	if(!over){
		snakeLength.unshift(tail);//恢复截掉的蛇尾
		snakeLength.pop();//截取新蛇头
		snakeColor();//给蛇上颜色
		alert("游戏结束！得分:"+len);
		return;
	}
	snakeColor();//给蛇上颜色
	someFood();//吃食物函数
	stepNumber++;//记录步数
}
//给蛇上颜色
function snakeColor(){
	for (var j = 0; j < snakeLength.length - 1; j++) {
		$(snakeLength[j]).className = "saddlebrown";//蛇身为棕色
	}
	$(snakeLength[snakeLength.length - 1]).className = "red";//蛇头为红色
}
//产生食物且不与蛇身重复
function foodNoRepeat(){
	do{
		food = randomNum(0,2025);//产生一个0-2025的数
		var foodRepeatSnake = false;
		for (var i = 0; i < snakeLength.length; i++) {//判断与蛇重不重复
			if(snakeLength[i] == food){
				foodRepeatSnake = true;
			}
		}
	}while(foodRepeatSnake);//重复则重新产生
	$(food).className = "green";//食物为绿色
}
//游戏开始
function gameStart(){
	if(stepNumber == 0){
	snakeGo = setInterval("snakeWalk()",speed);//蛇开始走动
	}
}
//吃食物函数
function someFood(){
	if(snakeLength[snakeLength.length - 1] == food){//蛇头与食物重合
		len = snakeLength.push(food);//在蛇的数组中加入食物
		foodNoRepeat();//产生食物
		speedQuickly();//速度增加函数
	}
}
//判断游戏结束*撞墙
function theWall(){
	snakeHead = snakeLength[snakeLength.length - 1];//蛇头
	snakeTail = snakeLength[snakeLength.length - 2];//蛇头后面第一个
	for (var i = 0; i < snakeLength.length - 1; i++) {//自己撞自己
		if(snakeHead == snakeLength[i]){
			gameOver();
			return;
		}
	}
	if(snakeHead < 0 || snakeHead >= 2025){//撞上下墙
		gameOver();
		return;
	}
	if(snakeHead%45 == 0 && snakeTail < snakeHead){//撞右墙
		gameOver();
		return;
	}
	if(snakeTail%45 == 0 && snakeTail > snakeHead){//撞左墙
		gameOver();
		return;
	}
}
//游戏结束
function gameOver(){
	clearInterval(snakeGo);
	over = false;
}
//速度增加函数
function speedQuickly(){
		speed>100 ? speed -= 1 : speed;//吃一个食物速度加1，上限100
		clearInterval(snakeGo);
		snakeGo = setInterval("snakeWalk()",speed);
}
//按键
function showkey(){
	keyNum = event.keyCode;//获取键值
	if(keyNum - directionRecord != 2 && directionRecord - keyNum != 2 && over){//按键与蛇前进方向相反则进不去
		if (keyNum == 37){directionRecord = 37; gameStart(); directionNumber = -1};//左
		if (keyNum == 38){directionRecord = 38; gameStart(); directionNumber = -45};//上
		if (keyNum == 39){directionRecord = 39; gameStart(); directionNumber = 1};//右
		if (keyNum == 40){directionRecord = 40; gameStart(); directionNumber = 45};//下
		if (keyNum == 32){if(pause){pause = !pause;snakeGo = setInterval("snakeWalk()",speed);}else{pause = !pause;clearInterval(snakeGo);}};//空格
	}
}