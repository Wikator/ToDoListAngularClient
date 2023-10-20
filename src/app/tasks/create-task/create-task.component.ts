import {Component, OnInit} from '@angular/core';
import { Task } from 'src/app/_models/task';
import {TaskEditor} from "../task-editor";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent extends TaskEditor implements OnInit{

  ngOnInit() {
    this.initializeForm();
    this.getData();
  }

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
