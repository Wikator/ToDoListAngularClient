import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import {TaskDetails} from "../../core/models/task-details";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  private taskService: TaskService = inject(TaskService);
  private toastr: ToastrService = inject(ToastrService);

  tasks: TaskDetails[] = [];

  ngOnInit(): void {
    this.taskService.getMyTasks().subscribe({
      next: (tasks: TaskDetails[]) => this.tasks = tasks,
      error: (err) => this.toastr.error(err.statusText)
    });
  }

  delete(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.tasks = this.tasks.filter((task: TaskDetails) => task.id !== id),
      error: (err) => this.toastr.error(err.statusText)
    });
  }
}
