import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Subject} from "../../core/models/subject";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectTime} from "../../core/models/subject-time/subject-time";
import {SubjectService} from "../../core/services/subject.service";
import {ToastrService} from "ngx-toastr";
import {group} from "@angular/animations";
import {SubjectTimeService} from "../../core/services/subject-time.service";
import {CreateUpdateTask} from "../../core/models/task/create-update-task";
import {CreateUpdateSubjectTime} from "../../core/models/subject-time/create-update-subject-time";

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit {
  @Input() buttonText = '';
  @Input() initialFormData: Subject | null = null;
  @Output() onSubmit: EventEmitter<Subject> = new EventEmitter<Subject>();

  private fb: FormBuilder = inject(FormBuilder);
  private toastr: ToastrService = inject(ToastrService)
  private subjectService: SubjectService = inject(SubjectService);
  private subjectTimeService: SubjectTimeService = inject(SubjectTimeService);

  subjectForm: FormGroup = new FormGroup({});
  groupNames: string[] = [];

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    if (this.initialFormData) {
      this.subjectService.getSubjectTimes(this.initialFormData.id).subscribe({
        next: (subjectTimes: SubjectTime[]) => {
          this.groupNames = subjectTimes.map((st) => st.group.name);
          const formArray: FormArray = this.fb.array(subjectTimes.map(st => this.fb.group({
            id: [st.id],
            time: [st.time, Validators.required]
          })));
          this.subjectForm.addControl('subjectTimes', formArray);
          console.log(this.subjectForm.controls);
        },
        error: (err) => this.toastr.error(err.statusText)
      });

      this.subjectForm = this.fb.group({
        id: [this.initialFormData.id],
        name: [this.initialFormData.name, Validators.required]
      });
    } else {
      this.subjectForm = this.fb.group({
        id: [0],
        name: ['', Validators.required]
      });
    }
  }

  get subjectTimes() {
    return this.subjectForm.get('subjectTimes') as FormArray;
  }

  onButtonPress(): void {
    const subject: Subject = this.subjectForm.value as Subject;
    const subjectTimes = this.subjectForm.controls['subjectTimes'].value as CreateUpdateSubjectTime[];
    subjectTimes.forEach(s => {
      this.subjectTimeService.updateSubjectTime(s).subscribe({
        error: (err) => this.toastr.error(err.statusText)
      })
    })
    this.onSubmit.emit(subject);
  }

  protected readonly group = group;
  protected readonly Object = Object;
}
