import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePagePageRoutingModule } from './home-page-routing.module';

import { HomePagePage } from './home-page.page';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { SubscriptionComponent } from './subscription/subscription.component';

import { register } from 'swiper/element/bundle';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserchatListComponent } from './userchat-list/userchat-list.component';



register();

// const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   // { path: 'home', loadChildren: () => import('./home-page-routing.module').then(m => m.HomePagePageModule) },
//   { path: 'subscription', loadChildren: () => import('').then(m => m.DetailsPageModule) },
// ];
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePagePageRoutingModule,
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

  ],
  declarations: [
    HomePagePage,
    ProfileInformationComponent,
    ProfileListComponent,
    UserChatComponent,  
    SubscriptionComponent,
    UserchatListComponent

  ],
  exports: [
    HomePagePage,
    ProfileInformationComponent,
    ProfileListComponent,
    UserChatComponent, 
    SubscriptionComponent  ,
    UserchatListComponent,
    RouterModule

  ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePagePageModule {}
