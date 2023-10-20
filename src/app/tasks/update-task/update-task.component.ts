import {Component, inject, OnInit} from '@angular/core';
import {TaskEditor} from "../task-editor";
import {Task} from "../../_models/task";
import {ActivatedRoute} from "@angular/router";

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
            next: (task: Task) => {
              this.taskForm.get('id')?.setValue(task.id, {
                self: true
              });
              this.taskForm.get('name')?.setValue(task.name, {
                self: true
              });
              this.taskForm.get('description')?.setValue(task.description, {
                self: true
              });
              this.taskForm.get('deadline')?.setValue(task.deadline, {
                self: true
              });
              this.taskForm.get('categoryId')?.setValue(task.categoryId, {
                self: true
              });
              this.taskForm.get('groupId')?.setValue(task.groupId, {
                self: true
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
