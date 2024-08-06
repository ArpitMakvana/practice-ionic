import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register-sucess',
  templateUrl: './register-sucess.component.html',
  styleUrls: ['./register-sucess.component.scss'],
})
export class RegisterSucessComponent  implements OnInit {
  @Output() submitData = new EventEmitter()
  constructor() { }

  ngOnInit() {}
  submitForm(){
    this.submitData.emit({})
  }

}
