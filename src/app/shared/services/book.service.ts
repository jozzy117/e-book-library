import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Book } from '../models/book.model';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  allBooksUrl = env.apiUrl + "books";
  addBookUrl = env.apiUrl + "books";
  editBookUrl = env.apiUrl ;
  deleteBookUrl = env.apiUrl ;

  constructor(private http: HttpClient ) { }

  getBooks(): Observable<any> {
    return this.http.get(this.allBooksUrl)
    .pipe(retry(1));
  }

  addBook(book: object): Observable<Book> {
    return this.http.post<Book>(this.addBookUrl, JSON.stringify(book), this.httpOptions)
    .pipe(retry(1));
  }

  editBook(bookId:string, book:object): Observable<Book> {
    return this.http.put<Book>(this.editBookUrl + bookId, JSON.stringify(book), this.httpOptions)
    .pipe(retry(1));
  }
  
  deleteBook(bookId:string): Observable<Book> {
    return this.http.delete<Book>(this.deleteBookUrl + bookId, this.httpOptions)
    .pipe(retry(1));
  }

}
