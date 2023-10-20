import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Task} from "../../_models/task";
import {Option} from "../../_models/option";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() taskForm: FormGroup = new FormGroup({})
  @Input() buttonText: string = ''
  @Input() categoryOptions: Option[] = []
  @Output() onSubmit: EventEmitter<Task> = new EventEmitter<Task>()

  onButtonPress() {
    const task: Task = this.taskForm.value as Task;
    this.onSubmit.emit(task);
  }

  onCategoryChange(e: number) {
    this.categoryId?.setValue(e, {
      onlySelf: true,
    });
  }

  get categoryId() {
    return this.taskForm.get('categoryId');
  }
}
