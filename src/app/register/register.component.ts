import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../core/services/account.service';
import { Router } from '@angular/router';
import { Register } from '../core/models/register';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private accountService: AccountService = inject(AccountService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private toastr: ToastrService = inject(ToastrService);

  registerForm: FormGroup = new FormGroup({});
  validationErrors: string | null = null;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }

  private matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true };
    };
  }

  register(): void {
    const register: Register = this.registerForm.value;
    this.accountService.register(register).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => this.toastr.error(err.error)
    })
  }
}
