import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from 'src/app/_services/task.service';
import {TaskDetails} from "../../_models/task-details";

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  private taskService = inject(TaskService);

  tasks: TaskDetails[] = [];

  ngOnInit() {
    this.taskService.getMyTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  delete(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== id);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
