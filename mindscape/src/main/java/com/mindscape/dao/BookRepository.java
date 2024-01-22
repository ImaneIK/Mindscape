package com.mindscape.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.mindscape.entities.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
	
	@Query("SELECT b FROM Book b WHERE (:genres IS NULL OR b.genre IN :genres) OR " +
	           "(:author IS NULL OR b.author = :author) OR " +
	           "(:publisher IS NULL OR b.publisher = :publisher)")
	    List<Book> findByMultipleFilters(@Param("genres") List<String> genres,
	                                    @Param("author") String author,
	                                    @Param("publisher") String publisher);

	
}
