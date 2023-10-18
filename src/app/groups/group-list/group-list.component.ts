import { Component, OnInit, inject } from '@angular/core';
import { Group } from 'src/app/_models/group';
import { GroupService } from 'src/app/_services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  private groupServce = inject(GroupService);

  groups: Group[] = [];

  ngOnInit(): void {
    this.groupServce.getGroups().subscribe({
      next: groups => this.groups = groups,
      error: err => console.log(err)
    });
  }

}
