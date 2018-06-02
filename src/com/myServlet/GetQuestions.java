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

import com.jdbc.dao.IAnswerDao;
import com.jdbc.dao.IQuestionDao;
import com.jdbc.dao.impl.AnswerDaoImpl;
import com.jdbc.dao.impl.QuestionDaoImpl;

@WebServlet("/GetQuestions")
public class GetQuestions extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public GetQuestions() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		/* 设置格式为text/json    */
        response.setContentType("text/json"); 
        /*设置字符集为'UTF-8'*/
        response.setCharacterEncoding("UTF-8");
		
		IQuestionDao iQuestionDao = new QuestionDaoImpl();
		IAnswerDao iAnswerDao = new AnswerDaoImpl();
		List<Map<String, Object>> r = iQuestionDao.getTopTen();
		for(Map<String, Object> map:r) {
			long qid = (int) map.get("qid");
			Map<String, Object> answer = iAnswerDao.getByQid(qid);
			map.put("answer", answer);
		}
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("questions", r);
		jsonObject.put("state", "ok");
		response.getWriter().print(jsonObject);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
