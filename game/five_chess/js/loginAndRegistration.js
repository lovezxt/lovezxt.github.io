var userName = "";
var passWords = "";
var mail = "";
var tel = "";

var enrollSuccssful = 0;//注册成功标志1
var entrySuccessful = 0;//登陆成功标志1
//获取验证码函数
function getVerifyingCode(){
	var identifyingCode = randomNumber(1000,9999,1);
	$("onVerificationCode").value = identifyingCode;
}
//注册函数
function enroll(){
	var passWordsFirst = $("firstNumberPassWord").value;
	var passWordsSecond = $("secondNumberPassWord").value;
	userName = $("NumberName").value;
	mail = $("mailBox").value;
	tel = $("telephone").value;
	if(passWordsFirst == passWordsSecond){
		passWords = passWordsFirst;
		}
	if(userName != ""){
		if(mail != ""){
			if(tel != ""){
				if(passWords != ""){
						enrollSuccssful = 1;
				}
			}
		}
	}
	if(enrollSuccssful == 0){
		alert("注册失败，请核对信息再试");
		userName = "";
		passWords = "";
		mail = "";
		tel = "";
	}else{
	alert("注册成功，请登录游戏");
	window.location.href="../login.html";
	}
}

//登陆函数
function signIn(){
	var nameValue = $("loginName").value;
	var passWordsValue = $("passwordName").value;
	if(nameValue != "" && passWordsValue != ""){
			loginOnTrue1.style.display="block";
			loginOnTrue2.style.display="block";
			loginOnFlase1.style.display="none";
			loginOnFlase2.style.display="none";
			alert("登陆成功，请开始游戏");
			window.location.href="subweb/index.html";
		}
	else if(nameValue == "" && passWordsValue != ""){
		alert("请输入用户名");
		loginOnTrue1.style.display="none";
		loginOnTrue2.style.display="block";
		loginOnFlase1.style.display="block";
		loginOnFlase2.style.display="none";
	}else if(nameValue != "" && passWordsValue == ""){
		alert("请输入密码");
		loginOnTrue1.style.display="block";
		loginOnFlase2.style.display="block";
		loginOnTrue2.style.display="none";
		loginOnFlase1.style.display="none";
	}else{
		alert("请输入用户名和密码");
		loginOnTrue1.style.display="none";
		loginOnTrue2.style.display="none";
		loginOnFlase1.style.display="block";
		loginOnFlase2.style.display="block";
	}
}
//联系我们
function contactUsGo(){
	alert("联系邮箱:gzj@xijingdaxue.onmicrosoft.com");
}
