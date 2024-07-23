import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-state-city',
  templateUrl: './state-city.component.html',
  styleUrls: ['./state-city.component.scss'],
})
export class StateCityComponent  implements OnInit {
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
