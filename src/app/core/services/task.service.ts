import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreateUpdateTask } from '../models/task/create-update-task';
import {environment} from "../../../environment/environment";
import {Observable} from "rxjs";
import {Task} from "../models/task/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http: HttpClient = inject(HttpClient);

  private baseUrl: string = environment.baseApiUrl;

  createTask(task: CreateUpdateTask): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + 'tasks', task);
  }

  getMyTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + 'my_tasks');
  }

  updateTask(task: CreateUpdateTask): Observable<Object> {
    return this.http.put(this.baseUrl + 'tasks/' + task.id, task);
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(this.baseUrl + 'tasks/' + id);
  }

  deleteTask(id: number): Observable<Object> {
    return this.http.delete(this.baseUrl + 'tasks/' + id);
  }
}
