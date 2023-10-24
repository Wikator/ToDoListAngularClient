import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map } from 'rxjs';
import {ToastrService} from "ngx-toastr";

export const adminGuard: CanActivateFn = () => {
  const accountService: AccountService = inject(AccountService);
  const toastr: ToastrService = inject(ToastrService)

  return accountService.currentUser$.pipe(
    map(user => {
      if (!user || user.role !== 'admin') {
        toastr.error('Unauthorized')
        return false
      } else {
        return true
      }
    })
  )
};
