import { Directive, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appAdmin]'
})
export class AdminDirective implements OnInit {

  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: user => {
        if (user && user.role === 'admin') {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      }
    })
  }

}
