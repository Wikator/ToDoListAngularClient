import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private accountService = inject(AccountService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          request = request.clone({
            setHeaders: {
              Authorization: user.token
            }
          });
        }
      }
    });
    return next.handle(request);
  }
}
