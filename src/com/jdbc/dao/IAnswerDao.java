package com.jdbc.dao;

import java.util.List;
import java.util.Map;

import com.jdbc.domain.Answer;

public interface IAnswerDao {
	void save(Answer answer);
	void delete(long aid);
	void update(long aid,Answer answer);
	
	Map<String, Object> getByQid(long qid);
	List<Map<String, Object>> getAllByQid(long qid);
	List<Map<String, Object>> getAllByUid(long uid);
}
