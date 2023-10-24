import { Component, inject } from '@angular/core';
import { Login } from '../core/models/login';
import { Router } from '@angular/router';
import { AccountService } from '../core/services/account.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private accountService: AccountService = inject(AccountService);
  private router: Router = inject(Router);
  private toastr: ToastrService = inject(ToastrService);

  model: Login = {} as Login;

  login(): void {
    this.accountService.sign_in(this.model).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.toastr.error(err.error)
    })
  }
}
