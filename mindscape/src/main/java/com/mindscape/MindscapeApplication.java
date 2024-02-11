package com.mindscape;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mindscape.dao.BookRepository;

@SpringBootApplication
public class MindscapeApplication {

	public static void main(String[] args) {
		
		SpringApplication.run(MindscapeApplication.class, args);
		
		
	}

}
