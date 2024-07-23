import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-about-yourself',
  templateUrl: './about-yourself.component.html',
  styleUrls: ['./about-yourself.component.scss'],
})
export class AboutYourselfComponent  implements OnInit {
  @Output() submitData = new EventEmitter()
  about:string='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus sem, auctor accumsan egestas sed, venenatis at ex. Nam consequat ex odio, suscipit rhoncus orci dictum eget. Aenean sit amet ligula varius felis facilisis lacinia nec volutpat nulla. Duis ullamcorper sit amet turpis sed blandit. Integer pretium massa eu faucibus interdum.';
  
  constructor() { }

  ngOnInit() {}

  submitForm(){
    this.submitData.emit({about:this.about})
  }
}
