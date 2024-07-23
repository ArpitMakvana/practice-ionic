import { Component, EventEmitter, OnInit, Output } from '@angular/core';


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
  selectedCountryCode = '+91';
  phoneNumber!: string;
  @Output() formValue = new EventEmitter<any>();
  email: string = '';
  isValidMobile: boolean = true;
  isValidEmail:boolean = true;
  canSubmit:Boolean = false;
  constructor() { }

  ngOnInit() { }

  submitForm() {
    this.formValue.emit({ phone: this.phoneNumber, email: this.email, countrycode: this.selectedCountryCode })
  }

  checkValid(){ 
    if(this.email){
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isValidEmail = emailPattern.test(this.email);
    }
    if(this.phoneNumber){
      this.isValidMobile = this.phoneNumber.length === 10;
    }
    this.canSubmit = this.isValidMobile && this.isValidEmail;
  }

}
