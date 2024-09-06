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
  incomingRequest:Array<any>=[];
  sentRequest:Array<any>=[];
  selectedSegment: string = 'tab1';
  baseImageUrl = environment.baseImageURL;
  isRequestLoaded=false;
  isConnectionsLoaded=false;
  isSentRequestLoaded=false;
  constructor(
    private router:Router,
    private homeService:HomeService, 
    private auth:AuthService
    ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.isRequestLoaded=false;
    this.isConnectionsLoaded=false;
    this.isSentRequestLoaded=false;
    this.selectedSegment = 'tab1';
    this.getConnectionRequest();
  }

  getConnectionRequest(){
    this.homeService.getUserConnectionRequests().then((users:any)=>{
      console.log(users);
      this.incomingRequest=users;
      this.isRequestLoaded=true;
    }).catch((er)=>{
      this.isRequestLoaded=true;
    })
  }
  getSentConnectionRequest(){
    this.homeService.getUserSentConnectionRequests().then((users:any)=>{
      console.log(users);
      this.sentRequest=users;
      this.isSentRequestLoaded=true;
    }).catch(er=>this.isSentRequestLoaded=true)
  }
  getConnections(){
    this.homeService.getUsersConnections().then((users:any)=>{
      console.log(users);
      this.connections=users;
      this.isConnectionsLoaded=true;
    }).catch(er=>this.isConnectionsLoaded=true);
  }
  openProfile(data:any){
    console.log(data);
    this.router.navigate(['/home/profile-information',data.requester.id]);
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
 

  // Method to handle segment changes
  onSegmentChange(event: any) {
    console.log('Selected Segment:', event.detail.value);
    if(event.detail.value == 'tab2'){
      this.getConnections();
    }else if(event.detail.value=='tab3'){
      this.getSentConnectionRequest();
    }
    // You can perform additional actions based on the selected segment if needed
  }

}
 




