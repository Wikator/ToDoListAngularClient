import {Component, OnInit} from '@angular/core';
import {Group} from "../../_models/group";
import {GroupEditor} from "../group-editor";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent extends GroupEditor implements OnInit{

  ngOnInit() {
    this.initializeForm();
  }

  submit(group: Group) {
    console.log(group)
    this.groupsService.createGroup(group).subscribe({
      next: () => this.router.navigateByUrl('/groups'),
      error: (error) => console.error(error)
    });
  }
}
