import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateUpdateTask} from "../../core/models/task/create-update-task";
import {Option} from "../../core/models/option";
import {Category} from "../../core/models/category";
import {Group} from "../../core/models/group";
import {Subject} from "../../core/models/subject";
import {GroupService} from "../../core/services/group.service";
import {SubjectService} from "../../core/services/subject.service";
import {CategoryService} from "../../core/services/category.service";
import {ToastrService} from "ngx-toastr";
import {Task} from "../../core/models/task/task";
import {SubjectTime} from "../../core/models/subject-time/subject-time";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() buttonText: string = ''
  @Input() initialFormData: Task | null = null;
  @Output() onSubmit: EventEmitter<CreateUpdateTask> = new EventEmitter<CreateUpdateTask>()
  taskForm: FormGroup = new FormGroup({});

  private groupService: GroupService = inject(GroupService);
  private subjectService: SubjectService = inject(SubjectService);
  private categoryService: CategoryService = inject(CategoryService);
  private fb: FormBuilder = inject(FormBuilder);
  private toastr: ToastrService = inject(ToastrService);

  categoryOptions: Option[] = [];
  groupOptions: Option[] = [];
  subjectOptions: Option[] = [];

  ngOnInit(): void {
    this.initializeForm();
    this.getData();
  }

  private initializeForm(): void {
    if (this.initialFormData) {
      this.taskForm = this.fb.group({
        id: [this.initialFormData.id],
        name: [this.initialFormData.name, Validators.required],
        description: [this.initialFormData.description],
        deadline: [this.initialFormData.deadline],
        categoryId: [this.initialFormData.category.id, Validators.required],
        subjectId: [this.initialFormData.subject?.id],
        groupId: [this.initialFormData.group?.id]
      })
    } else {
      this.taskForm = this.fb.group({
        name: ['', Validators.required],
        description: [null as string | null],
        deadline: [null as Date | null],
        categoryId: [null as number | null, Validators.required],
        subjectId: [null as number | null],
        groupId: [null as number | null]
      })
    }
  }

  private getData(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categoryOptions = categories.map((category: Category) => {
          return {
            name: category.name,
            value: category.id
          }
        });
      },
      error: (err) => this.toastr.error(err.statusText)
    });

    this.groupService.getGroups().subscribe({
      next: (groups: Group[]) => {
        this.groupOptions = groups.map((group: Group) => {
          return {
            name: group.name,
            value: group.id
          }
        });
      },
      error: (err) => this.toastr.error(err.statusText)
    });

    this.subjectService.getSubjects().subscribe({
      next: (subjects: Subject[]) => {
        this.subjectOptions = subjects.map((subject: Subject) => {
          return {
            name: subject.name,
            value: subject.id
          }
        });
      },
      error: (err) => this.toastr.error(err.statusText)
    });
  }

  onButtonPress(): void {
    const task: CreateUpdateTask = this.taskForm.value as CreateUpdateTask;
    this.onSubmit.emit(task);
  }

  onCategoryChange(e: number): void {
    this.categoryId?.setValue(e, {
      onlySelf: true,
    });
  }

  onGroupChange(e: number): void {
    this.groupId?.setValue(e, {
      onlySelf: true,
    });
  }

  onSubjectChange(e: number): void {
    this.subjectId?.setValue(e, {
      onlySelf: true,
    });
  }

  get categoryId() {
    return this.taskForm.get('categoryId');
  }

  get groupId() {
    return this.taskForm.get('groupId');
  }

  get subjectId() {
    return this.taskForm.get('subjectId');
  }

}
