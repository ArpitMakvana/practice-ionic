import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-for',
  templateUrl: './profile-for.component.html',
  styleUrls: ['./profile-for.component.scss'],
})
export class ProfileForComponent implements OnInit {
  @Output() profileFor = new EventEmitter();
  @Input() options: any;
  @Input() presentFormData: any = {};
  selected: string = '';
  constructor() { }

  ngOnInit() {
    this.options = this.options.split(',');
    console.log(this.options);
  }

  selectedOption(option: string) {
    this.selected = option;
    this.profileFor.emit(this.selected);
  }



}
