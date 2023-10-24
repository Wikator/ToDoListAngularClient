import { Component, OnInit, inject } from '@angular/core';
import { Group } from 'src/app/core/models/group';
import { GroupService } from 'src/app/core/services/group.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  private groupService: GroupService = inject(GroupService);
  private toastr: ToastrService = inject(ToastrService);

  groups: Group[] = [];

  ngOnInit(): void {
    this.groupService.getGroups().subscribe({
      next: (groups: Group[]) => this.groups = groups,
      error: (err) => this.toastr.error(err.errors)
    });
  }

  delete(id: number): void {
    this.groupService.deleteGroup(id).subscribe({
      next: () => this.groups = this.groups.filter((group) => group.id !== id),
      error: (err) => this.toastr.error(err.statusText)
    });
  }
}
