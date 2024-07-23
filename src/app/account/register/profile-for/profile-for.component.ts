import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-for',
  templateUrl: './profile-for.component.html',
  styleUrls: ['./profile-for.component.scss'],
})
export class ProfileForComponent  implements OnInit {
  @Output() profileFor = new EventEmitter();
  selected:string='';
  constructor() { }

  ngOnInit() {}

  selectedOption(option:string){
    this.selected=option;
    this.profileFor.emit(this.selected);
  }



}
