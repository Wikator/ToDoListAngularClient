import {Component, inject, OnInit} from '@angular/core';
import {SubjectService} from "../../core/services/subject.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../../core/models/subject";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css']
})
export class UpdateSubjectComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private subjectService: SubjectService = inject(SubjectService);
  private router: Router = inject(Router);
  private toastr: ToastrService = inject(ToastrService);

  initialSubjectData: Subject | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: string | null = params.get('id');
        if (id === null) {
          this.router.navigateByUrl('/groups');
        } else {
          this.subjectService.getSubject(id).subscribe({
            next: (subject: Subject) => this.initialSubjectData = subject
          });
        }
      }
    });
  }

  update(subject: Subject): void {
    this.subjectService.update(subject).subscribe({
      next: () => this.router.navigateByUrl('/subjects'),
      error: (err) => this.toastr.error(err.statusText)
    });
  }
}
