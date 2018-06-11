$(document).ready(function(){
  //$('.modal-wrapper').css('display','flex');
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
          location.href = "./signup.html";
        }
      },
      complete: function() {
      },
      error: function() {
      }
    });
  }
  islogin();

  // 获取 问题信息
  function getIndexInfo(){
    $.ajax({
      url: "/Jweb_template/GetQuestions",    //请求的url地址
      dataType: "json",   //返回格式为json
      async: false, //请求是否异步
      data: null,    //参数值
      type: "POST",   //请求方式
      success: function(data) {
        data = data.questions;
        window.data = data;
        for(var i=0;i<data.length;i++){
          var t = data[i];
          var card = $('<div>').addClass('card');
          if(t.answer!=null){
            card.append($('<p>').addClass('question-title').html(t.title).val(t.qid));
            card.append($('<p>').addClass('small-gray').html(t.answer.stars+"人赞同了该回答"));
            card.append($('<p>').addClass('most-anwser').html(t.answer.content));
            card.append($('<p>').addClass('small-gray').html(t.answer.date));
            var foot = $('<div>').addClass('question-foot');
            if(!t.answer.stared)
            foot.append($('<button>').addClass('btn-star').html('<span class="glyphicon glyphicon-triangle-top"></span> '+t.answer.stars).val(t.answer.aid));
            else foot.append($('<button>').addClass('btn-stared').html('<span class="glyphicon glyphicon-triangle-bottom"></span> '+t.answer.stars).val(t.answer.aid));
            foot.append($('<button>').addClass('btn btn-link comment-btn').html('<span class="glyphicon glyphicon-comment"></span> 添加评论').val(t.qid));
            foot.append($('<button>').addClass('btn btn-link').html('<span class="glyphicon glyphicon-send"></span> 分享'));
            foot.append($('<button>').addClass('btn btn-link').html('<span class="glyphicon glyphicon-star"></span> 收藏'));
            card.append(foot);
          }else{
            card.append($('<p>').addClass('question-title').html(t.title).val(t.qid));
            card.append($('<p>').addClass('most-anwser').html("目前还没有回答"));
          }
          $('#question-container').append(card);
        }
      },
      complete: function() {
      },
      error: function() {
      }
    });
  }
  // end 获取问题信息

  // 问题点击事件
  function questionclick(){
    var qid = $(this).val();
    location.href = "Question/"+qid;
  }
  // end 问题点击事件

  // 点赞事件
  function star(){
    var aid = $(this).val();
    console.log(aid);
    data = {"aid":aid,"flag":false};
    $.ajax({
      url: "/Jweb_template/Starfun",    //请求的url地址
      dataType: "json",
      async: true, //请求是否异步
      data: data,    //参数值
      type: "POST",   //请求方式
      success: function(data) {
        if(data.state.trim()=='ok'){
          init();
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
    var aid = $(this).val();
    data = {"aid":aid,"flag":true};
    $.ajax({
      url: "/Jweb_template/Starfun",    //请求的url地址
      dataType: "json",
      async: true, //请求是否异步
      data: data,    //参数值
      type: "POST",   //请求方式
      success: function(data) {
        if(data.state.trim()=='ok'){
          init();
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
  // end点赞事件

  // 问题区初始化
  function init(){
	  $('#question-container').children().remove();
      getIndexInfo();
	  $('.btn-star').click(star);
	  $('.btn-stared').click(unstar);
	  $('.question-title').click(questionclick);
    $('.comment-btn').click(questionclick);
  }
  init();
  // end问题区初始化

  // 提交问题
  function questionpublish(){
    islogin();
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
        if(data.trim()=='ok'){
          $('.modal-wrapper').hide();
          init();
          alert('发表成功');
        }else {
          alert('发表失败');
        }
      },
      complete: function() {
      },
      error: function() {
      }
    });
  }
  $('#question-publish').click(questionpublish);
  // end 提交问题

  //绑定 提问 事件
  $('#putquestion').click(function(){
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
    location.href = "signup.html";
  }
  $('#logout').click(logout);
});
