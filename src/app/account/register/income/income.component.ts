import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})
export class IncomeComponent  implements OnInit {
  @Output() submitData = new EventEmitter()
  income:string='';
  workWith:string='';
  workAs:string='';
  
  constructor() { }

  ngOnInit() {}

  submitForm(){
    this.submitData.emit({income:this.income,workWith:this.workWith,workAs:this.workAs})
  }
}
