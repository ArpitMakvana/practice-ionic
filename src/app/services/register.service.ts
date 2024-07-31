import { Injectable } from '@angular/core';
import { HttpCallsService } from './http-calls.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  config:any;
  constructor(private http: HttpCallsService) { }


  getConfig():Promise<any> {
    return new Promise((resolve,reject)=>{
      if(this.config) resolve(this.config);
      let url = 'config/getConfig?lang=en&keys=user';
      this.http.get(url).subscribe((result:any)=>{
        console.log(result);
      },err=>reject(err))
    })
    

  }
}
