import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user-preference',
  templateUrl: './user-preference.page.html',
  styleUrls: ['./user-preference.page.scss'],
})
export class UserPreferencePage implements OnInit {
  userConfig:any;
  constructor(private navCtrl: NavController,
              private auth:AuthService) { }

  async ngOnInit() {
    this.userConfig= await this.auth.getAllConfig();
    console.log(this.userConfig);
  }
  moveBack(){
    this.navCtrl.back();
  }

}
