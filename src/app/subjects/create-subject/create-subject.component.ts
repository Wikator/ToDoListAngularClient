import {Component, inject} from '@angular/core';
import {SubjectService} from "../../_services/subject.service";
import {Router} from "@angular/router";
import {Subject} from "../../_models/subject";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent {
  private subjectService: SubjectService = inject(SubjectService);
  private router: Router = inject(Router);

  create(subject: Subject): void {
    this.subjectService.create(subject).subscribe({
      next: () => this.router.navigateByUrl('/subjects'),
      error: (err) => console.log(err)
    });
  }
}
