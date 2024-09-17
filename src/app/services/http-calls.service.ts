import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  baseURL = environment.baseURL;
  private isAlertActive: boolean = false;
  constructor(private http: HttpClient,
    private alertController: AlertController,
    private storage: Storage,
    private router: Router,) { }

  // Common method to handle errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    // Check if user is unauthorized
    if (error.status === 401) {
      // Log out the user (handle logout logic as per your app's requirement)
      this.logoutUser();
      this.router.navigate(['/login']);  // Redirect to login or home page
      return throwError('Unauthorized access. Logging out.');
    }

    // Check for specific API errors
    const apiEndpoints = ['user/send-otp', 'user/verify-otp', 'user/user-details', 'upload', 'user/login', 'user/send-connection', 'user/accept-connection', 'user/reject-connection',];

    // If it's a known endpoint, show the server response error
    if (apiEndpoints.some(endpoint => error.url?.includes(endpoint))) {
      errorMessage = error.error?.message || 'Something went wrong...';
    } else {
      // For other errors, show a generic error message
      errorMessage = 'Something went wrong...';
      this.router.navigate(['/home']);  // Navigate back to home
    }

    // Present the alert with the error message
    this.presentAlert('', errorMessage);
    return throwError(errorMessage);
  }

  logoutUser() {
    this.storage.clear();
    this.router.navigateByUrl('/landing');
  }

  // Method to present alerts
  private async presentAlert(header: string, message: string) {
    // Check if an alert is already active
    if (this.isAlertActive) {
      return;
    }

    this.isAlertActive = true;  // Set flag to true

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.isAlertActive = false;  // Reset flag when alert is dismissed
        }
      }]
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
