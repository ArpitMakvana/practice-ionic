import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/register.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  disableButton: boolean = false;
  lang: string = 'ar';
  constructor(private router: Router,
    private storage: Storage,
    private regService: RegisterService,
    private auth: AuthService,
    private translateConfigService: TranslateConfigService
  ) { }

  ngOnInit() {
    this.translateConfigService.getCurrentLanguage().subscribe(lang => {
      console.log('Language changed to:', lang);
      this.lang = lang;
    });
  }
  async optionSelected(event: string) {
    if (event == 'mobile') {
      const store: any = await this.storage.get(this.regService.storageKeys.initialProfileData)
      console.log(store);
      if (!store?.regInitiated) await this.storage.clear();
      this.router.navigate(['/register']);
    }
  }

  submitForm(event: any) {
    console.log(event);
    this.disableButton = true;
    this.auth.logIn(event).then(res => {
      this.disableButton = false;
      this.regService.presentSuccessToast(res?.message);
      this.router.navigateByUrl('/home');
    }).catch((er) => this.disableButton = false)
  }

  changeLang() {
    this.translateConfigService.setLanguage(this.lang);
  }

}
