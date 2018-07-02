<%
	//判断是否登录
	Object t = request.getSession().getAttribute("uid");
	if (t == null) {
		response.sendRedirect("../signup.html");
		return;
	}
%>
<%@page import="com.jdbc.dao.*"%>
<%@page import="com.jdbc.dao.impl.*"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript" src='./static/js/jquery.js'></script>
	<script type="text/javascript" src='./static/js/bootstrap.min.js'></script>
	<script type="text/javascript" src='./static/js/userinfo.js'></script>
	<script>
	  // 问题点击事件
	  function questionclick(qid){
	    location.href = "Question/"+qid;
	    //console.log(qid);
	  }
	  // end 问题点击事件
	</script>

	<link type="text/css" rel="stylesheet" href="./static/css/bootstrap.min.css" />
	<link type="text/css" rel="stylesheet" href="./static/css/index.css" />
<title>个人主页</title>
</head>
<body>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="container">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="./index.html">逼乎</a>
				</div>

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li><a href="./index.html">首页</a></li>
						<li><a href="#">发现</a></li>
					</ul>
					<div class="navbar-form navbar-left">
						<div class="form-group">
							<input id="keyword-input" type="text" class="form-control" placeholder="搜索你感兴趣的内容...">
						</div>
						<button id="search-btn" class="btn-blue">搜索</button>
					</div>
					<ul class="nav navbar-nav navbar-right">
						<li><a href="#"><span class="glyphicon glyphicon-bell"></span></a></li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
								<span id="username"></span>
								<span class="caret"></span>
							</a>
							<ul class="dropdown-menu">
								<li><a id="userinfo" href="#"><span class="glyphicon glyphicon-user"></span>  我的主页</a></li>
								<li><a href="#"><span class="glyphicon glyphicon-cog"></span>  设置</a></li>
								<li role="separator" class="divider"></li>
								<li><a id="logout" href="#"><span class="glyphicon glyphicon-off"></span>  注销</a></li>
							</ul>
						</li>
					</ul>
				</div><!-- /.navbar-collapse -->
			</div>
		</div><!-- /.container-fluid -->
	</nav>
	<%
		long uid = Long.parseLong(request.getSession().getAttribute("uid").toString());
		IQuestionDao iQuestionDao = new QuestionDaoImpl();
		IAnswerDao iAnswerDao = new AnswerDaoImpl();
		List<Map<String, Object>> questions;
		List<Map<String, Object>> answers;
		questions = iQuestionDao.getByUid(uid);
		answers = iAnswerDao.getAllByUid(uid);
	%>
	<div class="container">
		<h1>我的问题</h1>
		<%
			for(Map<String, Object> question:questions){
		%>
		<div class="card" >
			<p class="question-title" onclick="questionclick(<%=question.get("qid")%>)"><%=question.get("title")%></p>
			<p class="question-content"><%=question.get("content")%></p>
			<p class="small-gray"><%=question.get("date")%></p>
			<button class="btn-red question-delete" value=<%=question.get("qid")%>>删除</button>
		</div>
		<%
			}
		%>
		<h1>我的回答</h1>
		<%
			for(Map<String, Object> answer:answers){
				long qid = Long.parseLong(answer.get("qid").toString());
				Map<String, Object> question = iQuestionDao.getByQid(qid);
		%>
		<div class="card">
			<p class="question-title" onclick="questionclick(<%=question.get("qid")%>)"><%=question.get("title")%></p>
			<p class="question-content"><%=answer.get("content")%></p>
			<button class="btn-blue answer-modify" value=<%=answer.get("aid")%>>修改</button>
			<button class="btn-red answer-delete" value=<%=answer.get("aid")%>>删除</button>
		</div>
		<%
			}
		%>
		
			  <!-- 弹出框 -->
		<div class="modal-wrapper">
			<div class="modal">
				<div class="modal-title">
					修改此回答
				</div>
				<div class="modal-subtitle">
					描述精确的问题更易得到解答
				</div>
				<div class="modal-form">
					<div class="form-wrapper">
						<textarea id="question-content" class="form-control" rows="6" placeholder="问题描述"></textarea>
					</div>
					<div class="form-wrapper">
						<button id="question-publish" class="btn-blue" type="button" name="button">提交修改</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
