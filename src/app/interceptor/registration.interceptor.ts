import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class RegistrationInterceptor implements HttpInterceptor {
  private requestCounter = 0;

  constructor(
    private auth: AuthService,
    private loadingController: LoadingController
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.incrementRequestCounter();

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
          finalize(() => {
            this.decrementRequestCounter();
          })
        );
      })
    );
  }

  private async showLoader() {
    if (this.requestCounter === 1) {  // Show loader only when the first request is made
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
      await loading.present();
    }
  }

  private async hideLoader() {
    if (this.requestCounter === 0) {  // Hide loader only when all requests are completed
      try {
        await this.loadingController.dismiss();
      } catch (error) {
        // If the loader was already dismissed or no loader is active, this will handle the error silently
      }
    }
  }

  private incrementRequestCounter() {
    this.requestCounter++;
  }

  private decrementRequestCounter() {
    this.requestCounter--;

    if (this.requestCounter === 0) {
      this.hideLoader();
    }
  }
}
