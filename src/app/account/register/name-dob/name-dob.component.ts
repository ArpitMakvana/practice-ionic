import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-name-dob',
  templateUrl: './name-dob.component.html',
  styleUrls: ['./name-dob.component.scss'],
})
export class NameDobComponent implements OnInit {
  @Output() submitData = new EventEmitter();
  @Input() presentFormData: any = {};
  nameDobForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.nameDobForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      userName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
    });
    if(this.presentFormData) this.nameDobForm.patchValue(this.presentFormData);
  }

  get firstName() {
    return this.nameDobForm.get('firstName');
  }
  get lastName() {
    return this.nameDobForm.get('lastName');
  }
  get userName() {
    return this.nameDobForm.get('userName');
  }
  get dateOfBirth() {
    return this.nameDobForm.get('dateOfBirth');
  }
  get gender() {
    return this.nameDobForm.get('gender');
  }

  submitForm() {
    if (this.nameDobForm.valid) {
      this.submitData.emit(this.nameDobForm.value);
    } else {
      this.nameDobForm.markAllAsTouched();
    }
  }
}
