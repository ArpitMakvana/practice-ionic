import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RegistrationInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.auth.getToken()).pipe(
      switchMap(token => {
        let modifiedReq = req;

        if (req.url.includes('/upload')) {
          modifiedReq = req.clone({
            headers: req.headers
              .set('token', token)
          });
        } else {
          modifiedReq = req.clone({
            headers: req.headers
              .set('lang', 'en')
              .set('token', token)
          });
        }

        return next.handle(modifiedReq);
      })
    );
  }
}
