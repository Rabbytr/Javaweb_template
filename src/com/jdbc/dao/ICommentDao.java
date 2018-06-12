package com.jdbc.dao;

import java.util.List;
import java.util.Map;

import com.jdbc.domain.Comment;

public interface ICommentDao {
	void save(Comment comment);
	
	List<Map<String, Object>> getByAid(long aid);
}
