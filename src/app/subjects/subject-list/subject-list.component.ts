import {Component, inject, OnInit} from '@angular/core';
import {SubjectService} from "../../core/services/subject.service";
import {Subject} from "../../core/models/subject";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  private subjectService: SubjectService = inject(SubjectService);
  private toastr: ToastrService = inject(ToastrService);

  subjects: Subject[] = [];

  ngOnInit(): void {
    this.subjectService.getSubjects().subscribe({
      next: (subjects: Subject[]) => this.subjects = subjects,
      error: (err) => this.toastr.error(err.statusText)
    });
  }

  delete(id: number): void {
    this.subjectService.delete(id).subscribe({
      next: () => this.subjects = this.subjects.filter((s: Subject) => s.id !== id),
      error: (err) => this.toastr.error(err.statusText)
    });
  }
}
