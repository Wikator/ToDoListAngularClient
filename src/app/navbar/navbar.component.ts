import { Component, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  accountService = inject(AccountService);
  router = inject(Router);

  log_out() {
    this.accountService.log_out().subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => console.log(error)
    });
  }
}
