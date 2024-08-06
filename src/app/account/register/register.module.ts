import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterPage } from './register.page';

import { TranslateModule } from '@ngx-translate/core'; 
import { register } from 'swiper/element/bundle';
import { CommonComponentsModule } from '../common-components/common-components.module';

register();
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    CommonComponentsModule
  ],
  declarations: [RegisterPage],
  exports: []
})
export class RegisterPageModule { }
