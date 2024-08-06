import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-family-status',
  templateUrl: './family-status.component.html',
  styleUrls: ['./family-status.component.scss'],
})
export class FamilyStatusComponent  implements OnInit {
  @Output() submitData = new EventEmitter()
  constructor() { }

  ngOnInit() {}
  submitForm(){
    this.submitData.emit({})
  }

}
