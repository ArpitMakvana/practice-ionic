import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  userList:Array<any>=[];
  constructor(
    private router:Router,
    private homeService:HomeService, 
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



  }

  openProfile(data:any){
    this.router.navigate(['/home/profile-information'])
  }

  getUsers(){
    this.homeService.getUsers().then((users)=>{
      console.log(users);
      this.userList=users;
    })
  }






}




