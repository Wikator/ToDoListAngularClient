import { Component, OnInit, inject } from '@angular/core';
import { Group } from 'src/app/_models/group';
import { GroupService } from 'src/app/_services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  private groupService: GroupService = inject(GroupService);

  groups: Group[] = [];

  ngOnInit(): void {
    this.groupService.getGroups().subscribe({
      next: groups => this.groups = groups,
      error: err => console.log(err)
    });
  }

  delete(id: number) {
    this.groupService.deleteGroup(id).subscribe({
      next: () => this.groups = this.groups.filter((group) => group.id !== id),
      error: (err) => console.log(err)
    });
  }
}
