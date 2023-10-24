import { Directive, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AccountService } from '../core/services/account.service';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective implements OnInit {

  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private templateRef: TemplateRef<any> = inject(TemplateRef<any>);
  private accountService: AccountService = inject(AccountService);

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
