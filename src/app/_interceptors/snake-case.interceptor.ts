import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SnakeCaseInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ((request.method === 'POST' || request.method === 'PUT') && typeof request.body === 'object') {
      const snakeCaseBody = this.convertKeysToSnakeCase(request.body);
      request = request.clone({ body: snakeCaseBody });
    }

    return next.handle(request);
  }

  private convertKeysToSnakeCase(obj: any): any {
    const snakeCaseObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        snakeCaseObj[snakeCaseKey] = obj[key];
      }
    }
    return snakeCaseObj;
  }
}
