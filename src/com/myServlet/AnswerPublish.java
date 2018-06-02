package com.myServlet;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.jdbc.dao.IAnswerDao;
import com.jdbc.dao.impl.AnswerDaoImpl;
import com.jdbc.domain.Answer;

@WebServlet("/AnswerPublish")
public class AnswerPublish extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public AnswerPublish() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String content = request.getParameter("content");
		HttpSession session = request.getSession();
		long uid = (long) session.getAttribute("uid");
		long qid = (long) session.getAttribute("qid");
		String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()).toString();
		Answer answer = new Answer();
		answer.setQid(qid);
		answer.setUid(uid);
		answer.setContent(content);
		answer.setDate(date);
		IAnswerDao iAnswerDao = new AnswerDaoImpl();
		iAnswerDao.save(answer);
		response.getWriter().print("ok");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
