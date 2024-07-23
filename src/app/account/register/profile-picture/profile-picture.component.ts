import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent  implements OnInit {
  @Output() profilepicture = new EventEmitter();
  selected:string='';
  constructor() { }

  ngOnInit() {}

  selectedOption(option:string){
    this.selected=option;
    this.profilepicture.emit(this.selected);
  }



}
