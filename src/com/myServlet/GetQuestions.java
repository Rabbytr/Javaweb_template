package com.myServlet;

import java.io.IOException;
import java.util.ArrayList;
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
import com.jdbc.dao.IStarmapDao;
import com.jdbc.dao.impl.AnswerDaoImpl;
import com.jdbc.dao.impl.QuestionDaoImpl;
import com.jdbc.dao.impl.StarmapDaoImpl;

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

		String type = request.getParameter("type");

		long uid = (long) request.getSession().getAttribute("uid");
		IQuestionDao iQuestionDao = new QuestionDaoImpl();
		IAnswerDao iAnswerDao = new AnswerDaoImpl();
		IStarmapDao iStarmapDao = new StarmapDaoImpl();
		List<Map<String, Object>> r = null;
		if(type.equals("search")) {
			System.out.println("search");
			String keywordstr = request.getParameter("keywords");
			String[] keywords = keywordstr.split(" +");
			r = iQuestionDao.searchBy(keywords[0]);
			for(int i=1;i<keywords.length;i++) {
				System.out.println(keywords[i]);
				List<Map<String, Object>> tList = iQuestionDao.searchBy(keywords[i].trim());
				r.addAll(tList);
			}
		}else if(type.equals("find")){
			System.out.println("find");
			
			r = iQuestionDao.getTopTen();
		}else {
			System.out.println("normal");
			r = iQuestionDao.getTopTen();
		}
		for(Map<String, Object> map:r) {
			long qid = (int) map.get("qid");
			Map<String, Object> answer = iAnswerDao.getByQid(qid);
			if(answer!=null) {
				long aid = (int)answer.get("aid");
				answer.put("stared", iStarmapDao.isStared(uid, aid));
			}
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
