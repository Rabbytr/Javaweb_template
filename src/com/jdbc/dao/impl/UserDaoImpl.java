package com.jdbc.dao.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.MapHandler;

import com.jdbc.dao.IUserDao;
import com.jdbc.domain.User;
import com.util.myDBUtil;

public class UserDaoImpl implements IUserDao{
	private QueryRunner qr = myDBUtil.getQueryRunner();
	
	@Override
	public void save(User user) {
		String sql = "insert into User(phonenumber,password) values(?,?)";
		try {
			qr.update(sql,user.getPhonenumber(),user.getPassword());
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void update(int id,User user) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public User get(int id) {
		String sql = "select * from user where id=?";
		try {
			User user = qr.query(sql,new BeanHandler<User>(User.class),id);
			return user;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@Override
	public int getId(String phonenum, String password) {
		String sql = "select id from user where phonenumber=? and password=?";
		try {
			Map<String, Object> map = qr.query(sql,new MapHandler(),phonenum,password);
			return map==null?-1:(int) map.get("id");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

	@Override
	public List<User> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

}