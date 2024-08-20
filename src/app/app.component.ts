import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage-angular';
import { Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  private lastBackPress = 0;
  private timePeriodToExit = 2000;

  constructor(
    private translate: TranslateService,
    private storage: Storage,
    private platform: Platform,
    private toastController: ToastController,
    private router: Router
  ) {
    this.translate.setDefaultLang('en');
    this.storage.create();
    this.initializeApp();
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(10, () => {
        const currentUrl = this.router.url;

        if (currentUrl === '/register' || currentUrl === '/home') {
          this.showExitConfirm();
        } else {
          // Optionally handle other back navigation here or let the default behavior happen
        }
      });
    });
  }

  async showExitConfirm() {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastBackPress < this.timePeriodToExit) {
      (navigator as any).app.exitApp(); // Close the app
    } else {
      const toast = await this.toastController.create({
        message: 'Press back again to exit',
        duration: 2000,
        position: 'bottom'
      });
      await toast.present();
      this.lastBackPress = currentTime;
    }
  }
}
