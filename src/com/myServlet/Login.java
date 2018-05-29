package com.myServlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.jdbc.dao.IUserDao;
import com.jdbc.dao.impl.UserDaoImpl;
import com.util.SHAencrypt;

@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Login() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String phonenum = request.getParameter("phonenumber");
		String pwd = request.getParameter("password");
		System.out.println(phonenum+"尝试登录");
		IUserDao iUserDao = new UserDaoImpl();
		int id = iUserDao.getId(phonenum, SHAencrypt.getResult(pwd));
		if(id>0) {
			HttpSession session = request.getSession();
			session.setAttribute("uid", id);
			response.getWriter().print("ok");
		}else {
			response.getWriter().print("no");
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
