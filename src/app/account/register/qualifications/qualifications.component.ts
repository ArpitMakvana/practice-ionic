import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss'],
})
export class QualificationsComponent  implements OnInit {
  @Output() submitData = new EventEmitter()
  qualification:string='';
  college:string='';
  
  constructor() { }

  ngOnInit() {}

  submitForm(){
    this.submitData.emit({qualification:this.qualification,college:this.college})
  }
}
