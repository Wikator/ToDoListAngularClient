import {inject, OnInit} from "@angular/core";
import {TaskService} from "../_services/task.service";
import {DropdownsService} from "../_services/dropdowns.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Option} from "../_models/option";
import {Category} from "../_models/category";
import {Group} from "../_models/group";

export class TaskEditor {
  protected taskService = inject(TaskService);
  protected router = inject(Router);
  private dropdownsService = inject(DropdownsService);
  private fb = inject(FormBuilder);

  taskForm: FormGroup = new FormGroup({});
  categoryOptions: Option[] = [];
  groupOptions: Option[] = [];
  // validationErrors: string | null = null;



  protected initializeForm() {
    this.taskForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: [null as string | null],
      deadline: [null as Date | null],
      categoryId: [null as number | null, Validators.required],
      groupId: [null as number | null]
    })
  }

  protected getData() {
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
}
