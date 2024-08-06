import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register-option',
  templateUrl: './register-option.component.html',
  styleUrls: ['./register-option.component.scss'],
})
export class RegisterOptionComponent implements OnInit {
  @Output() selectedOption = new EventEmitter<string>();
  constructor() { }

  ngOnInit() { }

  selectOption(option: string) {
    this.selectedOption.emit(option);
  }
}
