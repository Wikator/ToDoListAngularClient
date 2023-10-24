import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Group} from "../../core/models/group";

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
  @Input() buttonText = '';
  @Input() initialFormData: Group | null = null
  @Output() onSubmit: EventEmitter<Group> = new EventEmitter<Group>();
  private fb: FormBuilder = inject(FormBuilder);

  groupForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }

  protected initializeForm(): void {
    if (this.initialFormData) {
      this.groupForm = this.fb.group({
        id: [this.initialFormData.id],
        name: [this.initialFormData.name, Validators.required]
      });
    } else {
      this.groupForm = this.fb.group({
        id: [0],
        name: ['', Validators.required]
      });
    }
  }


  onButtonPress(): void {
    const group: Group = this.groupForm.value as Group;
    this.onSubmit.emit(group);
  }
}
