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
import { CommonComponentsModule } from '../account/common-components/common-components.module';
import { UserLikesComponent } from './user-likes/user-likes.component';



register();
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePagePageRoutingModule,
    CommonComponentsModule,
    UserLikesComponent

  ],
  declarations: [
    HomePagePage,
    ProfileInformationComponent,
    ProfileListComponent,
    UserChatComponent,  
    SubscriptionComponent,
    UserchatListComponent,
    UserLikesComponent

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
