package com.myServlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jdbc.dao.IStarmapDao;
import com.jdbc.dao.impl.StarmapDaoImpl;

/**
 * Servlet implementation class Starfun
 */
@WebServlet("/Starfun")
public class Starfun extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Starfun() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		long uid = (long) request.getSession().getAttribute("uid");
		boolean flag = Boolean.parseBoolean(request.getParameter("flag"));
		long aid = Long.parseLong(request.getParameter("aid"));
		IStarmapDao iStarmapDao = new StarmapDaoImpl();
		if(!iStarmapDao.isStared(uid, aid)&&flag==false) {
			int stars = iStarmapDao.star(uid, aid);
			response.getWriter().print("{\"state\":\"ok\",\"stars\":"+stars+"}");
		}else if(iStarmapDao.isStared(uid, aid)&&flag==true){
			int stars = iStarmapDao.unstar(uid, aid);
			response.getWriter().print("{\"state\":\"ok\",\"stars\":"+stars+"}");
		}else {
			response.getWriter().print("{\"state\":\"no\"}");
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
