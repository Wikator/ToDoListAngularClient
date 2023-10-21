import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Group } from '../_models/group';
import { Category } from '../_models/category';
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";
import {Subject} from "../_models/subject";

@Injectable({
  providedIn: 'root'
})
export class DropdownsService {
  private http: HttpClient = inject(HttpClient);

  private baseUrl: string = environment.baseApiUrl + 'dropdowns/';

  getTaskDropdowns(): Observable<{ groups: Group[], categories: Category[], subjects: Subject[] }> {
    return this.http.get<{ groups: Group[], categories: Category[], subjects: Subject[] }>(this.baseUrl + '/tasks');
  }
}
