import {Component, inject, OnInit} from '@angular/core';
import {GroupsService} from "../../_services/groups.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit{

  private groupsService = inject(GroupsService);
  private fb = inject(FormBuilder);
  private router = inject(Router)

  groupForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.groupForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  submit() {
    const group = this.groupForm.value;
    this.groupsService.createGroup(group).subscribe({
      next: () => this.router.navigateByUrl('/groups'),
      error: (error) => console.error(error())
    });
  }
}
