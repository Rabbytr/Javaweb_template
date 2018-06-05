package com.jdbc.dao;

public interface IStarmapDao {
	void star(long uid,long aid);
	void unstar(long uid,long aid);
	boolean isStared(long uid,long aid);
}
