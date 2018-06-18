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

import com.jdbc.dao.IComrepDao;
import com.jdbc.dao.impl.ComrepDaoImpl;

/**
 * Servlet implementation class GetReplies
 */
@WebServlet("/GetReplies")
public class GetReplies extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public GetReplies() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		/* 设置格式为text/json */
        response.setContentType("text/json"); 
        /*设置字符集为'UTF-8'*/
        response.setCharacterEncoding("UTF-8");
        
        long cid = Long.parseLong(request.getParameter("cid"));
        IComrepDao iComrepDao = new ComrepDaoImpl();
        List<Map<String, Object>> replies = iComrepDao.getChildren(cid);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("replies", replies);
        jsonObject.put("state", "ok");
		response.getWriter().print(jsonObject);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
