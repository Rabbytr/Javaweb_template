package com.jdbc.dao;

import java.util.List;
import java.util.Map;

import com.jdbc.domain.Comment;

public interface IComrepDao {
	void save(long parent,long child);
	void delete(long cid);
	
	List<Map<String, Object>> getChildren(long cid);
	Comment getParents(long cid);
	
	boolean hasChild(long cid);
}
