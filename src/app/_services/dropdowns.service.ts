import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Group } from '../_models/group';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class DropdownsService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/dropdowns';

  getTaskDropdowns() {
    return this.http.get<{ groups: Group[], categories: Category[] }>(this.baseUrl + '/tasks');
  }
}
