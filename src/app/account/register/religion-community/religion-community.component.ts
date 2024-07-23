import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-religion-community',
  templateUrl: './religion-community.component.html',
  styleUrls: ['./religion-community.component.scss'],
})
export class ReligionCommunityComponent  implements OnInit {
  @Output() submitData = new EventEmitter()
  religion:string='';
  community:string='';
  livingIn:string='';
  
  constructor() { }

  ngOnInit() {}

  submitForm(){
    this.submitData.emit({religion:this.religion,community:this.community,livingIn:this.livingIn})
  }
}
