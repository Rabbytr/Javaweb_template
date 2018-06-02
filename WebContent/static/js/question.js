$(document).ready(function(){

  // 获取用户信息
  function islogin(){
    $.ajax({
      url: "/Jweb_template/GetUserInfo",    //请求的url地址
      dataType: "json",   //返回格式为json
      async: false, //请求是否异步
      data: null,    //参数值
      type: "POST",   //请求方式
      success: function(data) {
        //请求成功时处理
        window.data = data;
        if(data.state.trim()=='ok'){
          $('#username').html(data.username);
        }else {
          location.href = "../signup.html";
        }
      },
      complete: function() {
      },
      error: function() {
      }
    });
  }
  islogin();

  // 提交答案
  $('#answer-publish').click(function(){
    islogin();
    var content = $('#answer-content').val();
    data = {"content":content};
    $.ajax({
      url: "/Jweb_template/AnswerPublish",    //请求的url地址
      dataType: "text",   //返回格式为json
      async: true, //请求是否异步
      data: data,    //参数值
      type: "POST",   //请求方式
      success: function(data) {
        //请求成功时处理
        console.log(data);
        if(data.trim()=='ok'){
          alert('回答成功');
          location.reload();
        }else {
          alert('回答失败');
        }
      },
      complete: function() {
      },
      error: function() {
      }
    });
  });
  // end 提交答案

  //绑定 提问 事件
  $('#putanswer').click(function(){
    $('.modal-wrapper').css('display','flex');
  });
  $('.modal-wrapper').click(function(e){
    var popup = $(".modal");
    if (!popup.is(e.target) && popup.has(e.target).length == 0) {
      $('.modal-wrapper').hide();
    }
  });
  // end 提问 事件

  //注销
  function logout(){
    $.get("/Jweb_template/Logout");
    location.href = "../signup.html";
  }
  $('#logout').click(logout);
});
