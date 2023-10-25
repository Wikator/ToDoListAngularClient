import {Component, inject, OnInit} from '@angular/core';
import {CreateUpdateTask} from "../../core/models/task/create-update-task";
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../../core/models/task/task";
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

  initialTaskData: Task | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: string | null = params.get('id')
        if (id === null) {
          this.router.navigateByUrl('/groups')
        } else {
          this.taskService.getTask(id).subscribe({
            next: (task: Task) => this.initialTaskData = task,
            error: (err) => this.toastr.error(err.statusText)
          });
        }
      },
      error: (err) => console.log(err)
    })
  }

  update(task: CreateUpdateTask): void {
    this.taskService.updateTask(task).subscribe({
      next: () => this.router.navigateByUrl('/tasks/my-tasks'),
      error: (err) => this.toastr.error(err.statusText)
    });
  }
}
