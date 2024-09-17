import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private storage: Storage, private route: Router) {
    this.init();
  }

  private async init() {
    await this.storage.create();
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const token = await this.storage.get('TOKEN');
    if (!token) this.route.navigateByUrl('landing');
    return !!token; // Returns true if token exists, false otherwise
  }
}
