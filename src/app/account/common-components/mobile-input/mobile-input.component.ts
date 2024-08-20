import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mobile-input',
  templateUrl: './mobile-input.component.html',
  styleUrls: ['./mobile-input.component.scss'],
})
export class MobileInputComponent implements OnInit {
  form!: FormGroup;
  countries = [
    { name: 'United States', dialCode: '+1' },
    { name: 'Canada', dialCode: '+1' },
    { name: 'United Kingdom', dialCode: '+44' },
    { name: 'Australia', dialCode: '+61' },
    { name: 'India', dialCode: '+91' },
  ];
  @Output() formValue = new EventEmitter<any>();
  @Input() presentFormData: any = {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      selectedCountryCode: ['+91', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    if (this.presentFormData) {
      this.form.patchValue({
        email: this.presentFormData.email,
        phoneNumber: this.presentFormData.phone,
        selectedCountryCode: this.presentFormData.countrycode,
        password: this.presentFormData.password,
      });
    }

    this.form.statusChanges.subscribe(() => {
      this.checkValid();
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.formValue.emit(this.form.value);
    }
  }

  checkValid() {
    return this.form.valid;
  }

  get email() {
    return this.form.get('email');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get selectedCountryCode() {
    return this.form.get('selectedCountryCode');
  }

  get password() {
    return this.form.get('password');
  }
}
