package com.jdbc.dao;

import java.util.List;
import java.util.Map;

import com.jdbc.domain.Question;

public interface IQuestionDao {
	void save(Question question);
	void update(long qid,Question question);
	void delete(long qid);
	
	List<Map<String, Object>> getByUid(long uid);
}
