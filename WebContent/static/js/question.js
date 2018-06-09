$(document).ready(function(){

  // 获取用户信息
  function islogin(){
    $.ajax({
      url: "/Jweb_template/GetUserInfo",
      dataType: "json",   //返回格式为json
      async: false, //请求是否异步
      data: null,    //参数值
      type: "POST",   //请求方式
      success: function(data) {
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
      url: "/Jweb_template/AnswerPublish",
      dataType: "text",
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

  // 点赞
  function star(){
    btn = $(this);
    var aid = btn.val();
    data = {"aid":aid,"flag":false};
    $.ajax({
      url: "/Jweb_template/Starfun",    //请求url
      dataType: "json",
      async: true, //请求是否异步
      data: data,
      type: "POST",
      success: function(data) {
        if(data.state.trim()=='ok'){
          btn.html('<span class="glyphicon glyphicon-triangle-bottom"></span> '+data.stars).removeClass().addClass('btn-stared');
          btn.unbind().click(unstar);
        }else {
          alert('你已经点过赞了');
        }
      },
      complete: function() {
      },
      error: function() {
      }
    });
  }
  function unstar(){
    btn = $(this);
    var aid = btn.val();
    data = {"aid":aid,"flag":true};
    $.ajax({
      url: "/Jweb_template/Starfun",    //请求的url地址
      dataType: "json",
      async: true, //请求是否异步
      data: data,    //参数值
      type: "POST",   //请求方式
      success: function(data) {
        if(data.state.trim()=='ok'){
          btn.html('<span class="glyphicon glyphicon-triangle-top"></span> '+data.stars).removeClass().addClass('btn-star');
          btn.unbind().click(star);
        }else {
          alert('你还没点过赞');
        }
      },
      complete: function() {
      },
      error: function() {
      }
    });
  }
  $('.btn-star').click(star);
  $('.btn-stared').click(unstar);
  // end 点赞

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
