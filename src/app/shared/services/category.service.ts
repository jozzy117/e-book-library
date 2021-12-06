import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import {retry} from 'rxjs/operators';
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

  allCategoryUrl = env.apiUrl + "categories";
  addCategoryUrl = env.apiUrl + "categories";
  editCategoryUrl = env.apiUrl + "categories/";
  deleteCategotyUrl = env.apiUrl + "categories/";

  constructor(private http: HttpClient ) { }

  getCategories(): Observable<Category> {
    return this.http.get<Category>(this.allCategoryUrl)
    .pipe(retry(1));
  }

  addCategory(category: object): Observable<Category> {
    return this.http.post<Category>(this.addCategoryUrl, JSON.stringify(category), this.httpOptions)
    .pipe(retry(1));
  }

  editCategory(categoryId:string, category:object): Observable<Category> {
    return this.http.put<Category>(this.editCategoryUrl + categoryId, JSON.stringify(category), this.httpOptions)
    .pipe(retry(1));
  }
  
  deleteCategory(categoryId:string): Observable<Category> {
    return this.http.delete<Category>(this.deleteCategotyUrl + categoryId, this.httpOptions)
    .pipe(retry(1));
  }

}
