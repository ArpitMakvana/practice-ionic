import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-name-dob',
  templateUrl: './name-dob.component.html',
  styleUrls: ['./name-dob.component.scss'],
})
export class NameDobComponent  implements OnInit {
  @Output() submitData = new EventEmitter()
  name:string='';
  dob:string='';
  
  constructor() { }

  ngOnInit() {}

  submitForm(){
    this.submitData.emit({name:this.name,dob:this.dob})
  }

}
