import {Component, inject} from '@angular/core';
import {SubjectService} from "../../core/services/subject.service";
import {Router} from "@angular/router";
import {Subject} from "../../core/models/subject";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent {
  private subjectService: SubjectService = inject(SubjectService);
  private router: Router = inject(Router);
  private toastr: ToastrService = inject(ToastrService)

  create(subject: Subject): void {
    this.subjectService.create(subject).subscribe({
      next: () => this.router.navigateByUrl('/subjects'),
      error: (err) => this.toastr.error(err.statusText)
    });
  }
}
