import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-option',
  templateUrl: './register-option.component.html',
  styleUrls: ['./register-option.component.scss'],
})
export class RegisterOptionComponent implements OnInit {
  @Output() selectedOption = new EventEmitter<string>();
  @Output() submit = new EventEmitter<string>();
  @Input() disableButton: any = false;
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    this.submit.emit(this.loginForm.value)
  }

  selectOption(option: string) {
    this.selectedOption.emit(option);
  }
}
