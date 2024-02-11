import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, switchMap } from 'rxjs';
import { Book } from './book.model';



@Injectable({
  providedIn: 'root'
})
export class BooksService{

  private apiUrl = 'http://localhost:8888/api/books';


  constructor(private http: HttpClient) { }


  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/all`);
  }

  getBookById(id: number): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book>(url);
  }

  getBooksByGenre(genre: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/byGenre/${genre}`);
  }

  getBooksByFilters(filters: { genre?: string[], author?: string, publisher?: string }): Observable<Book[]> {
    // Convert the array of genres to a comma-separated string
    const genreQueryParam = filters.genre ? filters.genre.join(',') : '';

    // Build the HTTP params
    let params = new HttpParams()
      .set('genre', genreQueryParam)
      .set('author', filters.author || '')
      .set('publisher', filters.publisher || '');

    // Make the HTTP request to your Spring Boot backend
    return this.http.get<Book[]>(`${this.apiUrl}/byFilters`, { params });
  }

  deleteBook(id: number): Observable<void> {
    const url = `${this.apiUrl}/book/${id}`;
    return this.http.delete<void>(url);
  }

  updateBook(id: number, updatedBook: Book): Observable<Book> {
    const url = `${this.apiUrl}/book/${id}`;
    return this.http.put<Book>(url, updatedBook);
  }

  addNewBook(addNewBook: any): Observable<Book[]> {
    const url = `${this.apiUrl}/newBook`;
  
    return this.http.post<Book>(url, addNewBook).pipe(
      switchMap(() => this.getAllBooks())
    );
  }

  getNumberOfBooks(): Observable<number> {
    const url = `${this.apiUrl}/count`;
    return this.http.get<number>(url);
  }
  

  
}

