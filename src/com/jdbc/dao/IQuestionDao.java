package com.jdbc.dao;

import java.util.List;
import java.util.Map;

import com.jdbc.domain.Question;

public interface IQuestionDao {
	void save(Question question);
	void update(long qid,Question question);
	void delete(long qid);
	
	Map<String, Object> getByQid(long qid);
	List<Map<String, Object>> getByUid(long uid);
	List<Map<String, Object>> getTopTen();
	List<Map<String, Object>> searchBy(String keyword);
}
