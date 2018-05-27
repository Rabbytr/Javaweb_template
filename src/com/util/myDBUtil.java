package com.util;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbutils.QueryRunner;

import com.alibaba.druid.pool.DruidDataSourceFactory;

public class myDBUtil {
	private static DataSource ds = null;
	private static QueryRunner qr = null;
	
	static {
		Properties prop = new Properties();
		try {
			InputStream is = myDBUtil.class.getClassLoader().getResourceAsStream("config.properties");
			prop.load(is);
			ds = DruidDataSourceFactory.createDataSource(prop);
			qr = new QueryRunner(ds);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static DataSource getDataSource() {
		return ds;
	}
	
	public static QueryRunner getQueryRunner() {
		return qr;
	}
	
	public static Connection getConnection() {
		try {
			return ds.getConnection();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void closeAll(Connection conn,Statement st,ResultSet rs) {
		 if(rs!=null) {
			 try {
				 rs.close();	
			} catch (SQLException e) {
				e.printStackTrace();
			}
		 }
		 if(st!=null) {
			 try {
				st.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		 }
		 if(conn!=null) {
			 try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		 }
	}
}
