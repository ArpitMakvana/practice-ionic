import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.scss'],
})
export class AddPictureComponent  implements OnInit {
  @Output() submitData = new EventEmitter()
  constructor() { }

  ngOnInit() {}
  submitForm(){
    this.submitData.emit({})
  }

}
