import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  allCategoryUrl = env + "categories";
  categoryByIdUrl = env + "category?categoryId=";
  addCategoryUrl = env + "addCategory";
  editCategoryUrl = env + "editCategory?categoryId=";
  deleteCategotyUrl = env + "deleteCategory?categoryId=";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category> {
    return this.http.get<Category>(this.allCategoryUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getCategory(): Observable<Category> {
    return this.http.get<Category>(this.categoryByIdUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  addCategory(category: object): Observable<Category> {
    return this.http.post<Category>(this.addCategoryUrl, JSON.stringify(category), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  editCategory(categoryId:string, category:object): Observable<Category> {
    return this.http.put<Category>(this.editCategoryUrl + categoryId, JSON.stringify(category), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  
  deleteCategory(categoryId:string): Observable<Category> {
    return this.http.delete<Category>(this.deleteCategotyUrl + categoryId, this.httpOptions)
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
