import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss'],
})
export class ProfileInformationComponent  implements OnInit {
  userID:any;
  userProfile:any;
  baseImageUrl = environment.baseImageURL;
  constructor(
    private route: ActivatedRoute,
    private homeService:HomeService, 
    private auth:AuthService ) { }

  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('id');
    console.log(this.userID);
    this.getUserProfile();
  }

  getUserProfile(){
    this.homeService.getUserByID(this.userID).then((user:any)=>{
      console.log(user);
      this.userProfile=user;
    })
  }

}
