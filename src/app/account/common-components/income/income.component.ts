import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})
export class IncomeComponent implements OnInit {
  @Output() submitData = new EventEmitter();
  @Input() userIncome: any;
  @Input() userWorkAs: any;
  @Input() presentFormData: any = {};
  incomeForm!: FormGroup;

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.incomeForm = this.fb.group({
      income: ['', Validators.required],
      workDetail: ['', Validators.required],
      workAs: ['', Validators.required],
    });
    if (this.presentFormData) this.incomeForm.patchValue(this.presentFormData);
  }

  submitForm() {
    this.submitData.emit(this.incomeForm.value)
  }
}
