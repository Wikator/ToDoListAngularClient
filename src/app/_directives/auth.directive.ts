import { Directive, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective implements OnInit {

  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: user => {
        if (user) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      }
    })
  }
}
