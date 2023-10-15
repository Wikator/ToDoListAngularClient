import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Group } from '../_models/group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/groups';

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
  }

  getGroup(id: string): Observable<Group> {
    return this.http.get<Group>(`${this.baseUrl}/${id}`);
  }
}
