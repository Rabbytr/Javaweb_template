package com.test;

import java.sql.SQLException;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayHandler;

import com.util.myDBUtil;

public class test1 {

	public static void main(String[] args) {
		QueryRunner qr = new QueryRunner(myDBUtil.getDataSource());
		String sql = "update users set password=? where id=?";
		try {
			Object[] arr = qr.query("select * from users where id = ?",new ArrayHandler(),2017);
			for(int i=0;i<arr.length;i++) {
			    System.out.println(arr[i]);
			}
		} catch (SQLException e) {
			e.printStackTrace(); 
		}
	}
}
