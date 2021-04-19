//1.写一个程序，用变量保存自己的个人信息，并且输出！
function personalInformation(){
	var personalInf = "高占江";
	$("personalInforma").value = personalInf;
}
function cleanpersonal(){
	$("personalInforma").value = "";
}
//2.使用变量保存三角形的底和高，计算出三角形的面积
function calculationSecond(){
	var b = $("secondBottom").value;
	var h = $("secondHeight").value;
	var theMeasureOfArea = (b*h)/2;
	$("secondSurfaceArea").value = theMeasureOfArea;
}
function cleanSecond(){
	$("secondBottom").value = "";
	$("secondHeight").value = "";
	$("secondSurfaceArea").value = "";
}
//3.从键盘上输入圆柱体的底面半径和高，输出圆柱体的体积和表面积
function calculationThird(){
	var r = parseInt($("Thirdbuttom").value);
	var h = parseInt($("Thirdheight").value);
	var superficialArea = Math.PI*2*r*(r+h);
	var volume = Math.PI*r*r*h;
	superficialArea = superficialArea.toFixed(2);
	volume = volume.toFixed(2);
	$("ThirdSurfaceArea").value = superficialArea;
	$("Thirdvolume").value = volume;
}
function cleanThird(){
	$("ThirdSurfaceArea").value = "";
	$("Thirdvolume").value = "";
	$("Thirdbuttom").value = "";
	$("Thirdheight").value = "";
}
//4.从键盘上输入梯形的上底，下底和高，计算出梯形的面积
function calculationFourth(){
	var a = parseInt($("topBottom").value);
	var c = parseInt($("bottomBottom").value);
	var h = parseInt($("fourthheight").value);
	var theMeasureOfArea = (a+c)*h/2;
	$("fourthSurfaceArea").value = theMeasureOfArea;
}
function cleanFourth(){
	$("topBottom").value = "";
	$("bottomBottom").value = "";
	$("fourthheight").value = "";
	$("fourthSurfaceArea").value = "";
}
//5.现在有n条记录（从键盘上输入），每页的记录条数是pageSize(从键盘上输入)，计算出这么多记录是几页，另外还剩余几条记录
function calculationFifth(){
	var total = parseInt($("FifthTotal").value);
	var Singular = parseInt($("FifthSingular").value);
	$("FifthNumber").value = Math.floor(total/Singular);
	$("FifthRemainder").value = total%Singular;
}
function cleanFifth(){
	$("FifthTotal").value = "";
	$("FifthSingular").value = "";
	$("FifthNumber").value = "";
	$("FifthRemainder").value = "";
}
//6.从键盘上输入人民币的金额，计算出最少要几张人民币！
function calculationSixTh(){
	var sum = parseInt($("sixthSum").value);
	var sum100 = Math.floor(sum/100);
	var sum50 = Math.floor(sum%100/50);
	var sum20 = Math.floor(sum%100%50/20);
	var sum10 = Math.floor(sum%100%50%20/10);
	var sum5 = Math.floor(sum%100%50%20%10/5);
	var sum1 = Math.floor(sum%100%50%20%10%5);
	$("sixth100").value = sum100;
	$("sixth50").value = sum50;
	$("sixth20").value = sum20;
	$("sixth10").value = sum10;
	$("sixth5").value = sum5;
	$("sixth1").value = sum1;
}
function cleanSixTh(){
	$("sixthSum").value = "";
	$("sixth100").value = "";
	$("sixth50").value = "";
	$("sixth20").value = "";
	$("sixth10").value = "";
	$("sixth5").value = "";
	$("sixth1").value = "";
}
//7.从键盘上输入两个数字，求出这2个数字的和差积商，若第二个数字为0，则商出入除数不能为0
function calculationSeventh(){
	var first = parseInt($("seventhOneNumber").value);
	var second = parseInt($("seventhTwoNumber").value);
		$("seventh1").value = first+second;
		$("seventh2").value = first-second;
		$("seventh3").value = first*second;
		if(second != 0){
		$("seventh4").value = first/second;
	}else{
		alert("计算错误，除数不能为0!");
		$("seventh4").value = "错误";
	}
}
function cleanSeventh(){
		$("seventhOneNumber").value = "";
		$("seventhTwoNumber").value = "";
		$("seventh1").value = "";
		$("seventh2").value = "";
		$("seventh3").value = "";
		$("seventh4").value = "";
}
//8.输入华氏温度f，计算并输出相应的摄氏温度c。c = 5/9(f-32).
function calculationEighth(){
	var f = parseInt($("eighthFahrenheit").value);
	var c = 5/9*(f-32);
	c = c.toFixed(2);
	$("eighthT").value = c;
}
function cleanEighth(){
	$("eighthFahrenheit").value = "";
	$("eighthT").value = "";
}