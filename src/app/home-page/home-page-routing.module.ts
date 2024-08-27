import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePagePage } from './home-page.page';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { UserchatListComponent } from './userchat-list/userchat-list.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { UserLikesComponent } from './user-likes/user-likes.component';

const routes: Routes = [
  {
    path: '',
    component: HomePagePage,
    children: [
      {
        path: 'subscription',
        component: SubscriptionComponent
      },
      {
        path: 'profile-information',
        component: ProfileInformationComponent
      },
      {
        path: 'profile-list',
        component: ProfileListComponent
      },
      {
        path: 'userchat-list',
        component: UserchatListComponent
      },
      {
        path: 'user-chat',
        component: UserChatComponent
      },
      {
        path: 'user-likes',
        component: UserLikesComponent
      },
      {
        path: '',
        redirectTo: 'profile-list', // Default child route
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePagePageRoutingModule {}
