import { Component, OnInit, ViewChildren, QueryList, Output, EventEmitter, Input } from '@angular/core';
import { IonInput } from '@ionic/angular';
@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
})
export class OtpInputComponent implements OnInit {
  otpArray: string[] = ['', '', '', '', '', ''];

  @ViewChildren(IonInput) otpInputs!: QueryList<IonInput>;
  @Output() submitOTP = new EventEmitter<any>();
  @Output() resetEmail = new EventEmitter<boolean>();
  @Output() resendOTP = new EventEmitter<boolean>();
  @Input() data:any;
  OTP:any='';
  disableSubmit:boolean=true;
  disableResend:boolean=true;
  constructor() { }

  ngOnInit() { 
    this.counter();
  }

  counter(){
    setTimeout(()=>{
      this.disableResend=false;
    },6000)
  }

  reEnterEmail(){
    this.resetEmail.emit(true);
  }
  resendOTPEmit(){
    this.disableResend=true;
    this.counter();
    this.resendOTP.emit(true);
  }
  checkValid(){
    if(this.OTP.length==6) this.disableSubmit=false;
  }

  onInput(event: any, index: number) {
    console.log(index);
    console.log(this.otpInputs.toArray())
    this.otpArray[index] = event.target.value;
    if (index < 3) {

      this.otpInputs.toArray()[index + 1].setFocus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const prevInput = this.otpInputs.toArray()[index - 1];
    const currentInput = this.otpInputs.toArray()[index];

    if (event.key === 'Backspace') {
      if (this.otpArray[index]) {
        this.otpArray[index] = ''; // Clear current input
      } else if (index > 0) {
        this.otpArray[index - 1] = ''; // Clear previous input
        prevInput.setFocus();
      }
    }
  }

  submitForm() {
    // const otp = this.otpArray.join('');
    // console.log('Submitted OTP:', this.OTP);
    this.submitOTP.emit({otp:this.OTP,email:this.data.email});
  }

  clearOtp() {
    this.otpArray = ['', '', '', '', '', ''];
    this.otpInputs.forEach(input => input.value = '');
    this.otpInputs.first.setFocus();
  }
}
