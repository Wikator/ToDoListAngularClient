import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Subject} from "../../core/models/subject";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectTime} from "../../core/models/subject-time/subject-time";
import {SubjectService} from "../../core/services/subject.service";
import {ToastrService} from "ngx-toastr";
import {CreateUpdateSubjectTime} from "../../core/models/subject-time/create-update-subject-time";
import {GroupService} from "../../core/services/group.service";
import {Group} from "../../core/models/group";

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit {
  @Input() buttonText: string = '';
  @Input() initialFormData: Subject | null = null;
  @Output() onSubmit: EventEmitter<{subject: Subject, subjectTimes: CreateUpdateSubjectTime[]}> = new EventEmitter<{subject: Subject, subjectTimes: CreateUpdateSubjectTime[]}>();

  private fb: FormBuilder = inject(FormBuilder);
  private toastr: ToastrService = inject(ToastrService)
  private subjectService: SubjectService = inject(SubjectService);
  private groupsService: GroupService = inject(GroupService)

  subjectForm: FormGroup = new FormGroup({});
  groupNames: string[] = [];

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.subjectForm = this.fb.group({
      id: [this.initialFormData ? this.initialFormData.id : 0],
      name: [this.initialFormData ? this.initialFormData.name : '', Validators.required]
    });

    if (this.initialFormData) {
      this.subjectService.getSubjectTimes(this.initialFormData.id).subscribe({
        next: (subjectTimes: SubjectTime[]) => {
          this.groupNames = subjectTimes.map((st: SubjectTime) => st.group.name);
          const formArray: FormArray = this.fb.array(subjectTimes.map((st: SubjectTime) => this.fb.group({
            id: [st.id],
            time: [st.time],
            group_id: [st.group.id]
          })));
          this.subjectForm.addControl('subjectTimes', formArray);
          console.log(this.subjectForm.controls);
        },
        error: (err) => this.toastr.error(err.statusText)
      });
    } else {
      this.groupsService.getGroups().subscribe({
        next: (groups: Group[]) => {
          this.groupNames = groups.map((g: Group) => g.name);
          const formArray: FormArray = this.fb.array(groups.map((g: Group) => this.fb.group({
            id: [0],
            time: [null],
            group_id: [g.id]
          })));
          this.subjectForm.addControl('subjectTimes', formArray);
          console.log(this.subjectForm.controls);
        }
      })
    }
  }

  get subjectTimes() {
    return this.subjectForm.get('subjectTimes') as FormArray;
  }

  onButtonPress(): void {
    const subject: Subject = this.subjectForm.value as Subject;
    const subjectTimes: CreateUpdateSubjectTime[] = this.subjectForm.get('subjectTimes')?.value.map((s: any) => {
      return {
        id: s.id,
        group_id: s.group_id,
        time: s.time
      } as CreateUpdateSubjectTime;
    });
    this.onSubmit.emit({subject: subject, subjectTimes: subjectTimes});
  }
}
