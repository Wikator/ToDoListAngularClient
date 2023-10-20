import {Component, inject, OnInit} from '@angular/core';
import {GroupService} from "../../_services/group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Group} from "../../_models/group";
import {GroupEditor} from "../group-editor";

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent extends GroupEditor implements OnInit{
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute)

  ngOnInit() {
    this.initializeForm();
    this.getData();
  }

  private getData() {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: string | null = params.get('id')
        if (id === null) {
          this.router.navigateByUrl('/groups')
        } else {
          this.groupsService.getGroup(id).subscribe({
            next: (group) => {
              this.groupForm.get('id')?.setValue(group.id, {
                self: true
              });
              this.groupForm.get('name')?.setValue(group.name, {
                self: true
              });
            }
          });
        }
      }
    });
  }

  submit(group: Group) {
    this.groupsService.updateGroup(group).subscribe({
      next: () => this.router.navigateByUrl('/groups'),
      error: (error) => console.log(error)
    })
  }
}
