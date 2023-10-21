import {Component, inject, OnInit} from '@angular/core';
import {GroupService} from "../../_services/group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Group} from "../../_models/group";

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent implements OnInit{
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  private router: Router = inject(Router);
  private groupService: GroupService = inject(GroupService);
  initialGroupData: Group | null = null;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id: string | null = params.get('id');
        if (id === null) {
          this.router.navigateByUrl('/groups');
        } else {
          this.groupService.getGroup(id).subscribe({
            next: (group: Group) => this.initialGroupData = group
          });
        }
      }
    });
  }

  submit(group: Group) {
    this.groupService.updateGroup(group).subscribe({
      next: () => this.router.navigateByUrl('/groups'),
      error: (error) => console.log(error)
    })
  }
}
