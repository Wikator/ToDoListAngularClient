import { Component, OnInit, inject } from '@angular/core';
import { GroupsService } from '../_services/groups.service';
import { Group } from '../_models/group';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private groupsService = inject(GroupsService);

  groups: Group[] = [];

  ngOnInit(): void {
    this.groupsService.getGroups().subscribe({
      next: (groups: Group[]) => (this.groups = groups)
    });
  }
}
