import { Component, OnInit, inject } from '@angular/core';
import { GroupService } from '../core/services/group.service';
import { Group } from '../core/models/group';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private groupService: GroupService = inject(GroupService);
  private toastr: ToastrService = inject(ToastrService);

  groups: Group[] = [];

  ngOnInit(): void {
    this.groupService.getGroups().subscribe({
      next: (groups: Group[]) => (this.groups = groups),
      error: (err) => this.toastr.error(err.statusText)
    });
  }
}
