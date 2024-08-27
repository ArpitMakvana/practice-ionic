import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HomeService } from '../services/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  activeTabTitle: string = 'Profile List'; // Default tab title

  constructor(
    private menu: MenuController,
    private homeService:HomeService,
    private auth:AuthService
    ) {}

  ngOnInit() {
    this.auth.getAllConfig().then(res=>console.log(res));
    
  }

  openMenu() {
    this.menu.open('first');
  }

  



  

  

}
