package com.jdbc.domain;

public class Question {
	private long qid;
	private long uid;
	private String content;
	private String date;

	public long getQid() {
		return qid;
	}
	public void setQid(long qid) {
		this.qid = qid;
	}
	public long getUid() {
		return uid;
	}
	public void setUid(long uid) {
		this.uid = uid;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
}
