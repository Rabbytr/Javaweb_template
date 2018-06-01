$(document).ready(function(){
  //登录
  function login(){
    var phonenumber = $('#login-phonenumber').val();
    var password = $('#login-password').val();
    var data = {"phonenumber":phonenumber,"password":password};
    $.ajax({
    url: "/Jweb_template/Login",    //请求的url地址
    dataType: "text",   //返回格式为json
    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
    data: data,    //参数值
    type: "POST",   //请求方式
    success: function(data) {
    //请求成功时处理
    	console.log(data);
      if(data.trim()=='ok'){
        alert('登录成功');
        location.href = "index.html";
      }else {
        alert('登录失败');
      }
    },
    complete: function() {
      //请求完成的处理
    },
    error: function() {
      //请求出错处理
    }
  });
  }
  $('#login-btn').click(login);
  //注册
  function rigister(){
    var phonenumber = $('#rigister-phonenumber').val();
    var password = $('#rigister-password').val();
    var rpassword = $('#rigister-rpassword').val();
    var data = {"phonenumber":phonenumber,"password":password,"rpassword":rpassword};
    $.ajax({
    url: "/Jweb_template/Rigister",    //请求的url地址
    dataType: "text",   //返回格式为json
    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
    data: data,    //参数值
    type: "POST",   //请求方式
    success: function(data) {
    //请求成功时处理
      console.log(data);
      if(data.trim()=='ok'){
        alert('注册成功');
      }else {
        alert('注册失败');
      }
      $('#login-link').click();
    },
    complete: function() {
      //请求完成的处理
    },
    error: function() {
      //请求出错处理
    }
  });
  }
  $('#rigister-btn').click(rigister);
  //登录和注册切换
  $('#login-link').click(function(){
    $('#rigister-container').hide(600);
    $('#login-container').show(600);
  });
  $('#rigister-link').click(function(){
    $('#login-container').hide(600);
    $('#rigister-container').show(600);
  });
});
