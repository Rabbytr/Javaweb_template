package com.jdbc.dao;

import java.util.List;

import com.jdbc.domain.User;

public interface IUserDao {
	void save(User user);
	void update(int id,User user);
	void delete(int id);
	
	User get(int id);
	List<User> getAll(); 
}
