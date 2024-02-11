package com.mindscape.metier;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.mindscape.dao.BookRepository;
import com.mindscape.entities.Book;
@Service
public class BookService implements IBook{
	
	@Autowired
	BookRepository bookRepository;


	@Override
	public List<Book> allBooks() {
		return bookRepository.findAll();
	}
	
	public long getNumberOfBooks() {
        return bookRepository.count();
    }

	@Override
	public List<Book> listBooksByGenre(String genre) {
		List<Book> books = new ArrayList<Book>();
		allBooks().forEach(b-> {
			if(b.getGenre().equals(genre)) 
			books.add(b);
		});
		return books;

	}
	
	@Override
	public Book getBookById(Long id) {
		return bookRepository.findById(id).get();
	}
	
	
	
	@Override
	public List<Book> listBooksBytitle(String title) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Book> listBooksByAuthor(String author) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Book> listBooksByPublisher(String publisher) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Book> listBooksByDate(String date) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Book> listBooksByLangage(String langage) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Book> listBooksByRating(double rating) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Book> getBooksByFilters(Map<String, String> filters) {
        // Retrieve all books from the repository
        List<Book> allBooks = bookRepository.findAll();

        // Apply filters based on the criteria provided
        return allBooks.stream()
                .filter(book -> filterByGenre(book, filters.get("genre")))
                .filter(book -> filterByAuthor(book, filters.get("author")))
                .filter(book -> filterByPublisher(book, filters.get("publisher")))
                // Add more filters as needed
                .collect(Collectors.toList());
    }
	
	private boolean filterByGenre(Book book, String genre) {
        return genre == null || genre.isEmpty() || book.getGenre().equalsIgnoreCase(genre);
    }

    private boolean filterByAuthor(Book book, String author) {
        return author == null || author.isEmpty() || book.getAuthor().equalsIgnoreCase(author);
    }

    private boolean filterByPublisher(Book book, String publisher) {
        return publisher == null || publisher.isEmpty() || book.getPublisher().equalsIgnoreCase(publisher);
    }

    public List<Book> getBooksByMultipleFilters(List<String> genres, String author, String publisher) {
        return bookRepository.findByMultipleFilters(genres, author, publisher);
    }

	@Override
	public void addNewBook(Book b) {
		bookRepository.save(b);
		
	}

	@Override
	public Book updateBook(Long id, Book b) {
		return bookRepository.save(b);
	}

	@Override
	public void deleteBook(Long id) {
		bookRepository.deleteById(id);
	}
	
	
	@DeleteMapping(path = "/product/{id}")
	public boolean deleteProduct(@PathVariable("id") Long id) {
		if(getBookById(id)!=null) {
			bookRepository.deleteById(id);
			return true;
		}else return false;
	}

	
	

}
