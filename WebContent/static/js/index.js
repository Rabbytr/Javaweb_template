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
      timeout: 5000,
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
        alert('请求服务器失败');
      }
    });
  }
  islogin();

  // 获取 问题信息
  function getIndexInfo(){
    var data = {"type":"topten"};
    $.ajax({
      url: "/Jweb_template/GetQuestions",    //请求的url地址
      dataType: "json",   //返回格式为json
      async: false, //请求是否异步
      data: data,    //参数值
      type: "POST",   //请求方式
      timeout: 5000,
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
        alert('请求服务器失败');
      }
    });
  }
  function search(){
	    var keywords = $('#keyword-input').val();
      if(keywords==''){
        alert('搜索内容不能为空');
        return;
      }
	    var data = {"type":"search","keywords":keywords};
	    $.ajax({
	      url: "/Jweb_template/GetQuestions",    //请求的url地址
	      dataType: "json",   //返回格式为json
	      async: false, //请求是否异步
	      data: data,    //参数值
	      type: "POST",   //请求方式
        timeout: 5000,
	      success: function(data) {
          $('#question-container').children().remove();
	        data = data.questions;
	        window.data = data;
          if(data.length==0){
            $('#question-container').append($('<p>').html('没有你要的结果'));
          }
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
          alert('请求服务器失败');
	      }
	    });
      $('.question-title').click(questionclick);
        $('.comment-btn').click(questionclick);
	  }
  // end 获取问题信息

  // 搜索
  $('#search-btn').click(search);
  // end搜索

  // 问题点击事件
  function questionclick(){
    var qid = $(this).val();
    location.href = "Question/"+qid;
  }
  // end 问题点击事件

  // 点赞事件
  function star(){
    var aid = $(this).val();
    data = {"aid":aid,"flag":false};
    $.ajax({
      url: "/Jweb_template/Starfun",    //请求的url地址
      dataType: "json",
      async: true, //请求是否异步
      data: data,    //参数值
      type: "POST",   //请求方式
      timeout: 5000,
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
        alert('请求服务器失败');
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
      timeout: 5000,
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
          alert('请求服务器失败');
      }
    });
  }
  // end点赞事件

  // 问题区初始化
  function init(type){
	  $('#question-container').children().remove();
		getIndexInfo('topten');
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
    if(title==''){
      alert('问题标题不能为空');
      return;
    }
    var content = $('#question-content').val();
    if(content==''){
      alert('问题描述不能为空');
      return;
    }
    data = {"title":title,"content":content};
    $.ajax({
      url: "/Jweb_template/QuestionPublish",    //请求的url地址
      dataType: "text",   //返回格式为json
      async: true, //请求是否异步
      data: data,    //参数值
      type: "POST",   //请求方式
      timeout: 5000,
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
        alert('请求服务器失败');
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
    location.href = "signup.html";
  }
  $('#logout').click(logout);
});
