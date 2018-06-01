package com.myServlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.dao.IUserDao;
import com.jdbc.dao.impl.UserDaoImpl;
import com.jdbc.domain.User;

@WebServlet("/GetUserInfo")
public class GetUserInfo extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public GetUserInfo() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		if(request.getSession().getAttribute("uid")==null) {
			System.out.println("未登录");
			response.getWriter().print("{\"state\":\"no\"}");
		}else {
			try {
				long uid = (long) request.getSession().getAttribute("uid");
				System.out.println(uid);
				IUserDao iUserDao = new UserDaoImpl();
				User user = iUserDao.get(uid);
				System.out.println(user.getUsername());
				response.getWriter().print("{\"state\":\"ok\",\"username\":\""+user.getUsername()+"\"}");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
