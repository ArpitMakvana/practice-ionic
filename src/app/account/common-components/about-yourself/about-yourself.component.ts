import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-about-yourself',
  templateUrl: './about-yourself.component.html',
  styleUrls: ['./about-yourself.component.scss'],
})
export class AboutYourselfComponent  implements OnInit {
  @Output() submitData = new EventEmitter()
  aboutYourself:string='';
  @Input() presentFormData: any = {};
  
  constructor() { }

  ngOnInit() {
    if(this.presentFormData) this.aboutYourself = this.presentFormData;
  }

  submitForm(){
    this.submitData.emit(this.aboutYourself)
  }
}
