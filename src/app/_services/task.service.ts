import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '../_models/task';
import {TaskDetails} from "../_models/task-details";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http: HttpClient = inject(HttpClient);

  private baseUrl: string = environment.baseApiUrl;

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + 'tasks', task);
  }

  getMyTasks(): Observable<TaskDetails[]> {
    return this.http.get<TaskDetails[]>(this.baseUrl + 'my_tasks');
  }

  updateTask(task: Task): Observable<Object> {
    return this.http.put(this.baseUrl + 'tasks/' + task.id, task);
  }

  getTask(id: string): Observable<TaskDetails> {
    return this.http.get<TaskDetails>(this.baseUrl + 'tasks/' + id);
  }

  deleteTask(id: number): Observable<Object> {
    return this.http.delete(this.baseUrl + 'tasks/' + id);
  }
}
