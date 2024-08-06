import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

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
  steps: number = 0;
  config: any = {};
  userRelation: string = '';
  religionCommunityFromData: any;
  maritalStatusFormData: any;
  stateCItyFormData: any;
  qualificationsFormData: any;
  incomeDetailsFormData: any;
  aboutYourself: any;
  userPrefenceData: any;
  constructor(
    private registerService: RegisterService,
    private storage: Storage,
    private toastController: ToastController,) { }

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

    this.storage.get(this.registerService.storageKeys.regDataOnOTPSubmit).then((data) => {
      this.regData = JSON.parse(data) ||{};
      if(this.regData.steps) this.steps = this.regData.steps;
      console.log(data);
    })
  }

  goBack() {
    this.steps--;
  }
  skip(event:any){
    if(event == 'photo' || event == 'verify'){
      this.steps++;
    }
  }
  moveToHOme(){

  }
  optionSelected(event: string) {
    console.log(event);
    if (event == 'mobile') {
      this.steps++
    }
  }
  enterdEmailPhone(event: any) {
    this.emailPhoneFormData = event;
    this.regData = { ...this.regData, emailPhoneFormData: this.emailPhoneFormData };
    this.registerService.generateOTP({ email: this.emailPhoneFormData.email }).then(res => {
      this.presentSuccessToast(res.message)
      console.log(res);
      this.steps++;
    }).catch((er) => console.error(er))
    console.log(this.emailPhoneFormData);

  }
  resendOTP() {
    this.registerService.generateOTP({ email: this.emailPhoneFormData.email }).then(res => {
      this.presentSuccessToast(res.message);
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
      this.presentSuccessToast(res.message);
      this.regData = { ...this.regData, steps: this.steps + 1, initialProfileStage:res.data };
      await this.storage.set(this.registerService.storageKeys.regDataOnOTPSubmit, JSON.stringify(this.regData))
      await this.storage.set(this.registerService.storageKeys.initialProfileData, JSON.stringify(res))
      this.steps++;
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
  submitReligionCommunity(evevnt:any){
    this.religionCommunityFromData = evevnt;
    this.regData = { ...this.regData, religionCommunityFromData: this.religionCommunityFromData };
    console.log('this.religionCommunityFromData',this.religionCommunityFromData);
    this.steps++;
  }
  submitMaritalStatus(event:any){
    this.maritalStatusFormData = event;
    this.regData = { ...this.regData, maritalStatusFormData: this.maritalStatusFormData };
    console.log('this.maritalStatusFormData',this.maritalStatusFormData);
    this.steps++;
  }
  submitSTateCity(event:any){
    this.stateCItyFormData = event;
    this.regData = { ...this.regData, stateCItyFormData: this.stateCItyFormData };
    console.log('this.stateCItyFormData',this.stateCItyFormData);
    this.steps++;
  }
  submitqualification(event:any){
    this.qualificationsFormData = event;
    this.regData = { ...this.regData, qualificationsFormData: this.qualificationsFormData };
    console.log('this.qualificationsFormData',this.qualificationsFormData);
    this.steps++;
  }
  submitIncome(event:any){
    this.incomeDetailsFormData = event;
    this.regData = { ...this.regData, incomeDetailsFormData: this.incomeDetailsFormData };
    console.log('this.incomeDetailsFormData',this.incomeDetailsFormData);
    this.steps++;
  }
  submitAbout(event:any){
    this.aboutYourself = event;
    this.regData = { ...this.regData, aboutYourself: this.aboutYourself };
    console.log('this.aboutYourself',this.aboutYourself);
    this.steps++;
  }
  submitUserPreference(event:any){
    this.userPrefenceData = event;
    this.regData = { ...this.regData, userPrefenceData: this.userPrefenceData };
    console.log('this.userPrefenceData',this.userPrefenceData);
    this.steps++;
  }

  submitProfilePicture(files: File[]) {
    this.regData = { ...this.regData, files: files };
    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file);
    });
    console.log(files);
    this.steps++;
  }
  verifyProfile(){

  }

  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }

}
