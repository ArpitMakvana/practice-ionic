import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { RegisterOptionComponent } from './register-option/register-option.component';
import { MobileInputComponent } from './mobile-input/mobile-input.component';
import { OtpInputComponent } from './otp-input/otp-input.component';
import { ProfileForComponent } from './profile-for/profile-for.component';
import { NameDobComponent } from './name-dob/name-dob.component';
import { ReligionCommunityComponent } from './religion-community/religion-community.component';
import { MarritalStatusComponent } from './marrital-status/marrital-status.component';
import { StateCityComponent } from './state-city/state-city.component';
import { QualificationsComponent } from './qualifications/qualifications.component';
import { IncomeComponent } from './income/income.component';
import { AboutYourselfComponent } from './about-yourself/about-yourself.component';
import { AddPictureComponent } from './add-picture/add-picture.component';
import { VerifyProfileComponent } from './verify-profile/verify-profile.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { FamilyMemberComponent } from './family-member/family-member.component';
import { FamilyStatusComponent } from './family-status/family-status.component';
import { RegisterSucessComponent } from './register-sucess/register-sucess.component';
import { UserPreferenceComponent } from './user-preference/user-preference.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterOptionComponent,
    MobileInputComponent, 
    OtpInputComponent, 
    ProfileForComponent,
    NameDobComponent,
    ReligionCommunityComponent,
    MarritalStatusComponent,
    StateCityComponent,
    QualificationsComponent,
    IncomeComponent,
    AboutYourselfComponent,
    AddPictureComponent,
    VerifyProfileComponent,
    HobbiesComponent,
    FamilyMemberComponent,
    FamilyStatusComponent,
    RegisterSucessComponent,
    UserPreferenceComponent
  ],
  exports: [
    RegisterOptionComponent,
    MobileInputComponent,
    OtpInputComponent,
    ProfileForComponent,
    NameDobComponent,
    ReligionCommunityComponent,
    MarritalStatusComponent,
    StateCityComponent,
    QualificationsComponent,
    IncomeComponent,
    AboutYourselfComponent,
    AddPictureComponent,
    VerifyProfileComponent,
    HobbiesComponent,
    FamilyMemberComponent,
    FamilyStatusComponent,
    RegisterSucessComponent,
    UserPreferenceComponent
  ]
})
export class CommonComponentsModule { }
