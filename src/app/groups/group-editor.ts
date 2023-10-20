import {inject} from "@angular/core";
import {GroupService} from "../_services/group.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

export class GroupEditor {
  protected groupsService: GroupService = inject(GroupService);
  private fb: FormBuilder = inject(FormBuilder);
  protected router: Router = inject(Router)

  groupForm: FormGroup = new FormGroup({});

  protected initializeForm() {
    this.groupForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }
}
