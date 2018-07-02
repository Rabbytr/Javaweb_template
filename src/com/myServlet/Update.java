package com.myServlet;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.dao.IAnswerDao;
import com.jdbc.dao.IQuestionDao;
import com.jdbc.dao.impl.AnswerDaoImpl;
import com.jdbc.dao.impl.QuestionDaoImpl;
import com.jdbc.domain.Answer;

@WebServlet("/Update")
public class Update extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Update() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String type = request.getParameter("type");
		if(type.equals("qdelete")) {
			long qid = Long.parseLong(request.getParameter("qid"));
			IQuestionDao iQuestionDao = new QuestionDaoImpl();
			iQuestionDao.delete(qid);
			response.getWriter().print("ok");
		}else if (type.equals("amodify")) {
			long aid = Long.parseLong(request.getParameter("aid"));
			IAnswerDao iAnswerDao = new AnswerDaoImpl();
			String content = request.getParameter("content");
			String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()).toString();
			Answer answer = new Answer();
			answer.setAid(aid);
			answer.setContent(content);
			answer.setDate(date);
			iAnswerDao.update(aid, answer);
			response.getWriter().print("ok");
		}else if (type.equals("adelete")) {
			long aid = Long.parseLong(request.getParameter("aid"));
			IAnswerDao iAnswerDao = new AnswerDaoImpl();
			iAnswerDao.delete(aid);
			response.getWriter().print("ok");
		}else {

		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
