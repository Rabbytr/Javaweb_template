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

	// 删除问题
	$('.question-delete').click(function(){
		if(!confirm('确定要删除此提问？'))return;
		var btn = $(this);
		var qid = btn.val();
		data = {"type":"qdelete","qid":qid};
	    $.ajax({
		      url: "/Jweb_template/Update",
		      dataType: "text",   //返回格式为json
		      async: true, //请求是否异步
		      data: data,    //参数值
		      type: "POST",   //请求方式
		      success: function(data) {
		        if(data.trim()=="ok"){
		        	alert('删除问题成功');
		        	btn.parent().remove();
		        }
		      },
		      complete: function() {
		      },
		      error: function() {
		      }
		    });
	});
	// end删除问题

	// 删除回答
	$('.answer-delete').click(function(){
		if(!confirm('确定要删除此回答？'))return;
		var btn = $(this);
		var aid = btn.val();
		data = {"type":"adelete","aid":aid};
	    $.ajax({
		      url: "/Jweb_template/Update",
		      dataType: "text",   //返回格式为json
		      async: true, //请求是否异步
		      data: data,    //参数值
		      type: "POST",   //请求方式
		      success: function(data) {
		        if(data.trim()=="ok"){
		        	alert('删除回答成功');
		        	btn.parent().remove();
		        }
		      },
		      complete: function() {
		      },
		      error: function() {
		      }
		    });
	});
	// end删除回答

	// 修改回答
	$('#question-publish').click(function(){
		var aid = $(this).val();
		var content = $('#question-content').val();
 		data = {"type":"amodify","aid":aid,"content":content};
		$.ajax({
		      url: "/Jweb_template/Update",
		      dataType: "text",   //返回格式为json
		      async: true, //请求是否异步
		      data: data,    //参数值
		      type: "POST",   //请求方式
		      success: function(data) {
		        if(data.trim()=="ok"){
		        	alert('修改回答成功');
		        	window.btn.prev().html(content);
		        	$('.modal-wrapper').hide();
		        }
		      },
		      complete: function() {
		      },
		      error: function() {
		      }
		    });
	});
	// end修改回答
	
	//绑定 提问 事件
	$('.answer-modify').click(function(){
		window.btn = $(this);
		var aid = $(this).val();
		$('#question-publish').val(aid);
		$('.modal-wrapper').css('display','flex');
		$('#question-content').val($(this).prev().html());
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
  // 个人主页
  function userinfo(){
	  location.href = "Userinfo.jsp";
	  }
	  $('#userinfo').click(userinfo);
});
