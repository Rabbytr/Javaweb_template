package com.jdbc.dao.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;

import com.jdbc.dao.ICommentDao;
import com.jdbc.dao.IComrepDao;
import com.jdbc.domain.Comment;
import com.sun.org.apache.bcel.internal.generic.NEW;
import com.util.myDBUtil;

public class ComrepDaoImpl implements IComrepDao{
	private QueryRunner qr = myDBUtil.getQueryRunner();

	public void save(long parent, long child) {
		String sql = "insert into comrep values(?,?)";
		try {
			qr.update(sql,parent,child);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<Map<String, Object>> getChildren(long cid) {
		String sql = "select child from comrep where parent = ?";
		try {
			List<Map<String, Object>> r = qr.query(sql, new MapListHandler(),cid);
			
			return r;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Comment getParents(long cid) {
		String sql = "select parent from comrep where child = ?";
		try {
			Map<String, Object> r = qr.query(sql, new MapHandler(),cid);
			if(r==null)return null;
			ICommentDao iCommentDao = new CommentDaoImpl();
			Comment comment = iCommentDao.getByCid(Long.parseLong(r.get("parent").toString()));
			return comment;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

}
