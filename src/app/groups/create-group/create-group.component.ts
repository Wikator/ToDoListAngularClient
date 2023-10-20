import {Component, inject, OnInit} from '@angular/core';
import {GroupService} from "../../_services/group.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Group} from "../../_models/group";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit{

  private groupsService = inject(GroupService);
  private fb = inject(FormBuilder);
  private router = inject(Router)

  groupForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.groupForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  submit(group: Group) {
    console.log(group)
    this.groupsService.createGroup(group).subscribe({
      next: () => this.router.navigateByUrl('/groups'),
      error: (error) => console.error(error)
    });
  }
}
