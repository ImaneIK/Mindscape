import { BooksService } from './../books.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit  {

  @Input() book: any; // Input property to receive the selected book data
  @Output() closeModal = new EventEmitter<void>();
  editForm!: FormGroup;

  constructor(private fb: FormBuilder, private booksService: BooksService) {}

  ngOnInit(): void {
    // Initialize the form with the current book data
    this.editForm = this.fb.group({
      title: [this.book.title, Validators.required],
      author: [this.book.author, Validators.required],
      publisher: [this.book.publisher, Validators.required],
      cover: [this.book.cover, Validators.required],
      genre: [this.book.genre, Validators.required],
      pub_date: [this.book.pub_date, Validators.required],
      nbr_pages: [this.book.nbr_pages, Validators.required],
      language: [this.book.language, Validators.required],
      rating: [this.book.rating, Validators.required],
      url: [this.book.url, Validators.required],
      description: [this.book.description, Validators.required],
    });
  }

  onSubmit(): void {
    const updatedBook: Book = {
      ...this.book,
      title: this.editForm.get('title')?.value || '',
      author: this.editForm.get('author')?.value || '',
      publisher: this.editForm.get('publisher')?.value || '',
      cover: this.editForm.get('cover')?.value || '',
      genre: this.editForm.get('genre')?.value || '',
      pub_date: this.editForm.get('pub_date')?.value || '',
      nbr_pages: this.editForm.get('nbr_pages')?.value || 0,
      language: this.editForm.get('language')?.value || '',
      rating: this.editForm.get('rating')?.value || 0,
      url: this.editForm.get('url')?.value || '',
      description: this.editForm.get('description')?.value || '',
    };

    this.booksService.updateBook(this.book.id, updatedBook).subscribe(
      (response: any) => {
        console.log('Book updated successfully:', response);
        // Close the modal or handle the success scenario
        this.closeModal.emit();
      },
      (error: any) => {
        console.error('Error updating book:', error);
        // Handle the error scenario
      }
    );
  }
}
