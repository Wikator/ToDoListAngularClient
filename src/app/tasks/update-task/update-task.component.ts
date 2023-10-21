import {Component, inject, OnInit} from '@angular/core';
import {TaskEditor} from "../task-editor";
import {Task} from "../../_models/task";
import {ActivatedRoute} from "@angular/router";
import {TaskDetails} from "../../_models/task-details";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent extends TaskEditor implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute)

  ngOnInit() {
    this.initializeForm();
    this.getData();
  }

  protected override getData() {
    super.getData();
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: string | null = params.get('id')
        if (id === null) {
          this.router.navigateByUrl('/groups')
        } else {
          this.taskService.getTask(id).subscribe({
            next: (task: TaskDetails) => {
              this.taskForm.patchValue({
                id: task.id,
                name: task.name,
                description: task.description,
                deadline: task.deadline,
                categoryId: task.category.id,
                groupId: task.group?.id,
              });
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
