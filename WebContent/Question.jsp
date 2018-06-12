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
<%@page import="com.jdbc.domain.User"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<script type="text/javascript" src='../static/js/jquery.js'></script>
<script type="text/javascript" src='../static/js/bootstrap.min.js'></script>
<script type="text/javascript" src='../static/js/question.js'></script>

<link type="text/css" rel="stylesheet"
	href="../static/css/bootstrap.min.css" />
<link type="text/css" rel="stylesheet" href="../static/css/question.css" />
<title>逼乎-发现更大的世界</title>
</head>
<body>
	<%
		long guid = (long)t;
		long qid = Long.parseLong(request.getPathInfo().toString().substring(1));
		request.getSession().setAttribute("qid", qid);
		IQuestionDao iQuestionDao = new QuestionDaoImpl();
		IAnswerDao iAnswerDao = new AnswerDaoImpl();
		IStarmapDao iStarmapDao = new StarmapDaoImpl();
		Map<String, Object> question = iQuestionDao.getByQid(qid);
		List<Map<String, Object>> answers = iAnswerDao.getAllByQid(qid);
	%>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="container">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed"
						data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
						aria-expanded="false">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="../index.html">逼乎</a>
				</div>

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse"
					id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li><a href="../index.html">首页</a></li>
						<li><a href="#">发现</a></li>
					</ul>
					<form class="navbar-form navbar-left">
						<div class="form-group">
							<input type="text" class="form-control"
								placeholder="搜索你感兴趣的内容...">
						</div>
						<button class="btn-blue">搜索</button>
					</form>
					<ul class="nav navbar-nav navbar-right">
						<li><a href="#"><span class="glyphicon glyphicon-bell"></span></a></li>
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown" role="button" aria-haspopup="true"
							aria-expanded="false"> <span id="username"></span> <span
								class="caret"></span>
						</a>
							<ul class="dropdown-menu">
								<li><a href="#"><span class="glyphicon glyphicon-user"></span>  我的主页</a></li>
								<li><a href="#"><span class="glyphicon glyphicon-cog"></span>  设置</a></li>
								<li role="separator" class="divider"></li>
								<li><a id="logout" href="#"><span class="glyphicon glyphicon-off"></span>  注销</a></li>
							</ul></li>
					</ul>
				</div>
				<!-- /.navbar-collapse -->
			</div>
		</div>
		<!-- /.container-fluid -->
	</nav>
	<div class="container">
		<div class="card">
			<p class="question-title"><%=question.get("title")%></p>
			<p class="question-content"><%=question.get("content")%></p>
			<p class="small-gray"><%=question.get("date")%></p>
			<button id="putanswer" class="btn-blue">写回答</button>
		</div>
		<%
			for (Map<String, Object> answer : answers) {
				long uid = (int) answer.get("uid");
				IUserDao iUserDao = new UserDaoImpl();
				User user = iUserDao.get(uid);
		%>
		<div class="card">
			<p class="question-title"><%=user.getUsername()%></p>
			<p class="small-gray"><%=answer.get("stars")%>人赞同了该回答
			</p>
			<p class="most-anwser"><%=answer.get("content")%></p>
			<p class="small-gray"><%=answer.get("date")%></p>
			<div class="question-foot">
				<%
					if (!iStarmapDao.isStared(guid, (int) answer.get("aid"))) {
				%>
				<button class="btn-star" name="button" value=<%=answer.get("aid")%>><span class="glyphicon glyphicon-triangle-top"></span> <%=answer.get("stars")%></button>
				<%
					} else {
				%>
				<button class="btn-stared" name="button" value=<%=answer.get("aid")%>><span class="glyphicon glyphicon-triangle-bottom"></span> <%=answer.get("stars")%></button>
				<%
					}
				%>
				<button class="btn btn-link comment-btn" name="button" value=<%=answer.get("aid")%>><span class="glyphicon glyphicon-comment"></span> 查看评论</button>
				<button class="btn btn-link" name="button"><span class="glyphicon glyphicon-send"></span> 分享</button>
				<button class="btn btn-link" name="button"><span class="glyphicon glyphicon-star"></span> 收藏</button>
			</div>
			<div class="comment-container">
				<div class="comment-content"></div>
				<div class="comment-footer">
					<div class="form-group">
						<textarea id="comment" class="form-control" rows="3" placeholder="写下你的评论"></textarea>
					</div>
					<button class="btn-blue comment-publish" value=<%=answer.get("aid")%>>评论</button>
				</div>

			</div>
		</div>
		<%
			}
		%>

		<!-- 弹出框 -->
		<div class="modal-wrapper">
			<div class="modal">
				<div class="modal-title">写下你的回答</div>
				<div class="modal-subtitle">描述有理的回答对提问者更有帮助</div>
				<div class="modal-form">
					<div class="form-wrapper">
						<textarea id="answer-content" class="form-control" rows="6"
							placeholder="你的回答"></textarea>
					</div>
					<div class="form-wrapper">
						<button id="answer-publish" class="btn-blue" type="button"
							name="button">提交回答</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
