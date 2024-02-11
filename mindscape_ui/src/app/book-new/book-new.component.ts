import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../books.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css']
})
export class BookNewComponent implements OnInit {
  @Input() book!: Book;
  @Output() closeModal = new EventEmitter<void>();
  addForm!: FormGroup;

  constructor(private booksService: BooksService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: [''],
      cover: [''],
      genre: [''],
      pub_date: [''],
      nbr_pages: [0, Validators.min(0)],
      langage: [''],
      rating: [0, Validators.min(0)],
      url: [''],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.addForm) {
      const newBook: Book = {
        ...this.book,
        title: this.addForm.get('title')?.value || 'NAN',
        author: this.addForm.get('author')?.value || 'NAN',
        publisher: this.addForm.get('publisher')?.value || '',
        cover: this.addForm.get('cover')?.value || '',
        genre: this.addForm.get('genre')?.value || '',
        pub_date: this.addForm.get('pub_date')?.value || '',
        nbr_pages: this.addForm.get('nbr_pages')?.value || 0,
        langage: this.addForm.get('langage')?.value || '',
        rating: this.addForm.get('rating')?.value || 0,
        url: this.addForm.get('url')?.value || '',
        description: this.addForm.get('description')?.value || ''
      };

      this.booksService.addNewBook(newBook).subscribe(
        (response: any) => {
          console.log('Book created successfully:', response);
          // Close the modal or handle the success scenario
          this.closeModal.emit();
          window.location.reload();
        },
        (error: any) => {
          console.error('Error creating book:', error);
          // Handle the error scenario
        }
      );
    } else {
      console.error('addForm is null or undefined');
      // Handle the case where addForm is null or undefined
    }
  }
}
