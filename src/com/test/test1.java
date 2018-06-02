package com.test;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import com.jdbc.dao.IAnswerDao;
import com.jdbc.dao.impl.AnswerDaoImpl;
import com.jdbc.domain.Answer;

public class test1 {

	public static void main(String[] args) {
		
		IAnswerDao iAnswerDao = new AnswerDaoImpl();
		Answer answer = new Answer();
		answer.setQid(1);
		answer.setUid(1);
		answer.setContent("凤姐");
		answer.setDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()).toString());
		iAnswerDao.save(answer);
		
//		Question question = new Question();
//		question.setUid(123);
//		question.setContent("怎么吃饭?");
//		question.setDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()).toString());
//		iQuestionDao.save(question);

//		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
//		System.out.println(df.format(new Date()).toString());// new Date()为获取当前系统时间
		
	}
}
