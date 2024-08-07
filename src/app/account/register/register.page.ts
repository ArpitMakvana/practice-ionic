import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  regData: any = {};
  emailPhoneFormData: any;
  OTPFormData: any;
  nameDobFormData: any;
  steps: number = 1;
  config: any = {};
  userRelation: string = '';
  religionCommunityFromData: any;
  maritalStatusFormData: any;
  stateCItyFormData: any;
  qualificationsFormData: any;
  incomeDetailsFormData: any;
  aboutYourself: any;
  userPrefenceData: any;
  familyStatusFormData: any;
  constructor(
    private registerService: RegisterService,
    private storage: Storage,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    this.registerService.getAllConfig().then((res) => {
      this.config = res.reduce((obj: any, item: any) => {
        let parsedValue;
        try {
          parsedValue = JSON.parse(item.value);
        } catch (e) {
          parsedValue = item.value; // Fallback in case value is not a valid JSON
        }
        obj[item.key] = parsedValue;
        return obj;
      }, {});
      console.log(this.config);
    }).catch(err => console.error(err));

    this.storage.get(this.registerService.storageKeys.initialProfileData).then((data) => {
      this.regData = JSON.parse(data) || {};
      if (this.regData.steps) this.steps = this.regData.steps;
      console.log(this.regData);
    })
  }

  goBack() {
    this.steps--;
  }
  skip(event: any) {
    if (event == 'photo' || event == 'verify') {
      this.steps++;
    }
  }
  moveToHOme() {
    this.router.navigateByUrl('/home');
  }

  enterdEmailPhone(event: any) {
    this.emailPhoneFormData = event;
    this.regData = { ...this.regData, emailPhoneFormData: this.emailPhoneFormData, regInitiated: true };
    this.registerService.generateOTP({ email: this.emailPhoneFormData.email }).then(res => {
      this.registerService.presentSuccessToast(res.message)
      console.log(res);
      this.steps++;
    }).catch((er) => console.error(er))
    console.log(this.emailPhoneFormData);

  }
  resendOTP() {
    this.registerService.generateOTP({ email: this.emailPhoneFormData.email }).then(res => {
      this.registerService.presentSuccessToast(res.message);
    }).catch((er) => console.error(er))
  }

  submitOtp(event: any) {
    this.OTPFormData = {
      "firstName": this.nameDobFormData.firstName,
      "lastName": this.nameDobFormData.lastName,
      "userName": this.nameDobFormData.userName,
      "email": event.email,
      "phoneNumber": this.emailPhoneFormData.phone,
      "password": this.emailPhoneFormData.password,
      "userRelation": this.userRelation,
      "dateOfBirth": this.nameDobFormData.dateOfBirth.split('-').reverse().join('/'),
      "gender": this.nameDobFormData.gender,
      "otp": event.otp,
      // "language": "en",
    };
    this.registerService.verifyOTP(this.OTPFormData).then(async (res) => {
      this.registerService.presentSuccessToast(res.message);
      this.regData = { ...this.regData, steps: this.steps + 1, initialProfileStage: res.data };
      this.steps++;
      await this.storage.set(this.registerService.storageKeys.regDataOnOTPSubmit, JSON.stringify(this.regData))
      await this.storage.set(this.registerService.storageKeys.initialProfileData, JSON.stringify(this.regData))
      await this.storage.set(this.registerService.storageKeys.token, res.data.token)
    }).catch(err => console.error(err))
  }
  profileFor(event: any) {
    console.log(event);
    this.userRelation = event;
    this.regData = { ...this.regData, userRelation: this.userRelation };
    this.steps++;
  }
  nameDobForm(event: any) {
    console.log(event);
    this.nameDobFormData = event;
    this.regData = { ...this.regData, nameDobFormData: this.nameDobFormData };
    this.steps++;
  }
  submitReligionCommunity(evevnt: any) {
    this.religionCommunityFromData = evevnt;
    this.regData = { ...this.regData, religionCommunityFromData: this.religionCommunityFromData };
    console.log('this.religionCommunityFromData', this.religionCommunityFromData);
    this.steps++;
  }
  submitMaritalStatus(event: any) {
    this.maritalStatusFormData = event;
    this.regData = { ...this.regData, maritalStatusFormData: this.maritalStatusFormData };
    console.log('this.maritalStatusFormData', this.maritalStatusFormData);
    this.steps++;
  }
  submitSTateCity(event: any) {
    this.stateCItyFormData = event;
    this.regData = { ...this.regData, stateCItyFormData: this.stateCItyFormData };
    console.log('this.stateCItyFormData', this.stateCItyFormData);
    this.steps++;
  }
  submitqualification(event: any) {
    this.qualificationsFormData = event;
    this.regData = { ...this.regData, qualificationsFormData: this.qualificationsFormData };
    console.log('this.qualificationsFormData', this.qualificationsFormData);
    this.steps++;
  }
  submitIncome(event: any) {
    this.incomeDetailsFormData = event;
    this.regData = { ...this.regData, incomeDetailsFormData: this.incomeDetailsFormData };
    console.log('this.incomeDetailsFormData', this.incomeDetailsFormData);
    this.steps++;
  }
  submitAbout(event: any) {
    this.aboutYourself = event;
    this.regData = { ...this.regData, aboutYourself: this.aboutYourself };
    console.log('this.aboutYourself', this.aboutYourself);
    this.steps++;
  }
  submitUserPreference(event: any) {
    this.userPrefenceData = event;
    this.regData = { ...this.regData, userPrefenceData: this.userPrefenceData };
    console.log('this.userPrefenceData', this.userPrefenceData);
    this.steps++;
  }
  submitFamilyStatus(event: any) {
    this.familyStatusFormData = event;
    this.regData = { ...this.regData, familyStatusFormData: this.familyStatusFormData };
    console.log('this.familyStatusFormData', this.familyStatusFormData);
    this.submitProfile();
    // this.steps++;
  }

  submitProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.registerService.uploadImage(formData).then(async (res) => {
      console.log('res', res);
      this.registerService.presentSuccessToast(res.message);
      this.regData = { ...this.regData, steps: this.steps + 1, fileResponse: res };
      await this.storage.set(this.registerService.storageKeys.initialProfileData, JSON.stringify(this.regData))
      this.steps++;
    }).catch(er => console.log(er));

    console.log(file);
  }

  submitProfile() {
    console.log(this.regData);
    const profileDta = {
      "religion": this.regData.religionCommunityFromData.religion,
      "community": this.regData.religionCommunityFromData.community,
      "subcommunity": this.regData.religionCommunityFromData.subcommunity,
      "qualification": this.regData.qualificationsFormData,
      "personalDetails": this.regData.maritalStatusFormData,
      "workDetails": this.regData.incomeDetailsFormData,
      "userAddress": this.regData.stateCItyFormData,
      "familyDetails": {
        "liveWithFamily": Boolean(this.regData.familyStatusFormData.liveWithFamily),
        "familyFinancialStatus": this.regData.familyStatusFormData.liveWithFamily.familyFinancialStatus
      },
      "aboutYourself": this.regData.aboutYourself,
      "photos": [this.regData.fileResponse?.data?.key || 'dummy.png'],
      "otherDetails": this.regData.userPrefenceData
    }
    this.registerService.submitUserDetails(profileDta).then(async (res) => {
      this.registerService.presentSuccessToast(res.message);
      this.steps++;
      this.regData = { ...this.regData, steps: this.steps + 1, profileResponse: res, regInitiated: false };
      await this.storage.set(this.registerService.storageKeys.initialProfileData, JSON.stringify(this.regData));
      await this.storage.set(this.registerService.storageKeys.token, res?.data?.token)
    }).catch((er) => console.log(er));
  }

  verifyProfile() {

  }



}
