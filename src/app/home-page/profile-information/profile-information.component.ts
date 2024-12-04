import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss'],
})
export class ProfileInformationComponent  implements OnInit {
  userProfile:any;
  baseImageUrl = environment.baseImageURL;
  constructor(
    private route: ActivatedRoute,
    private homeService:HomeService, ) { }

  ngOnInit() {
    this.userProfile=this.homeService.getCurrentNavigatedUser();
    console.log(this.userProfile);
    // this.route.queryParams.subscribe(params => {
    //   this.userProfile=JSON.parse(params['user'])
    //   console.log(this.userProfile);
    //   // Use the userId and userName as needed
    // });
  }

}
