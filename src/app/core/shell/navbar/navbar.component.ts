import { Component, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  accountService: AccountService = inject(AccountService);

  private router: Router = inject(Router);
  private toastr: ToastrService = inject(ToastrService);

  log_out(): void {
    this.accountService.log_out().subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.toastr.error(err.statusText)
    });
  }
}
