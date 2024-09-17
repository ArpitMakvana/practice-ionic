import { Injectable } from '@angular/core';
import { HttpCallsService } from './http-calls.service';
import { ToastController } from '@ionic/angular';
import { TranslateConfigService } from './translate-config.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  config: any;
  storageKeys = {
    'regDataOnOTPSubmit': 'REGDATAONOTPSUBMIT',
    'initialProfileData': 'INITIALPROFILEDATA',
    "token": "TOKEN",
    "planActivated": "PLANACTIVATED",
    "currentPlan": "CURRENTPLAN"
  };

  constructor(
    private http: HttpCallsService,
    private toastController: ToastController,
    private translateConfigService: TranslateConfigService
  ) { }

  getAllConfig(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.config) resolve(this.config);
      this.translateConfigService.getCurrentLanguage().subscribe((currentLang) => {
        const url = `config/?limit=200&lang=${currentLang}`; // Use dynamic language
        this.http.get(url).subscribe((result: any) => {
          this.config = this.formatConfigData(result.data);
          resolve(this.config);
        }, err => reject(err));
      });
    });
  }
  getAllPackages(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'package';
      this.http.get(url).subscribe((result: any) => {
        resolve(result.data);
      }, err => reject(err));
    });
  }

  formatConfigData(data: any[]): any {
    return data.map((item) => {
      try {
        const validJsonString = item.value.replace(/'/g, '"');
        item.value = JSON.parse(validJsonString);
        return item;
      } catch (e) {
        item.value = item.value.split("'").filter((ele: any) => ele != ',' && ele !== '[' && ele !== ', ' && ele !== ' ,' && ele !== ']');
        return item;
      }
    })
  }

  generateOTP(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('user/send-otp', data).subscribe(res => resolve(res), err => reject(err));
    });
  }

  verifyOTP(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('user/verify-otp', data).subscribe(res => resolve(res), err => reject(err));
    });
  }

  submitUserDetails(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('user/user-details', data).subscribe(res => resolve(res), err => reject(err));
    });
  }

  uploadImage(data: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.upload('upload', data).subscribe(res => resolve(res), err => reject(err));
    });
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
}
