// interceptors/registration.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RegistrationInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (req.url.includes('/register')) {
    // Add headers to the request
    const modifiedReq = req.clone({
      headers: req.headers
        // .set('Content-Type', 'application/json')
        .set('lang', 'en')
    });

    return next.handle(modifiedReq);
    // }
    return next.handle(req);
  }
}
