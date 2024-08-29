import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  userList: Array<any> = [];
  interestedInOptions: string[] = ['Woman', 'Man', 'Both'];
  skinColourOptions: string[] = [];
  bodyShapeOptions: string[] = [];
  prayerOptions: string[] = [];
  smokeOptions: string[] = [];
  beardOptions: string[] = [];
  maritalStatusOptions: string[] = [];
  configs:any;

  selectedFilters: {
    interestedIn: string[];
    skinColour: string[];
    bodyShape: string[];
    prayer: string[];
    smoke: string[];
    beard: string[];
    maritalStatus: string[];
  } = {
    interestedIn: [],
    skinColour: [],
    bodyShape: [],
    prayer: [],
    smoke: [],
    beard: [],
    maritalStatus: []
  };
  baseImageUrl = environment.baseImageURL;
  constructor(
    private router:Router,
    private homeService:HomeService, 
    private auth:AuthService
    ) { }

  ngOnInit() {
    this.getUsers();
    const modal = document.querySelector('ion-modal') as HTMLIonModalElement;
    const searchBar = document.querySelector('ion-searchbar') as HTMLIonSearchbarElement;
    
    const modal1 = document.querySelector('ion-modal1') as HTMLIonModalElement;
    const searchBar1 = document.querySelector('ion-searchbar1') as HTMLIonSearchbarElement;

    if (modal && searchBar) {
      modal.breakpoints = [0, 0.25, 0.5, 0.75];

      searchBar.addEventListener('click', () => {
        modal.setCurrentBreakpoint(0.75);
      });
    }

    if (modal1 && searchBar1) {
      modal1.breakpoints = [0, 0.25, 0.5, 0.75];

      searchBar1.addEventListener('click', () => {
        modal.setCurrentBreakpoint(0.75);
      });
    }

    this.getConfig()

  }

  openProfile(data:any){
    this.homeService.setCurrentNavigatedUser(data)
    this.router.navigate(['/home/profile-information']);
  }

  getUsers(){
    this.homeService.getUsers().then((users:any)=>{
      console.log(users);
      this.userList=users;
    })
  }

  getConfig(){
      this.auth.getAllConfig().then(res => {
        this.configs = res.reduce((obj: any, item: any) => {
          let parsedValue;
          try {
            parsedValue = JSON.parse(item.value);
          } catch (e) {
            parsedValue = item.value; // Fallback in case value is not a valid JSON
          }
          obj[item.key] = parsedValue;
          return obj;
        }, {});
        console.log(this.configs);
        // Assuming 'res' has relevant keys for the filter options
        this.skinColourOptions = this.configs.user_skin_colour || [];
        this.bodyShapeOptions = this.configs.user_body_shape || [];
        this.prayerOptions = this.configs.user_prayer || [];
        this.smokeOptions = this.configs.user_smoke_habit || [];
        this.beardOptions = this.configs.user_beard || [];
        this.maritalStatusOptions = this.configs.user_marital_status || [];
      });
  }
  onCheckboxChange(filterName: keyof typeof this.selectedFilters, option: string, event: any) {
    const isChecked = event.target.checked;

    if (isChecked) {
      this.selectedFilters[filterName].push(option);
    } else {
      const index = this.selectedFilters[filterName].indexOf(option);
      if (index > -1) {
        this.selectedFilters[filterName].splice(index, 1);
      }
    }
  }

  applyFilters() {
    console.log(this.selectedFilters);
  }

  resetFilters() {
    this.selectedFilters = {
      interestedIn: [],
      skinColour: [],
      bodyShape: [],
      prayer: [],
      smoke: [],
      beard: [],
      maritalStatus: []
    };
    this.getUsers(); // Reset user list to all users
  }


  sendInterest(user:any){
    console.log(user);
    const data = {
      "partnerId": user.id
  }
    this.homeService.sendConnectionRequest(data).then((res)=>{
      this.getUsers();
      this.homeService.presentToast(res.message)
    }).catch((er)=>{
      this.homeService.presentToast(er);
    })
  }




}




