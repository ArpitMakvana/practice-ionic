import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class RegistrationInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private loadingController: LoadingController
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.showLoader()).pipe(
      switchMap(() => this.auth.getToken()),
      switchMap(token => {
        let modifiedReq = req;

        if (req.url.includes('/upload')) {
          modifiedReq = req.clone({
            headers: req.headers.set('token', token)
          });
        } else {
          modifiedReq = req.clone({
            headers: req.headers
              .set('lang', 'en')
              .set('token', token)
          });
        }

        return next.handle(modifiedReq).pipe(
          finalize(() => this.hideLoader())
        );
      })
    );
  }

  private async showLoader() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
  }

  private async hideLoader() {
    await this.loadingController.dismiss();
  }
}
