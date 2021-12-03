import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Book } from '../models/book.model';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  allBooksUrl = env + "books";
  bookByCategoryUrl = env + "books?categoryId=";
  bookByFavouriteUrl = env + "favouriteBooks";
  addBookUrl = env + "addBook?categoryId=";
  editBookUrl = env + "editBook?bookId=";
  deleteBookUrl = env + "deleteBook?bookId=";

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book> {
    return this.http.get<Book>(this.allBooksUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getBook(categoryId: string): Observable<Book> {
    return this.http.get<Book>(this.bookByCategoryUrl + categoryId)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getFavourites(): Observable<Book> {
    return this.http.get<Book>(this.bookByFavouriteUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  addBook(categoryId:string, book: object): Observable<Book> {
    return this.http.post<Book>(this.addBookUrl + categoryId, JSON.stringify(book), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  editBook(bookId:string, book:object): Observable<Book> {
    return this.http.put<Book>(this.editBookUrl + bookId, JSON.stringify(book), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  
  deleteBook(bookId:string): Observable<Book> {
    return this.http.delete<Book>(this.deleteBookUrl + bookId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


   // Error handling 
   handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
