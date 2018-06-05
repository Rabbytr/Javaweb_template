package com.test;

import com.jdbc.dao.IStarmapDao;
import com.jdbc.dao.impl.StarmapDaoImpl;

public class test1 {

	public static void main(String[] args) {
		
		IStarmapDao iStarmapDao = new StarmapDaoImpl();
		iStarmapDao.unstar(1, 4);
//		Question question = new Question();
//		question.setUid(123);
//		question.setContent("怎么吃饭?");
//		question.setDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()).toString());
//		iQuestionDao.save(question);

//		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
//		System.out.println(df.format(new Date()).toString());// new Date()为获取当前系统时间
		
	}
}
