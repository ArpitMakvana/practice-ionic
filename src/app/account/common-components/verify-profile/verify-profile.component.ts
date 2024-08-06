import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-verify-profile',
  templateUrl: './verify-profile.component.html',
  styleUrls: ['./verify-profile.component.scss'],
})
export class VerifyProfileComponent  implements OnInit {
  @Output() submitData = new EventEmitter();
  @Output() skip = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}
  submitForm(){
    this.submitData.emit({})
  }
  skipStep() {
    this.skip.emit('verify');
  }
}
