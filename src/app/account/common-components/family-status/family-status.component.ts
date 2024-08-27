import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-family-status',
  templateUrl: './family-status.component.html',
  styleUrls: ['./family-status.component.scss'],
})
export class FamilyStatusComponent implements OnInit {
  @Output() submitData = new EventEmitter();
  familyStatusForm!: FormGroup;
  @Input() presentFormData: any = {};
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.familyStatusForm = this.fb.group({
      familyFinancialStatus: ['', Validators.required],
      liveWithFamily: ['', Validators.required]
    });
    if (this.presentFormData) this.familyStatusForm.patchValue(this.presentFormData);
  }

  submitForm() {
    if (this.familyStatusForm.valid) {
      this.submitData.emit(this.familyStatusForm.value);
    }
  }
}
