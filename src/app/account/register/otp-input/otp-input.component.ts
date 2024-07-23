import { Component, OnInit, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { IonInput } from '@ionic/angular';
@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
})
export class OtpInputComponent implements OnInit {
  otpArray: string[] = ['', '', '', '', '', ''];

  @ViewChildren(IonInput) otpInputs!: QueryList<IonInput>;
  @Output() submitOTP = new EventEmitter<string>();
  email:string='';
  constructor() { }

  ngOnInit() { }

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
    const otp = this.otpArray.join('');
    console.log('Submitted OTP:', otp);
    this.submitOTP.emit(otp);
  }

  clearOtp() {
    this.otpArray = ['', '', '', '', '', ''];
    this.otpInputs.forEach(input => input.value = '');
    this.otpInputs.first.setFocus();
  }
}
