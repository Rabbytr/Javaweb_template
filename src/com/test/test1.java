package com.test;

import com.jdbc.dao.IUserDao;
import com.jdbc.dao.impl.UserDaoImpl;
import com.jdbc.domain.User;

public class test1 {

	public static void main(String[] args) {
		User user = new User();
		user.setPhonenumber("999");
		user.setPassword("777");
		
		IUserDao dao = new UserDaoImpl();
		dao.save(user);
		
		
		
		
//		QueryRunner qr = new QueryRunner(myDBUtil.getDataSource());
//		//String sql = "update users set password=? where id=?";
//		try {
//			User user = qr.query("select * from user where phonenumber = ?",new BeanHandler<User>(User.class),"14786661616");
//			    System.out.println(user.getPhonenumber());
//			    System.out.println(user.getPassword());
//		} catch (SQLException e) {
//			e.printStackTrace(); 
//		}
	}
}
