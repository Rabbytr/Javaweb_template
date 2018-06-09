package com.jdbc.dao;

public interface IStarmapDao {
	int star(long uid,long aid);
	int unstar(long uid,long aid);
	boolean isStared(long uid,long aid);
}
