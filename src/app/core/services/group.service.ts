import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Group } from '../models/group';
import {environment} from "../../../environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl: string = environment.baseApiUrl + 'groups/';

  private http: HttpClient = inject(HttpClient);

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
  }

  getGroup(id: string): Observable<Group> {
    return this.http.get<Group>(`${this.baseUrl}${id}`);
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.baseUrl, group);
  }

  updateGroup(group: Group): Observable<Object> {
    return this.http.put(this.baseUrl + group.id, group);
  }

  deleteGroup(id: string | number):Observable<Object> {
    return this.http.delete(this.baseUrl + id)
  }
}
