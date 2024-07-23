import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-marrital-status',
  templateUrl: './marrital-status.component.html',
  styleUrls: ['./marrital-status.component.scss'],
})
export class MarritalStatusComponent  implements OnInit {
  @Output() submitData = new EventEmitter()
  maritalStatus:string='';
  height:string='';
  diet:string='';
  
  constructor() { }

  ngOnInit() {}

  submitForm(){
    this.submitData.emit({maritalStatus:this.maritalStatus,height:this.height,diet:this.diet})
  }
}
