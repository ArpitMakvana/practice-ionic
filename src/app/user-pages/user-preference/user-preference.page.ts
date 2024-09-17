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
  userConfig: any;
  preferenceForm!: FormGroup;

  ageRanges = [
    '18-24', '25-30', '31-35', '36-40', '41-50'
  ];
  heightRanges = [
    '4\'0\"-4\'5\"', '4\'6\"-5\'0\"', '5\'1\"-5\'6\"', '5\'7\"-6\'0\"', '6\'1\"-6\'5\"'
  ];
  maritalStatuses = [];
  religions = [
    'Islam', 'Christianity', 'Hinduism', 'Buddhism', 'Other'
  ];
  countries = [
    'India', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka'
  ];
  qualifications = [];
  professions = [];
  incomeRanges = [];


  constructor(private fb: FormBuilder, private navCtrl: NavController,
    private auth: AuthService) { }

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
    this.auth.getAllConfig().then(res => {
      this.userConfig = res.reduce((obj: any, item: any) => {
        let parsedValue;
        try {
          parsedValue = JSON.parse(item.value);
        } catch (e) {
          parsedValue = item.value; // Fallback in case value is not a valid JSON
        }
        obj[item.key] = parsedValue;
        return obj;
      }, {});
      console.log(this.userConfig);
      // Assuming 'res' has relevant keys for the filter options
      this.religions = this.userConfig.user_religion || [];
      this.qualifications = this.userConfig.user_heighest_qualification || [];
      this.professions = this.userConfig.user_working_profession || [];
      this.incomeRanges = this.userConfig.user_income || [];
      this.maritalStatuses = this.userConfig.user_marital_status || [];
      // this.smokeOptions = this.userConfig.user_smoke_habit || [];
      // this.beardOptions = this.userConfig.user_beard || [];
      // this.maritalStatuses = this.userConfig.user_marital_status || [];
    });
    console.log(this.userConfig);

  }


  moveBack() {
    this.navCtrl.back();
  }
  generateWeightOptions(): string[] {
    const weightOptions = [];
    for (let i = 40; i <= 150; i++) {
      weightOptions.push(`${i} kg`);
    }
    return weightOptions;
  }

  onSubmit() {
    console.log(this.preferenceForm.value);
  }
}
