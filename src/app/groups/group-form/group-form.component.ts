import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Group} from "../../_models/group";
import {GroupService} from "../../_services/group.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
  @Input() buttonText: string = '';
  @Input() initialFormData: Group | null = null
  @Output() onSubmit: EventEmitter<Group> = new EventEmitter<Group>();
  private fb: FormBuilder = inject(FormBuilder);

  groupForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.initializeForm();
  }

  protected initializeForm() {
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


  onButtonPress() {
    const group: Group = this.groupForm.value as Group;
    this.onSubmit.emit(group);
  }
}
