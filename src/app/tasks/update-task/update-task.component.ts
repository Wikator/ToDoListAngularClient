import {Component, inject, OnInit} from '@angular/core';
import {Task} from "../../_models/task";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskDetails} from "../../_models/task-details";
import {TaskService} from "../../_services/task.service";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private taskService: TaskService = inject(TaskService);
  private router: Router = inject(Router);

  initialTaskData: TaskDetails | null = null;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: string | null = params.get('id')
        if (id === null) {
          this.router.navigateByUrl('/groups')
        } else {
          this.taskService.getTask(id).subscribe({
            next: (task: TaskDetails) => {
              this.initialTaskData = task;
            }
          })
        }
      },
      error: (err) => console.log(err)
    })
  }

  update(task: Task) {
    this.taskService.updateTask(task).subscribe({
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
