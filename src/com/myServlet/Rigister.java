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
		String phonenum = request.getParameter("phonenumber");
		String pwd1 = request.getParameter("password");
		String pwd2 = request.getParameter("rpassword");
		System.out.println(pwd1);
		if(pwd1.equals(pwd2)) {
			//服务端检测数据有效性
			User user = new User();
			user.setPhonenumber(phonenum);
			user.setPassword(SHAencrypt.getResult(pwd1)); //加密
			IUserDao iUserDao = new UserDaoImpl();
			iUserDao.save(user);
			response.getWriter().print("1");
		}else {
			response.getWriter().print("0");
		}
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
