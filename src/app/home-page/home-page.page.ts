import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {

  constructor(private menu: MenuController) {}

  ngOnInit() {
  }

  openMenu() {
    this.menu.open('first');
  }

  

  

}
