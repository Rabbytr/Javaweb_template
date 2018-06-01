package com.myServlet;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.dao.IQuestionDao;
import com.jdbc.dao.impl.QuestionDaoImpl;
import com.jdbc.domain.Question;

@WebServlet("/QuestionPublish")
public class QuestionPublish extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public QuestionPublish() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String questiontitle = request.getParameter("title");
		String questioncontent = request.getParameter("content");
		long uid = (long) request.getSession().getAttribute("uid");
		String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()).toString();
		
		Question question = new Question();
		question.setUid(uid);
		question.setTitle(questiontitle);
		question.setContent(questioncontent);
		question.setDate(date);
		IQuestionDao iQuestionDao = new QuestionDaoImpl();
		iQuestionDao.save(question);
		response.getWriter().print("ok");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
