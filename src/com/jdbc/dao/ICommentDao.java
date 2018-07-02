package com.jdbc.dao;

import java.util.List;
import java.util.Map;

import com.jdbc.domain.Comment;

public interface ICommentDao {
	void save(Comment comment);
	void delete(long cid);
	
	long getLastCid();
	Comment getByCid(long cid);
	List<Map<String, Object>> getByAid(long aid);
}
