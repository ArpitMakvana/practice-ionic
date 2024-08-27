import { Injectable } from '@angular/core';
import { HttpCallsService } from './http-calls.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpCallsService,
    private toastController: ToastController
    ) { }

    getUsers(): Promise<any> {
      return new Promise((resolve, reject) => {
        const url = 'user/search';
        this.http.post(url,{}).subscribe((result: any) => {
          resolve(result.data);
        }, err => reject(err));
      });
    }
}
