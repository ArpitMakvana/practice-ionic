import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  private languageSubject: BehaviorSubject<string>;
  private defaultLanguage: string = 'ar';

  constructor(private translateService: TranslateService, private storage: Storage) {
    this.languageSubject = new BehaviorSubject<string>(this.defaultLanguage);
    this.storage.create().then(() => {
      this.storage.get('language').then((lang) => {
        const languageToSet = lang || this.defaultLanguage;
        this.setLanguage(languageToSet);
      });
    });
  }

  getCurrentLanguage(): Observable<string> {
    return this.languageSubject.asObservable();
  }

  setLanguage(language: string): void {
    this.translateService.use(language);
    this.storage.set('language', language);
    this.languageSubject.next(language);
  }

  getTranslatedText(key: string): Observable<string> {
    return this.translateService.get(key);
  }

  initLanguage(): string {
    return this.languageSubject.value;
  }
}
