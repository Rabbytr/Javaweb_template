package com.jdbc.dao.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.MapHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;

import com.jdbc.dao.ICommentDao;
import com.jdbc.dao.IComrepDao;
import com.jdbc.domain.Comment;
import com.util.myDBUtil;

public class CommentDaoImpl implements ICommentDao {
	private QueryRunner qr = myDBUtil.getQueryRunner();

	@Override
	public void save(Comment comment) {
		String sql = "insert into comment(aid,uid,content,date) values(?,?,?,?)";
		try {
			qr.update(sql,comment.getAid(),comment.getUid(),comment.getContent(),comment.getDate());
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void delete(long cid) {
		IComrepDao iComrepDao = new ComrepDaoImpl();
		iComrepDao.delete(cid);
		String sql = "delete from comment where cid = ?";
		try {
			qr.update(sql,cid);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<Map<String, Object>> getByAid(long aid) {
		String sql = "select * from comment where aid = ?";
		try {
			List<Map<String, Object>> r = qr.query(sql,new MapListHandler(), aid);
			return r;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public long getLastCid() {
		String sql = "select last_insert_id()";
		try {
			long cid = Long.parseLong(qr.query(sql,new MapHandler()).get("last_insert_id()").toString());
			return cid;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

	@Override
	public Comment getByCid(long cid) {
		String sql = "select * from comment where cid = ?";
		try {
			Comment comment = qr.query(sql, new BeanHandler<Comment>(Comment.class),cid);
			return comment;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

}
