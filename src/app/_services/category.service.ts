import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/categories';

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl);
  }
}
