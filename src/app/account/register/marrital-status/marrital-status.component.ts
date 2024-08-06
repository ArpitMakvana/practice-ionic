import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-marrital-status',
  templateUrl: './marrital-status.component.html',
  styleUrls: ['./marrital-status.component.scss'],
})
export class MarritalStatusComponent implements OnInit {
  @Output() submitData = new EventEmitter();
  @Input() userMaritalStatus: any;
  @Input() presentFormData: any = {};

  maritalStatusForm!: FormGroup;
  heightOptions: string[] = this.generateHeightOptions();
  weightOptions: string[] = this.generateWeightOptions();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const validJsonString = this.userMaritalStatus.replace(/'/g, '"');
    this.userMaritalStatus = JSON.parse(validJsonString);

    this.maritalStatusForm = this.fb.group({
      maritalStatus: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
    });
    if(this.presentFormData) this.maritalStatusForm.patchValue(this.presentFormData);

    console.log(this.userMaritalStatus);
  }

  generateHeightOptions(): string[] {
    const heightOptions = [];
    for (let i = 140; i <= 210; i++) {
      heightOptions.push(`${i} cm / ${Math.floor(i / 30.48)}'${Math.round((i / 30.48 - Math.floor(i / 30.48)) * 12)}"`);
    }
    return heightOptions;
  }

  generateWeightOptions(): string[] {
    const weightOptions = [];
    for (let i = 40; i <= 150; i++) {
      weightOptions.push(`${i} kg`);
    }
    return weightOptions;
  }

  submitForm() {
    if (this.maritalStatusForm.valid) {
      this.submitData.emit(this.maritalStatusForm.value);
    }
  }
}
