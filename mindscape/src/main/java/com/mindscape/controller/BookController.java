package com.mindscape.controller;

import com.mindscape.entities.Book;
import com.mindscape.metier.BookService;
import com.mindscape.metier.IBook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
@RequestMapping("/api/books")
public class BookController {
	
	@Autowired
	IBook book;

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/all")
    public List<Book> getAllBooks() {
        return bookService.allBooks();
    }

    
   /* @GetMapping("/byFilters")
    public List<Book> getBooksByFilters(@RequestParam Map<String, String> filters) {
        return bookService.getBooksByFilters(filters);
    }*/
    
    @GetMapping("/byGenre/{genre}")
    public List<Book> getBooksByGenre(@PathVariable String genre) {
        return bookService.listBooksByGenre(genre);
    }

    // Add similar methods for other search criteria...

    // Example for searching books by title
    @GetMapping("/byTitle")
    public List<Book> getBooksByTitle(@RequestParam String title) {
        return bookService.listBooksBytitle(title);
    }

    // Example for searching books by author
    @GetMapping("/byAuthor")
    public List<Book> getBooksByAuthor(@RequestParam String author) {
        return bookService.listBooksByAuthor(author);
    }

    @GetMapping("/byFilters")
    public List<Book> getBooksByMultipleFilters(@RequestParam(required = false) List<String> genre,
                                                @RequestParam(required = false) String author,
                                                @RequestParam(required = false) String publisher) {
        return bookService.getBooksByMultipleFilters(genre, author, publisher);
    }
}