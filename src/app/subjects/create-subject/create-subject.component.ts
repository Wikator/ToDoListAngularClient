import {Component, inject} from '@angular/core';
import {SubjectService} from "../../core/services/subject.service";
import {Router} from "@angular/router";
import {Subject} from "../../core/models/subject";
import {ToastrService} from "ngx-toastr";
import {CreateUpdateSubjectTime} from "../../core/models/subject-time/create-update-subject-time";
import {SubjectTimeService} from "../../core/services/subject-time.service";
import {SubjectTime} from "../../core/models/subject-time/subject-time";
import {Time} from "@angular/common";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent {
  private subjectService: SubjectService = inject(SubjectService);
  private subjectTimeService: SubjectTimeService = inject(SubjectTimeService);
  private router: Router = inject(Router);
  private toastr: ToastrService = inject(ToastrService)

  create(subject: {subject: Subject, subjectTimes: CreateUpdateSubjectTime[]}): void {
    this.subjectService.create(subject.subject).subscribe({
      next: (newSubject: Subject) => {
        this.subjectService.getSubjectTimes(newSubject.id).subscribe({
          next: (subjectTimes: SubjectTime[]) => {
            subjectTimes.forEach((subjectTime: SubjectTime) => {
              const correspondingSubjectTime: CreateUpdateSubjectTime | undefined =
                subject.subjectTimes.find(s => s.group_id === subjectTime.group.id)
              const time: Time | null = correspondingSubjectTime ?
                correspondingSubjectTime.time :
                subjectTime.time
              if (time !== subjectTime.time) {
                const updateSubjectTime: CreateUpdateSubjectTime = {
                  id: subjectTime.id,
                  group_id: subjectTime.group.id,
                  subject_id: subjectTime.subject.id,
                  time: time
                }
                this.subjectTimeService.updateSubjectTime(updateSubjectTime).subscribe({
                  error: (err) => this.toastr.error(err.statusText)
                });
              }
            })
          }
        })
        this.router.navigateByUrl('/subjects')
      },
      error: (err) => this.toastr.error(err.statusText)
    });
  }
}
