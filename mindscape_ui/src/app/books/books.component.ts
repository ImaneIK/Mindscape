import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../book.model';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  books: Book[] = [];
  filters: { genre?: string; author?: string; publisher?: string; } | undefined;
  selectedCategories: any = {};
  publisherFilter: any;
  authorFilter: any;
  filteredBooks : Book[] = [];


  constructor(private bookService: BooksService) {
    this.selectedCategories = {
      fantasy: false,
      classic: false,
      dystopian: false,
      'Coming-of-Age': false,
      'philosophical fiction': false,
      romance: false,
      Mystery: false
    };
   }

  ngOnInit(): void {
    // Load all books initially
    this.bookService.getAllBooks().subscribe(
      books => {
        this.books = books;
        this.filteredBooks = books; // Display all books initially
      },
      error => {
        console.error('Error fetching all books:', error);
      }
    );
  }

  applyFilters() {
    // Check if all filter criteria are empty
    if (!this.getSelectedGenres().length && !this.authorFilter && !this.publisherFilter) {
      // If all criteria are empty, get all books
      console.log(this.getSelectedGenres())
      this.getAllBooks();
    } else {
      // Call your service method with the selected filters
      const filters: { genre?: string[], author?: string, publisher?: string } = {
        genre: this.getSelectedGenres(),
        author: this.authorFilter,
        publisher: this.publisherFilter
      };
      
      this.bookService.getBooksByFilters(filters)
        .subscribe(books => {
          // Handle the filtered books
          this.filteredBooks = books;
        });
    }
  }



  getSelectedGenres(): string[] {
    return Object.keys(this.selectedCategories).filter(category => this.selectedCategories[category]);
  }

  getAllBooks(): void {
    this.bookService.getAllBooks().subscribe(books => {
      this.filteredBooks = books;
      this.books = books;
    });
  }

 
    

 
}
