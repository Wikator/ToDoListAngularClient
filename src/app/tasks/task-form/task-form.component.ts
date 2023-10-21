import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../_models/task";
import {Option} from "../../_models/option";
import {TaskService} from "../../_services/task.service";
import {DropdownsService} from "../../_services/dropdowns.service";
import {Category} from "../../_models/category";
import {Group} from "../../_models/group";
import {TaskDetails} from "../../_models/task-details";
import {group} from "@angular/animations";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() buttonText: string = ''
  @Input() initialFormData: TaskDetails | null = null;
  @Output() onSubmit: EventEmitter<Task> = new EventEmitter<Task>()
  taskForm: FormGroup = new FormGroup({});

  private taskService = inject(TaskService);
  private dropdownsService = inject(DropdownsService);
  private fb = inject(FormBuilder);

  categoryOptions: Option[] = [];
  groupOptions: Option[] = [];

  ngOnInit() {
    this.initializeForm();
    this.getData();
  }

  private initializeForm() {
    if (this.initialFormData) {
      this.taskForm = this.fb.group({
        id: [this.initialFormData.id],
        name: [this.initialFormData.name, Validators.required],
        description: [this.initialFormData.description],
        deadline: [this.initialFormData.deadline],
        categoryId: [this.initialFormData.category.id, Validators.required],
        groupId: [this.initialFormData.group?.id]
      })
    } else {
      this.taskForm = this.fb.group({
        id: [0],
        name: ['', Validators.required],
        description: [null as string | null],
        deadline: [null as Date | null],
        categoryId: [null as number | null, Validators.required],
        groupId: [null as number | null]
      })
    }
  }

  private getData() {
    this.dropdownsService.getTaskDropdowns().subscribe({
      next: obj => {
        this.categoryOptions = obj.categories.map((category: Category) => {
          return {
            name: category.name,
            value: category.id
          }
        });
        this.groupOptions = obj.groups.map((group: Group) => {
          return {
            name: group.name,
            value: group.id
          }
        })
      },
      error: err => {
        console.log(err)
      }
    });
  }

  onButtonPress() {
    const task: Task = this.taskForm.value as Task;
    this.onSubmit.emit(task);
  }

  onCategoryChange(e: number) {
    this.categoryId?.setValue(e, {
      onlySelf: true,
    });
  }

  onGroupChange(e: number) {
    this.groupId?.setValue(e, {
      onlySelf: true,
    });
  }

  get categoryId() {
    return this.taskForm.get('categoryId');
  }

  get groupId() {
    return this.taskForm.get('groupId');
  }

}
