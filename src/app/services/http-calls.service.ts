import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient, private alertController: AlertController) { }

  // Common method to handle errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error) {
      // A client-side or network error occurred
      errorMessage = `${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code
      errorMessage = `Oops!!! Something went wrong...`;
    }
    this.presentAlert('Error', errorMessage);
    return throwError(errorMessage);
  }

  // Method to present alerts
  private async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // GET request
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}/${endpoint}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  // POST request
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}/${endpoint}`, data)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
  // POST request
  upload<T>(endpoint: string, data: FormData): Observable<T> {
    return this.http.post<T>(`${this.baseURL}/${endpoint}`, data)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  // PUT request
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseURL}/${endpoint}`, data)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  // DELETE request
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseURL}/${endpoint}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
