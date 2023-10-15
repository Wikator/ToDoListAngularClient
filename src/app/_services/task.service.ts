import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '../_models/task';
import { TaskDetails } from '../_models/task-details';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/';

  createTask(task: Task) {
    return this.http.post<Task>(this.baseUrl + 'tasks', task);
  }

  getMyTasks() {
    return this.http.get<TaskDetails[]>(this.baseUrl + 'my_tasks');
  }

  getTask(id: string) {
    return this.http.get<TaskDetails>(this.baseUrl + 'tasks/' + id);
  }

  deleteTask(id: number) {
    return this.http.delete(this.baseUrl + 'tasks/' + id);
  }
}
