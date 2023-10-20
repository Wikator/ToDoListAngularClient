import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Group } from '../_models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = 'http://localhost:3000/groups/';

  private http = inject(HttpClient);

  getGroups() {
    return this.http.get<Group[]>(this.baseUrl);
  }

  getGroup(id: string) {
    return this.http.get<Group>(`${this.baseUrl}${id}`);
  }

  createGroup(group: Group) {
    return this.http.post<Group>(this.baseUrl, group);
  }

  updateGroup(group: Group) {
    return this.http.put(this.baseUrl + group.id, group);
  }

  deleteGroup(id: string | number) {
    return this.http.delete(this.baseUrl + id)
  }
}
