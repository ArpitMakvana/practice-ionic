import { Injectable } from '@angular/core';
import { HttpCallsService } from './http-calls.service';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  config: any;
  storageKeys = {
    'regDataOnOTPSubmit': 'REGDATAONOTPSUBMIT',
    'initialProfileData': 'INITIALPROFILEDATA',
    "token": "TOKEN"
  }
  constructor(private http: HttpCallsService,
    private toastController: ToastController,) { }


  getAllConfig(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.config) resolve(this.config);
      let url = 'config/?limit=200&lang=en';
      this.http.get(url).subscribe((result: any) => {
        this.config = result.data;
        resolve(this.config);
        console.log(result);
      }, err => reject(err))
    })
  }

  generateOTP(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('user/send-otp', data).subscribe(res => resolve(res), err => reject(err))
    })
  }

  verifyOTP(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('user/verify-otp', data).subscribe(res => resolve(res), err => reject(err))
    })
  }
  submitUserDetails(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('user/user-details', data).subscribe(res => resolve(res), err => reject(err))
    })
  }
  uploadImage(data: FormData): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.upload('upload', data).subscribe(res => resolve(res), err => reject(err))
    })
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }
  // uploadImage(formData: FormData) {
  //   const url = 'http://152.42.156.128:8002/upload';
  //   return this.httpr.post(url, formData, { responseType: 'json' }).toPromise();
  // }
}
