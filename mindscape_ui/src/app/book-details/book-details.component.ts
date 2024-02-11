import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  book!: Book;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookId = Number(params.get('id'));
      this.getBookDetails(bookId);
    });
  }

  getBookDetails(id: number): void {
    this.booksService.getBookById(id).subscribe(
      book => {
        this.book = book;
      },
      error => {
        console.error('Error fetching book details:', error);
      }
    );
  }
}
