import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '../models/category';
import {Observable} from "rxjs";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http: HttpClient = inject(HttpClient);

  private baseUrl: string = environment.baseApiUrl + 'categories/';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategory(id: string | number): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + id);
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  update(category: Category): Observable<Object> {
    return this.http.put(this.baseUrl + category.id, category);
  }

  delete(id: string | number): Observable<Object> {
    return this.http.delete(this.baseUrl + id);
  }
}
