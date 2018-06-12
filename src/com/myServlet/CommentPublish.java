package com.myServlet;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.dao.ICommentDao;
import com.jdbc.dao.impl.CommentDaoImpl;
import com.jdbc.domain.Comment;

@WebServlet("/CommentPublish")
public class CommentPublish extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public CommentPublish() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		long aid = Long.parseLong(request.getParameter("aid"));
		String content = request.getParameter("content");
		long uid = (long) request.getSession().getAttribute("uid");
		System.out.println(aid+" "+uid+" "+content);
		
		Comment comment = new Comment();
		comment.setAid(aid);
		comment.setUid(uid);
		comment.setContent(content);
		comment.setDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()).toString());
		ICommentDao iCommentDao = new CommentDaoImpl();
		iCommentDao.save(comment);
		response.getWriter().print("ok");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
