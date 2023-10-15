import { Component, inject } from '@angular/core';
import { Login } from '../_models/login';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  model: Login = {} as Login;

  login() {
    this.accountService.sign_in(this.model).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
