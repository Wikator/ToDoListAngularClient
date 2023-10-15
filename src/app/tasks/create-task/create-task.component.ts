import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/_models/category';
import { Group } from 'src/app/_models/group';
import { Option } from 'src/app/_models/option';
import { Task } from 'src/app/_models/task';
import { DropdownsService } from 'src/app/_services/dropdowns.service';
import { TaskService } from 'src/app/_services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  private taskService = inject(TaskService);
  private dropdownsService = inject(DropdownsService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  taskForm: FormGroup = new FormGroup({});
  categoryOptions: Option[] = [];
  groupOptions: Option[] = [];
  validationErrors: string | null = null;

  ngOnInit(): void {
    this.getData();
    this.initializeForm();
  }

  private initializeForm() {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [null as string | null],
      deadline: [null as Date | null],
      categoryId: [null as number | null, Validators.required],
      groupId: [null as number | null]
    })
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
    })
  }

  onCategoryChange(e: number) {
    this.categoryId?.setValue(e, {
      onlySelf: true,
    });
  }

  get categoryId() {
    return this.taskForm.get('categoryId');
  }

  submit() {
    const task: Task = this.taskForm.value;
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
