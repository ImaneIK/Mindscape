import { ModalService } from '../modal.service';
import { Component, Input } from '@angular/core';
import { Book } from '../book.model';
import { BooksService } from '../books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  books: Book[] = [];
  @Input() book: any; // Input property to receive the selected book data
  editForm!: FormGroup;
  selectedBook:any;
  showModal = false;
  showCreationModal = false
  numberOfBooks: number = 0;



  constructor(private bookService: BooksService,private modalService: ModalService,private fb: FormBuilder) {  }


  ngOnInit(): void {
    // Load all books initially
    this.bookService.getAllBooks().subscribe(
      books => {
        this.books = books;
        this.numberOfBooks = this.books.length;

      },
      error => {
        console.error('Error fetching all books:', error);
      }
    );


    // Initialize the form with the current book data
    this.editForm = this.fb.group({
      title: [this.book.title, Validators.required],
      author: [this.book.author, Validators.required],
      // Add other fields as needed
    });

    
    
  }

// Function to fetch the number of books
  private loadNumberOfBooks(): void {
    this.bookService.getNumberOfBooks().subscribe(
      (count: number) => {
        this.numberOfBooks = count;
        console.log(this.numberOfBooks);
      },
      (error: any) => {
        console.error('Error fetching number of books:', error);
      }
    );
  }

  getAllBooks(): void {
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
    });
  }


  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
     return this.getAllBooks();
    });
  }

  openEditForm(id: number): void {
    // Find the book with the specified ID
    const foundBook = this.books.find(book => book.id === id);
  
    // Check if a book with the specified ID was found
    if (foundBook) {
      this.selectedBook = foundBook;
      console.log(this.selectedBook);
      this.showModal = true;
    } else {
      // Handle the case where the book with the specified ID was not found
      console.error(`Book with ID ${id} not found.`);
    }
  }


  openCreationForm(): void {
        this.showCreationModal = true;  
  }

  creationModal(){
    this.showCreationModal = !this.showCreationModal;
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  // Close modal function
  closeModal(): void {
    this.showModal = false;
  }

}
