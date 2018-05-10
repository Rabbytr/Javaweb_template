package com.util;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class DBUtil {
	private static String driver;
	private static String url;
	private static String username; 
	private static String password;
	
	static {
		Properties prop = new Properties();
		try {
			InputStream is = DBUtil.class.getClassLoader().getResourceAsStream("config.properties");
			prop.load(is);
		} catch (Exception e) {
			e.printStackTrace();
		}
		driver = prop.getProperty("driver");
		url = prop.getProperty("url");
		username = prop.getProperty("username");
		password = prop.getProperty("password");
	}
	
	public static Connection open() {
		try {
			Class.forName(driver);
			return DriverManager.getConnection(url, username, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void close(Connection conn) {
		 if(conn!=null) {
			 try {
				conn.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		 }
	}
}
