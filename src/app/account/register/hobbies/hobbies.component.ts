import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss'],
})
export class HobbiesComponent  implements OnInit {
@Output() submitData = new EventEmitter()
constructor() { }

ngOnInit() {}
submitForm(){
  this.submitData.emit({})
}
}
