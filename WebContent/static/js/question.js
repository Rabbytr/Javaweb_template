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
    if(content==''){
      alert('输入内容不能为空');
      return;
    }
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
    $('#question-modal-wrapper').css('display','flex');
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
          if(data[i].hasreplies){
            item.append($('<button>').addClass('btn btn-link showreply-btn').html('<span class="glyphicon glyphicon-leaf"></span> 查看对话').val(data[i].cid));
          }else{
            item.append($('<p>').addClass('showreply-btn').html('').val(data[i].cid));
          }

          // 回复表单
          var box = $('<div>').addClass('form-group').hide().appendTo(item);
          $('<textarea>').addClass('form-control').appendTo(box);
          $('<button>').addClass('btn-blue reply-btn').html('回复').data({"cid":data[i].cid,"aid":data[i].aid}).appendTo(box);
          commentcontent.append(item);
        }
        $('.comment-details').click(replypop);
        $('.reply-btn').click(replypublish);
        $('.showreply-btn').click(showreply);
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
    $(this).next().next().next().toggle(500);
  }
  // end回复窗口

  // 查看对话
  function showreply(){
    var cid = $(this).val();
    $('#comment-modal-wrapper').css('display','flex');
    data = {"cid":cid};
    $.ajax({
      url: "/Jweb_template/GetReplies",
      dataType: "json",
      async: true,
      data: data,
      type: "POST",
      success: function(data) {
        data = data.replies;
        window.data = data;
        var box = $('#comment-modal');
        box.children().remove();
        box.append($('<div>').addClass('modal-title').html(data.length+' 条回复'));
        for(var i=0;i<data.length;i++){
          var item = $('<div>').addClass('comment-item');

          item.append($('<p>').html(data[i].username));
          item.append($('<p>').html(data[i].content));
          item.append($('<p>').addClass('small-gray').html(data[i].date));

          box.append(item);
        }
      },
      complete: function() {
      },
      error: function() {
      }
    });
  }
  // end查看对话

  // 发表评论
  $('.comment-publish').click(function(){
    var aid = $(this).val();
    var input = $(this).prev().children();
    var commentbox = $(this).parent().parent();
    var content = input.val();
    if(content==''){
      alert('输入内容不能为空');
      return;
    }
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
    if(content==''){
      alert('输入内容不能为空');
      return;
    }
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

  // 特效
  $('body').mousedown(function(event){
    texts = ['富强','民主','文明','和谐','自由','平等',
    '公正','法治','爱国','敬业','诚信','友善']
    x = event.clientX;
    y = event.clientY;
    ind = Math.floor(texts.length*Math.random());
    color = "#"+Math.round(Math.random()*(1<<22));
    var showtext = $('<span>').html(texts[ind]);
    showtext.css({
      "top":(y-20),
      "left":(x+10),
      "position":"absolute",
      "color":color,
      "font-weight":"bold",
      "font-size":"20px",
      "cursor":"pointer"
    });
    $(this).append(showtext);
    showtext.animate(
      {"top": y - 180,"opacity": 0},
      1000,
      function(){
        this.remove();
      });
    });
  // end特效

  //注销
  function logout(){
    $.get("/Jweb_template/Logout");
    location.href = "../signup.html";
  }
  $('#logout').click(logout);
});
