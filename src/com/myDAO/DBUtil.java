package com.myDAO;

import static java.lang.Class.forName;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBUtil {
	private static String driver;
	private static String url;
	private static String username;
	private static String password;
	
	static {
		driver = "";
		url = "";
		username = "";
		password = "";
	}
	
	public static Connection open() {
		try {
			forName(driver);
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
