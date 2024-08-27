import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HomeService } from '../services/home.service';
import { Router, ActivatedRoute } from '@angular/router';


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
    ) {}

  ngOnInit() {
  }

  openMenu() {
    this.menu.open('first');
  }

  



  

  

}
