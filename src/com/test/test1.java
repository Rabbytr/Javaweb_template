package com.test;

import com.util.SHAencrypt;

public class test1 {

	public static void main(String[] args) {
		String pString = "9";
		
		try {
			System.out.println(SHAencrypt.getResult(pString));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

//		User user = new User();
//		
//		user.setPhonenumber("123");
//		user.setPassword("456");
//		
//		
//		IUserDao dao = new UserDaoImpl();
//		dao.save(user);
		
	}
}
