import {Component, inject} from '@angular/core';
import {Group} from "../../_models/group";
import {GroupService} from "../../_services/group.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent{
  private groupService: GroupService = inject(GroupService);
  private router: Router = inject(Router);

  submit(group: Group) {
    this.groupService.createGroup(group).subscribe({
      next: () => this.router.navigateByUrl('/groups'),
      error: (error) => console.error(error)
    });
  }
}
