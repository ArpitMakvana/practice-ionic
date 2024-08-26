import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-preference',
  templateUrl: './user-preference.component.html',
  styleUrls: ['./user-preference.component.scss'],
})
export class UserPreferenceComponent implements OnInit {
  @Output() submitData = new EventEmitter();
  @Input() data: any;
  @Input() canDisplayMaritalStatus: boolean = false;
  @Input() presentFormData: any = {};
  @Input() displaLogo?=true;
  otherDetailsForm!: FormGroup;
  skinColourOptions: string[] = [];
  bodyShapeOptions: string[] = [];
  prayerOptions: string[] = [];
  smokeOptions: string[] = [];
  beardOptions: string[] = [];
  maritalStatusOptions: string[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.otherDetailsForm = this.fb.group({
      skinColour: ['', Validators.required],
      bodyShape: ['', Validators.required],
      prayer: ['', Validators.required],
      smoke: ['', Validators.required],
      beard: ['', Validators.required],
      maritalStatus: [''],
    });

    this.skinColourOptions = this.data.user_skin_colour;
    this.bodyShapeOptions = this.data.user_body_shape;
    this.prayerOptions = this.data.user_prayer;
    this.smokeOptions = this.data.user_smoke_habit;
    this.beardOptions = this.data.user_beard;
    this.maritalStatusOptions = this.data.user_marital_status;
    if (this.presentFormData) this.otherDetailsForm.patchValue(this.presentFormData);
  }

  submitForm() {
    if (this.otherDetailsForm.valid) {
      this.submitData.emit(this.otherDetailsForm.value);
    }
  }
}
