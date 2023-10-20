import { Component, OnInit, inject } from '@angular/core';
import { GroupService } from '../_services/group.service';
import { Group } from '../_models/group';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private groupService = inject(GroupService);

  groups: Group[] = [];

  ngOnInit(): void {
    this.groupService.getGroups().subscribe({
      next: (groups: Group[]) => (this.groups = groups)
    });
  }
}
