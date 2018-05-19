package com.jdbc.dao.impl;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.dbutils.QueryRunner;

import com.jdbc.dao.IUserDao;
import com.jdbc.domain.User;
import com.util.myDBUtil;

public class UserDaoImpl implements IUserDao{
 
	@Override
	public void save(User user) {
		QueryRunner qr = new QueryRunner(myDBUtil.getDataSource());
		String sql = "insert into User values(?,?)";
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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<User> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

}
