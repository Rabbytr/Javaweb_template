package com.test;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.jdbc.dao.ICommentDao;
import com.jdbc.dao.IComrepDao;
import com.jdbc.dao.IQuestionDao;
import com.jdbc.dao.impl.CommentDaoImpl;
import com.jdbc.dao.impl.ComrepDaoImpl;
import com.jdbc.dao.impl.QuestionDaoImpl;
import com.jdbc.domain.Comment;

public class test1 {

	public static void main(String[] args) {
		
		IQuestionDao iQuestionDao = new QuestionDaoImpl();
		List<Map<String, Object>> rList = iQuestionDao.searchBy("我");
		System.out.println(rList);
		
//		Question question = new Question();
//		question.setUid(123);
//		question.setContent("怎么吃饭?");
//		question.setDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()).toString());
//		iQuestionDao.save(question);

//		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
//		System.out.println(df.format(new Date()).toString());// new Date()为获取当前系统时间
		
	}
}
