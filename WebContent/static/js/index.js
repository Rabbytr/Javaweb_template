$(document).ready(function(){
  $('.modal-wrapper').hide();
  // 获取用户信息
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
      location.href = "signup.html";
    }
  },
  complete: function() {
    //请求完成的处理
  },
  error: function() {
    //请求出错处理
  }
});
  // 提交问题
  $('#question-publish').click(function(){
    var title = $('#question-title').val();
    var content = $('#question-content').val();
    data = {"title":title,"content":content};
    $.ajax({
    url: "/Jweb_template/QuestionPublish",    //请求的url地址
    dataType: "text",   //返回格式为json
    async: true, //请求是否异步
    data: data,    //参数值
    type: "POST",   //请求方式
    success: function(data) {
    //请求成功时处理
      console.log(data);
      if(data.trim()=='ok'){
        alert('发表成功');
        location.href = "index.html";
      }else {
        alert('发表失败');
      }
    },
    complete: function() {
      //请求完成的处理
    },
    error: function() {
      //请求出错处理
    }
  });
  });
  // end 提交问题
  //绑定 提问 事件
  $('#putquestion').click(function(){
    $('.modal-wrapper').show();
  });
  $('.modal-wrapper').click(function(e){
    var popup = $(".modal");
    if (!popup.is(e.target) && popup.has(e.target).length == 0) {
      $('.modal-wrapper').hide();
    }
  });
  // end 提问 事件
  //注销
  $('#logout').click(function(){
    $.get("/Jweb_template/Logout");
    location.href = "signup.html";
  });


});
