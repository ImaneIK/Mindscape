package com.mindscape.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Book {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 200)
	private String title;
	
	@Column(length = 100)
	private String author;
	
	@Column(length = 150)
	private String publisher;
	
	private String cover;
	private String genre;
	private String pub_date;
	private int nbr_pages;
	private String langage;
	private double rating;
	private String url;
	
	public Book(Long id, String title, String author, String publisher, String cover, String genre, String pub_date,
			int nbr_pages, String langage, double rating, String url) {
		super();
		this.title = title;
		this.author = author;
		this.publisher = publisher;
		this.cover = cover;
		this.genre = genre;
		this.pub_date = pub_date;
		this.nbr_pages = nbr_pages;
		this.langage = langage;
		this.rating = rating;
		this.url = url;
	}

	public Book() {
		super();
	}

	public Long getId() {
		return id;
	}
	

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getPub_date() {
		return pub_date;
	}

	public void setPub_date(String pub_date) {
		this.pub_date = pub_date;
	}

	public int getNbr_pages() {
		return nbr_pages;
	}

	public void setNbr_pages(int nbr_pages) {
		this.nbr_pages = nbr_pages;
	}

	public String getLangage() {
		return langage;
	}

	public void setLangage(String langage) {
		this.langage = langage;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	
	
	
	
	
	
}
