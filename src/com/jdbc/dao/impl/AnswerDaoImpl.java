package com.jdbc.dao.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;

import com.jdbc.dao.IAnswerDao;
import com.jdbc.dao.ICommentDao;
import com.jdbc.dao.IStarmapDao;
import com.jdbc.domain.Answer;
import com.util.myDBUtil;

public class AnswerDaoImpl implements IAnswerDao {
	private QueryRunner qr = myDBUtil.getQueryRunner();

	@Override
	public void save(Answer answer) {
		String sql = "insert into answer(qid,uid,content,date) values(?,?,?,?)";
		try {
			qr.update(sql,answer.getQid(),answer.getUid(),answer.getContent(),answer.getDate());
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void delete(long aid) {
		ICommentDao iCommentDao = new CommentDaoImpl();
		IStarmapDao iStarmapDao = new StarmapDaoImpl();
		String sql  = "delete from answer where aid = ?";
		try {
			qr.update(sql,aid);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		iStarmapDao.delete(aid);
		List<Map<String, Object>> comments = iCommentDao.getByAid(aid);
		for(Map<String, Object> comment:comments) {
			iCommentDao.delete(Long.parseLong(comment.get("cid").toString()));
		}
	}
	
	@Override
	public void update(long aid, Answer answer) {
		String sql = "update answer set content = ? ,date = ? where aid = ?";
		try {
			qr.update(sql,answer.getContent(),answer.getDate(),answer.getAid());
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public Map<String, Object> getByQid(long qid) {
		String sql = "select * from answer where qid = ? order by stars desc";
		try {
			Map<String, Object> r = qr.query(sql,new MapHandler(),qid);
			return r;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Map<String, Object>> getAllByQid(long qid) {
		String sql = "select * from answer where qid = ? order by stars desc";
		try {
			List<Map<String, Object>> r = qr.query(sql,new MapListHandler(),qid);
			return r;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Map<String, Object>> getAllByUid(long uid) {
		String sql = "select * from answer where uid = ?";
		try {
			List<Map<String, Object>> r = qr.query(sql,new MapListHandler(),uid);
			return r;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
}
