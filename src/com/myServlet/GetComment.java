package com.myServlet;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.jdbc.dao.ICommentDao;
import com.jdbc.dao.IComrepDao;
import com.jdbc.dao.IUserDao;
import com.jdbc.dao.impl.CommentDaoImpl;
import com.jdbc.dao.impl.ComrepDaoImpl;
import com.jdbc.dao.impl.UserDaoImpl;
import com.jdbc.domain.Comment;
import com.jdbc.domain.User;

/**
 * Servlet implementation class GetComment
 */
@WebServlet("/GetComment")
public class GetComment extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public GetComment() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		/* 设置格式为text/json */
        response.setContentType("text/json"); 
        /*设置字符集为'UTF-8'*/
        response.setCharacterEncoding("UTF-8");
		
		long aid = Long.parseLong(request.getParameter("aid"));
		IUserDao iUserDao = new UserDaoImpl();
		ICommentDao iCommentDao = new CommentDaoImpl();
		IComrepDao iComrepDao = new ComrepDaoImpl();
		List<Map<String, Object>> comments = iCommentDao.getByAid(aid);
		for(Map<String, Object> comment:comments) {
			long uid = Long.parseLong(comment.get("uid").toString());
			User user = iUserDao.get(uid);
			comment.put("username", user.getUsername());
			comment.put("uid", user.getUid());
			
			long cid = Long.parseLong(comment.get("cid").toString());
			Comment toComment = iComrepDao.getParents(cid);
			if(toComment!=null) {
				long touid = toComment.getUid();
				User toUser = iUserDao.get(touid);
				comment.put("tousername", toUser.getUsername());
			}else {
				comment.put("tousername", null);
			}

		}
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("comments", comments);
		jsonObject.put("state", "ok");
		response.getWriter().print(jsonObject);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
