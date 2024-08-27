import { Injectable } from '@angular/core';
import { HttpCallsService } from './http-calls.service';
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    config: any;
    storageKeys = {
        'regDataOnOTPSubmit': 'REGDATAONOTPSUBMIT',
        'initialProfileData': 'INITIALPROFILEDATA',
        "token": "TOKEN",
        "planActivated":"PLANACTIVATED",
        "currentPlan":"CURRENTPLAN"
    }
    authToken: string = '';
    constructor(private http: HttpCallsService, private storage: Storage) {
        this.storage.create();
    }


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
                }
                resolve(res)
            }, err => reject(err))
        })
    }

    getUserProfille(){
        
    }
}
