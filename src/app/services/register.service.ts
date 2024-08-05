import { Injectable } from '@angular/core';
import { HttpCallsService } from './http-calls.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  config: any;
  storageKeys = {
    'regDataOnOTPSubmit':'REGDATAONOTPSUBMIT',
    'initialProfileData':'INITIALPROFILEDATA'
  }
  constructor(private http: HttpCallsService) { }


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
}
