import { Injectable } from '@angular/core';
import { HttpCallsService } from './http-calls.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  currentNavigatedUser:any;
  constructor(
    private http: HttpCallsService,
    private toastController: ToastController
    ) { }

    setCurrentNavigatedUser(user:any){
      this.currentNavigatedUser=user;
    }
    getCurrentNavigatedUser(){
      return this.currentNavigatedUser;
    }

    getUsers(): Promise<any> {
      return new Promise((resolve, reject) => {
        const url = 'user/search';
        this.http.post(url,{}).subscribe((result: any) => {
          resolve(result.data);
        }, err => reject(err));
      });
    }
    getUserByID(id:any): Promise<any> {
      return new Promise((resolve, reject) => {
        const url = 'user/user-details?partnerId='+id;
        this.http.get(url).subscribe((result: any) => {
          resolve(result.data);
        }, err => reject(err));
      });
    }
    getUserConnectionRequests(): Promise<any> {
      return new Promise((resolve, reject) => {
        const url = 'user/connection-request';
        this.http.get(url).subscribe((result: any) => {
          resolve(result.data);
        }, err => reject(err));
      });
    }
    getUserSentConnectionRequests(): Promise<any> {
      return new Promise((resolve, reject) => {
        const url = 'user/sent-connection-request';
        this.http.get(url).subscribe((result: any) => {
          resolve(result.data);
        }, err => reject(err));
      });
    }
    getUsersConnections(): Promise<any> {
      return new Promise((resolve, reject) => {
        const url = 'user/accepted-connection-request';
        this.http.get(url,).subscribe((result: any) => {
          resolve(result.data);
        }, err => reject(err));
      });
    }
    sendConnectionRequest(data:any): Promise<any> {
      return new Promise((resolve, reject) => {
        const url = 'user/send-connection';
        this.http.post(url,data).subscribe((result: any) => {
          resolve(result);
        }, err => reject(err));
      });
    }
    acceptConnection(data:any): Promise<any> {
      return new Promise((resolve, reject) => {
        const url = 'user/accept-connection';
        this.http.post(url,data).subscribe((result: any) => {
          resolve(result);
        }, err => reject(err));
      });
    }
    rejectConnection(data:any): Promise<any> {
      return new Promise((resolve, reject) => {
        const url = 'user/reject-connection';
        this.http.post(url,data).subscribe((result: any) => {
          resolve(result);
        }, err => reject(err));
      });
    }

    async presentToast(message: string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        color: 'medium',
        position: 'bottom'
      });
      toast.present();
    }
}
