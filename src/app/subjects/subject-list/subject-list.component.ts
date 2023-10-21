import {Component, inject, OnInit} from '@angular/core';
import {SubjectService} from "../../_services/subject.service";
import {Subject} from "../../_models/subject";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit{
  private subjectService: SubjectService = inject(SubjectService);

  subjects: Subject[] = [];

  ngOnInit(): void {
    this.subjectService.getSubjects().subscribe({
      next: (subjects: Subject[]) => this.subjects = subjects,
      error: (err) => console.log(err)
    });
  }

  delete(id: number): void {
    this.subjectService.delete(id).subscribe({
      next: () => this.subjects = this.subjects.filter((s: Subject) => s.id !== id),
      error: (err) => console.log(err)
    });
  }
}
