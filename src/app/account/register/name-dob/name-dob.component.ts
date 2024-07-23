import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-name-dob',
  templateUrl: './name-dob.component.html',
  styleUrls: ['./name-dob.component.scss'],
})
export class NameDobComponent implements OnInit {
  @Output() submitData = new EventEmitter();
  nameDobForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.nameDobForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dob: ['', Validators.required],
    });
  }

  get firstName() {
    return this.nameDobForm.get('firstName');
  }
  get lastName() {
    return this.nameDobForm.get('lastName');
  }
  get dob() {
    return this.nameDobForm.get('dob');
  }

  submitForm() {
    if (this.nameDobForm.valid) {
      this.submitData.emit(this.nameDobForm.value);
    } else {
      this.nameDobForm.markAllAsTouched();
    }
  }
}
