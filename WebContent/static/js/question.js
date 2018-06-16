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

  // 点击评论
  function getComment(commentbox,aid){
    var commentcontent = commentbox.children(":first-child");
    data = {"aid":aid};
    $.ajax({
      url: "/Jweb_template/GetComment",
      dataType: "json",
      async: true,
      data: data,
      type: "POST",
      success: function(data) {
        data = data.comments;
        window.data = data;
        commentcontent.children().remove();
        commentcontent.append($('<div>').addClass('comment-item').html('<span class="question-title">'+data.length+'条评论</span>'));
        for(var i=0;i<data.length;i++){
          var item = $('<div>').addClass('comment-item');
          console.log(data[i].tousername);
          if(data[i].tousername!=null){
            item.append($('<p>').html(data[i].username+" <span class='small-gray'>回复</span> "+data[i].tousername));
          }else{
            item.append($('<p>').html(data[i].username));
          }
          item.append($('<p>').addClass('comment-details').html(data[i].content).val(data[i].uid));
          item.append($('<p>').addClass('small-gray').html(data[i].date));
          // 回复表单
          var box = $('<div>').addClass('form-group').hide().appendTo(item);
          $('<textarea>').addClass('form-control').appendTo(box);
          $('<button>').addClass('btn-blue reply-btn').html('回复').data({"cid":data[i].cid,"aid":data[i].aid}).appendTo(box);
          commentcontent.append(item);
        }
        $('.comment-details').click(replypop);
        $('.reply-btn').click(replypublish);
      },
      complete: function() {
      },
      error: function() {
      }
    });
  }
  $('.comment-btn').click(function(){
    var commentbox = $(this).parent().next();
    if(commentbox.is(':hidden')){
      var aid = $(this).val();
      getComment(commentbox,aid);
      $(this).html($(this).html().substring(0,50)+"收起评论");
    }else{
      $(this).html($(this).html().substring(0,50)+"查看评论");
    }
    commentbox.toggle(500);
  });
  // end点击评论

  // 回复窗口
  function replypop(){
    var uid = $(this).val();
    $(this).next().next().toggle(500);
  }
  // end回复窗口

  // 发表评论
  $('.comment-publish').click(function(){
    var aid = $(this).val();
    var input = $(this).prev().children();
    var commentbox = $(this).parent().parent();
    var content = input.val();
    var data = {"aid":aid,"content":content,"cid":null};
    $.ajax({
      url: "/Jweb_template/CommentPublish",
      dataType: "text",
      async: true,
      data: data,
      type: "POST",
      success: function(data) {
        if(data.trim()=='ok'){
          getComment(commentbox,aid);
          alert('评论成功');
          input.val("");
        }
      },
      complete: function() {
      },
      error: function() {
      }
    });
  });
  // end发表评论

  // 发表回复
  function replypublish(){
    var aid = $(this).data("aid");
    var cid = $(this).data("cid");
    var content = $(this).prev().val();
    var commentbox = $(this).parent().parent().parent().parent();
    var data = {"aid":aid,"content":content,"cid":cid};
    console.log(data);
    $.ajax({
      url: "/Jweb_template/CommentPublish",
      dataType: "text",
      async: true,
      data: data,
      type: "POST",
      success: function(data) {
        if(data.trim()=='ok'){
          getComment(commentbox,aid);
          alert('回复成功');
          input.val("");
        }
      },
      complete: function() {
      },
      error: function() {
      }
    });

  }
  // end发表回复

  //注销
  function logout(){
    $.get("/Jweb_template/Logout");
    location.href = "../signup.html";
  }
  $('#logout').click(logout);
});
