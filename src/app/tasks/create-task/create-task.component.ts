import {Component, inject} from '@angular/core';
import { Task } from 'src/app/_models/task';
import {TaskService} from "../../_services/task.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  private taskService: TaskService = inject(TaskService);
  private router: Router = inject(Router);

  create(task: Task) {
    this.taskService.createTask(task).subscribe({
      next: () => {
        this.router.navigateByUrl('/tasks/my-tasks');
      },
      error: err => {
        console.log(err)
        // this.validationErrors = [err.error.status.message];
      }
    })
  }
}
