package com.jdbc.dao.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapListHandler;

import com.jdbc.dao.IQuestionDao;
import com.jdbc.domain.Question;
import com.util.myDBUtil;

public class QuestionDaoImpl implements IQuestionDao{
	private QueryRunner qr = myDBUtil.getQueryRunner();

	@Override
	public void save(Question question) {
		String sql = "insert into question(uid,title,content,date) values(?,?,?,?)";
		try {
			qr.update(sql,question.getUid(),question.getTitle(),question.getContent(),question.getDate());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void update(long qid, Question question) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(long qid) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Map<String, Object>> getByUid(long uid) {
		String sql = "select * from question where uid = ?";
		try {
			List<Map<String, Object>> r = qr.query(sql,new MapListHandler(),uid);
			return r;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

}
