import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePagePage } from './home-page.page';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { UserchatListComponent } from './userchat-list/userchat-list.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { UserLikesComponent } from './user-likes/user-likes.component';
import { MatchesComponent } from './matches/matches.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { MatchesReuestComponent } from './matches-reuest/matches-reuest.component';
import { NoRecordComponent } from './no-record/no-record.component';

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
        path: 'matches',
        component: MatchesComponent
      },
      {
        path: 'matches-request',
        component: MatchesReuestComponent
      },
      {
        path: 'user-account',
        component: UserAccountComponent
      },
      {
        path: 'user-likes',
        component: UserLikesComponent
      },
      {
        path: 'no-record',
        component: NoRecordComponent
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
