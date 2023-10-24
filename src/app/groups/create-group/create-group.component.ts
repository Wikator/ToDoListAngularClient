import {Component, inject} from '@angular/core';
import {Group} from "../../core/models/group";
import {GroupService} from "../../core/services/group.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent{
  private groupService: GroupService = inject(GroupService);
  private router: Router = inject(Router);
  private toastr: ToastrService = inject(ToastrService);

  submit(group: Group): void {
    this.groupService.createGroup(group).subscribe({
      next: () => this.router.navigateByUrl('/groups'),
      error: (err) => this.toastr.error(err.statusText)
    });
  }
}
