import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.component.html',
  styleUrls: ['./family-member.component.scss'],
})
export class FamilyMemberComponent  implements OnInit {
  @Output() submitData = new EventEmitter()
  constructor() { }

  ngOnInit() {}
  submitForm(){
    this.submitData.emit({})
  }
}
