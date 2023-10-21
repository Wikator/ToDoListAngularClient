import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Subject} from "../../_models/subject";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit {
  @Input() buttonText: string = '';
  @Input() initialFormData: Subject | null = null;
  @Output() onSubmit: EventEmitter<Subject> = new EventEmitter<Subject>();

  private fb: FormBuilder = inject(FormBuilder);

  subjectForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    if (this.initialFormData) {
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

  onButtonPress(): void {
    const subject: Subject = this.subjectForm.value as Subject;
    this.onSubmit.emit(subject);
  }

}
