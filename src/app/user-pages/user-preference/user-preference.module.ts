import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPreferencePageRoutingModule } from './user-preference-routing.module';

import { UserPreferencePage } from './user-preference.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPreferencePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserPreferencePage]
})
export class UserPreferencePageModule {}
