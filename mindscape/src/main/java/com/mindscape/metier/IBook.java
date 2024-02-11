package com.mindscape.metier;

import java.util.List;
import java.util.Map;

import com.mindscape.entities.Book;

public interface IBook {
	
	// book listing and filters
	public List<Book> allBooks();
	public Book getBookById(Long id);
	public List<Book> listBooksByGenre(String genre);
	public List<Book> listBooksBytitle(String title);
	public List<Book> listBooksByAuthor(String author);
	public List<Book> listBooksByPublisher(String publisher);
	public List<Book> listBooksByDate(String date);
	public List<Book> listBooksByLangage(String langage);
	public List<Book> listBooksByRating(double rating);
    
    public List<Book> getBooksByFilters(Map<String, String> filters);
    
    public void addNewBook(Book b);
    
    public Book updateBook(Long id, Book b);
    
    public void deleteBook(Long id);


  
	
	
	

}
