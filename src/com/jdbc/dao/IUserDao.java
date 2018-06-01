package com.jdbc.dao;

import java.util.List;

import com.jdbc.domain.User;

public interface IUserDao {
	void save(User user);
	void update(long id,User user);
	void delete(long id);
	
	User get(long id);
	int getId(String phonenum,String password);
	List<User> getAll(); 
}
