import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Group} from "../../_models/group";

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent {
  @Input() groupForm: FormGroup = new FormGroup({});
  @Input() buttonText: string = '';
  @Output() onSubmit: EventEmitter<Group> = new EventEmitter<Group>();


  onButtonPress() {
    const group: Group = this.groupForm.value as Group;
    this.onSubmit.emit(group);
  }
}
