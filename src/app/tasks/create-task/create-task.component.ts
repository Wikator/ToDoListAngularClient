import {Component, inject} from '@angular/core';
import { Task } from 'src/app/core/models/task';
import {TaskService} from "../../core/services/task.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  private taskService: TaskService = inject(TaskService);
  private router: Router = inject(Router);
  private toastr: ToastrService = inject(ToastrService);

  create(task: Task): void {
    this.taskService.createTask(task).subscribe({
      next: () => this.router.navigateByUrl('/tasks/my-tasks'),
      error: err => this.toastr.error(err.statusText)
    })
  }
}
