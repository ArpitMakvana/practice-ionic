import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent  implements OnInit {
  connections:Array<any>=[];
  request:Array<any>=[];
  baseImageUrl = environment.baseImageURL;
  constructor(
    private router:Router,
    private homeService:HomeService, 
    private auth:AuthService
    ) { }

  ngOnInit() {
    this.getConnectionRequest();
    this.getConnections();
  }

  getConnectionRequest(){
    this.homeService.getUserConnectionRequests().then((users:any)=>{
      console.log(users);
      this.request=users;
    })
  }
  getConnections(){
    this.homeService.getUsersConnections().then((users:any)=>{
      console.log(users);
      this.connections=users;
    })
  }
  openProfile(data:any){
    this.homeService.setCurrentNavigatedUser(data)
    this.router.navigate(['/home/profile-information']);
  }

  accept(user:any){
    console.log(user);
    const data = {
      "requestId": user.id
  }
    this.homeService.sendConnectionRequest(data).then((res)=>{
      this.ngOnInit();
      this.homeService.presentToast(res.message)
    }).catch((er)=>{
      this.homeService.presentToast(er);
    })
  }
  reject(user:any){
    console.log(user);
    const data = {
      "requestId": user.id
  }
    this.homeService.sendConnectionRequest(data).then((res)=>{
      this.ngOnInit();
      this.homeService.presentToast(res.message)
    }).catch((er)=>{
      this.homeService.presentToast(er);
    })
  }
  viewAllRequest(){
    this.router.navigate(['/home/matches-request'])
  }

}
