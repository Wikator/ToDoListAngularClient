import {Component, inject, OnInit} from '@angular/core';
import {Task} from "../../core/models/task";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskDetails} from "../../core/models/task-details";
import {TaskService} from "../../core/services/task.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private taskService: TaskService = inject(TaskService);
  private router: Router = inject(Router);
  private toastr: ToastrService = inject(ToastrService);

  initialTaskData: TaskDetails | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: string | null = params.get('id')
        if (id === null) {
          this.router.navigateByUrl('/groups')
        } else {
          this.taskService.getTask(id).subscribe({
            next: (task: TaskDetails) => this.initialTaskData = task,
            error: (err) => this.toastr.error(err.statusText)
          });
        }
      },
      error: (err) => console.log(err)
    })
  }

  update(task: Task): void {
    this.taskService.updateTask(task).subscribe({
      next: () => this.router.navigateByUrl('/tasks/my-tasks'),
      error: (err) => this.toastr.error(err.statusText)
    });
  }
}
