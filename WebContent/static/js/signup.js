$(document).ready(function(){
  //登录
  function login(){
    if(!loginformvalidation())return;
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
    if(!rigisterformvalidation())return;
    var username = $('#rigister-username').val();
    var phonenumber = $('#rigister-phonenumber').val();
    var password = $('#rigister-password').val();
    var data = {"username":username,"phonenumber":phonenumber,"password":password};
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
  // 表单验证
  $('#login-phonenumber').blur(function(){
    var value = $(this).val();
    if(!value.match(/\d{11}/)){
      $(this).css("border-bottom","1px solid #f00");
      loginflag1 = false;
      return;
    }
    loginflag1 = true;
    $(this).css("border-bottom","1px solid #ebebeb");
  });
  $('#login-password').blur(function(){
    var value = $(this).val();
    if(!value.match(/^[a-z0-9_-]{6,18}$/)){
      $(this).css("border-bottom","1px solid #f00");
      loginflag2 = false;
      return;
    }
    loginflag2 = true;
    $(this).css("border-bottom","1px solid #ebebeb");
  });
  $('#rigister-phonenumber').blur(function(){
    var value = $(this).val();
    if(!value.match(/\d{11}/)){
      $(this).css("border-bottom","1px solid #f00");
      rigisterflag1 = false;
      return;
    }
    $(this).css("border-bottom","1px solid #ebebeb");
    rigisterflag1 = true;
  });
  $('#rigister-password').blur(function(){
    var value = $(this).val();
    if(!value.match(/^[a-z0-9_-]{6,18}$/)){
      $(this).css("border-bottom","1px solid #f00");
      rigisterflag2 = false;
      return;
    }
    rigisterflag2 = true;
    $(this).css("border-bottom","1px solid #ebebeb");
  });
  $('#rigister-username').blur(function(){
    var value = $(this).val();
    if(!value.match(/[a-zA-Z0-9_\u4e00-\u9fa5]+/)){
      $(this).css("border-bottom","1px solid #f00");
      rigisterflag3 = false;
      return;
    }
    rigisterflag3 = true;
    $(this).css("border-bottom","1px solid #ebebeb");
  });
  function validation(node,re){
    var value = node.val();
    if(value.match(re))return true;
    return false;
  }

  function loginformvalidation(){
    var loginflag1 = false;
    var loginflag2 = false;
    if(validation($('#login-phonenumber'),/\d{11}/))loginflag1 = true;
    if(validation($('#rigister-password'),/^[a-z0-9_-]{6,18}$/))loginflag2 = true;
    if(loginflag1&&loginflag2)return true;
    alert('请检查数据输入是否规范');
    return false;
  }
  function rigisterformvalidation(){
    var rigisterflag1 = false;
    var rigisterflag2 = false;
    var rigisterflag3 = false;
    if(validation($('#rigister-phonenumber'),/\d{11}/))rigisterflag1 = true;
    if(validation($('#rigister-password'),/^[a-z0-9_-]{6,18}$/))rigisterflag2 = true;
    if(validation($('#rigister-username'),/[a-zA-Z0-9_\u4e00-\u9fa5]+/))rigisterflag3 = true;
    if(rigisterflag1&&rigisterflag2&&rigisterflag3)return true;
    alert('请检查数据输入是否规范');
    return false;
  }
  $('.input').popover();
  // end表单验证

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
