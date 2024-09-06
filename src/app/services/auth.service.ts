import { Injectable } from '@angular/core';
import { HttpCallsService } from './http-calls.service';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    config: any;
    userProfile:any;
    storageKeys = {
        'regDataOnOTPSubmit': 'REGDATAONOTPSUBMIT',
        'initialProfileData': 'INITIALPROFILEDATA',
        "token": "TOKEN",
        "planActivated":"PLANACTIVATED",
        "currentPlan":"CURRENTPLAN"
    }
    authToken: string = '';userLoggedIn: Subject<any> = new Subject();
    constructor(private http: HttpCallsService, private storage: Storage) {
        this.storage.create();
    }


    getAllConfig(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.config) resolve(this.config);
            const url = 'config/?limit=200&lang=en';
            this.http.get(url).subscribe((result: any) => {
              this.config = this.formatConfigData(result.data);
              resolve(this.config);
            }, err => reject(err));
          });
    }

    getToken(): Promise<any> {
        return new Promise((resolve) => {
            if (this.authToken) resolve(this.authToken);
            this.storage.get(this.storageKeys.token).then((res) => {
                resolve(res || '');
            })
        })
    }

    logIn(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post('user/login', data).subscribe(async (res: any) => {
                if (res && res.data) {
                    this.authToken = res.data.token;
                    this.storage.set(this.storageKeys.token, res.data.token)
                    this.userProfile=null;
                    this.userLoggedIn.next({ isLoggedIn: true});
                }
                resolve(res)
            }, err => reject(err))
        })
    }

    getUserProfille(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.userProfile && this.userProfile !==null) resolve(this.userProfile);
            let url = 'user/profile';
            this.http.get(url).subscribe((result: any) => {
                this.userProfile = result.data;
                resolve(this.userProfile);
            }, err => reject(err))
        })
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
}
