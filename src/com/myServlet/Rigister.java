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
import com.util.SHAencrypt;

@WebServlet("/Rigister")
public class Rigister extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Rigister() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username");
		String phonenum = request.getParameter("phonenumber");
		String pwd = request.getParameter("password");
		System.out.println(pwd);
		//服务端检测数据有效性
		User user = new User();
		user.setPhonenumber(phonenum);
		user.setPassword(SHAencrypt.getResult(pwd)); //加密
		user.setUsername(username);
		IUserDao iUserDao = new UserDaoImpl();
		if(!iUserDao.hasUser(phonenum)) {
			System.out.println(iUserDao.hasUser(phonenum));
			iUserDao.save(user);
			response.getWriter().print("ok");
		}else {
			response.getWriter().print("no");
		}
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
