import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-preference',
  templateUrl: './user-preference.page.html',
  styleUrls: ['./user-preference.page.scss'],
})
export class UserPreferencePage implements OnInit {
  userConfig:any;
  preferenceForm!: FormGroup;

  ageRanges = [
    '18-24', '25-30', '31-35', '36-40', '41-50'
  ];
  heightRanges = [
    '4\'0\"-4\'5\"', '4\'6\"-5\'0\"', '5\'1\"-5\'6\"', '5\'7\"-6\'0\"', '6\'1\"-6\'5\"'
  ];
  maritalStatuses = [
    'Never Married', 'Divorced', 'Widowed', 'Separated'
  ];
  weights = [
    '40 KG', '45 KG', '50 KG', '55 KG', '60 KG', '65 KG', '70 KG'
  ];
  religions = [
    'Islam', 'Christianity', 'Hinduism', 'Buddhism', 'Other'
  ];
  communities = [
    'Sunni', 'Shia', 'Other'
  ];
  subCommunities = [
    'A', 'B', 'C', 'D'
  ];
  countries = [
    'India', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka'
  ];
  placesOfOrigin = [
    'Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore'
  ];
  qualifications = ['Graduate', 'Postgraduate', 'Doctorate'];
  professions = ['Software Engineer', 'Doctor', 'Teacher', 'Other'];
  incomeRanges = ['INR 5 Lakh to 10 Lakh', 'INR 10 Lakh to 20 Lakh', 'Above INR 20 Lakh'];


  constructor(private fb: FormBuilder,private navCtrl: NavController,
    private auth:AuthService) { }

  async ngOnInit() {
    
    this.preferenceForm = this.fb.group({
      ageRange: [''],
      heightRange: [''],
      maritalStatus: [''],
      weight: [''],
      religion: [''],
      community: [''],
      subCommunity: [''],
      countryLivingIn: [''],
      placeOfOrigin: [''],
      qualification: [''],
      profession: [''],
      annualIncome: ['']
    });
    this.userConfig= await this.auth.getAllConfig();
    console.log(this.userConfig);
  }

  moveBack() {
    this.navCtrl.back();
  }

  onSubmit() {
    console.log(this.preferenceForm.value);
  }
}
