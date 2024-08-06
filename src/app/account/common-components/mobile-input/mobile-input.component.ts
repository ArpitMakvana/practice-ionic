import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/angular';
@Component({
  selector: 'app-mobile-input',
  templateUrl: './mobile-input.component.html',
  styleUrls: ['./mobile-input.component.scss'],
})
export class MobileInputComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  countries = [
    { name: 'United States', dialCode: '+1' },
    { name: 'Canada', dialCode: '+1' },
    { name: 'United Kingdom', dialCode: '+44' },
    { name: 'Australia', dialCode: '+61' },
    { name: 'India', dialCode: '+91' },
  ];
  selectedCountryCode:string = '+91';
  phoneNumber!: string;
  @Output() formValue = new EventEmitter<any>();
  @Input() presentFormData: any = {};
  email: string = '';
  password: string = '';
  isValidMobile: boolean = true;
  isValidPass: boolean = true;
  isValidEmail: boolean = true;
  canSubmit: Boolean = false;
  constructor() { }

  ngOnInit() {
    if(this.presentFormData) {
      this.email=this.presentFormData.email;
      this.password = this.presentFormData.password;
      this.phoneNumber = this.presentFormData.phone;
      this.selectedCountryCode = this.presentFormData.countrycode;
      this.canSubmit=true;
    }
   }

  submitForm() {
    this.formValue.emit({ phone: this.phoneNumber, email: this.email, countrycode: this.selectedCountryCode, password: this.password })
  }

  checkValid() {
    if (this.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isValidEmail = emailPattern.test(this.email);
    }
    if (this.phoneNumber) {
      this.isValidMobile = this.phoneNumber.length === 10;
    }
    if (this.password) {
      this.isValidPass = this.password.length > 5;
    }
    this.canSubmit = this.isValidMobile && this.isValidEmail && this.isValidPass;
  }

}
