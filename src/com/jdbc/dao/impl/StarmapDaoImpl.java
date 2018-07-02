package com.jdbc.dao.impl;

import java.sql.SQLException;
import java.util.Map;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapHandler;

import com.jdbc.dao.IStarmapDao;
import com.util.myDBUtil;

public class StarmapDaoImpl implements IStarmapDao{
	private QueryRunner qr = myDBUtil.getQueryRunner();
	
	@Override
	public void delete(long aid) {
		String sql = "delete from starmap where aid = ?";
		try {
			qr.update(sql,aid);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public int star(long uid, long aid) {
		String sql1 = "insert into starmap values(?,?)";
		String sql2 = "update answer set stars = (stars+1) where aid = ?";
		String sql3 = "select stars from answer where aid = ?";
		try {
			qr.update(sql1,uid,aid);
			qr.update(sql2,aid);
			int stars = Integer.parseInt(qr.query(sql3, new MapHandler(),aid).get("stars").toString());
			return stars;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int unstar(long uid, long aid) {
		String sql1 = "delete from starmap where uid = ? and aid = ?";
		String sql2 = "update answer set stars = (stars-1) where aid = ?";
		String sql3 = "select stars from answer where aid = ?";
		try {
			qr.update(sql1,uid,aid);
			qr.update(sql2,aid);
			int stars = Integer.parseInt(qr.query(sql3, new MapHandler(),aid).get("stars").toString());
			return stars;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public boolean isStared(long uid, long aid) {
		String sql = "select * from starmap where uid = ? and aid = ?";
		try {
			Map<String, Object> r = qr.query(sql, new MapHandler(),uid,aid);
			if(r!=null)return true;
			return false;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

}
