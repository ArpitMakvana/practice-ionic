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
  gender: string = '';
  constructor() { }

  ngOnInit() {
    this.selected = this.presentFormData.profileFor;
    this.gender = this.presentFormData.gender;

  }

  selectedOption(option: string) {
    this.selected = option;
    // this.profileFor.emit(this.selected);
  }

  selectedGender(option: string) {
    this.gender = option;
  }

  submit() {
    this.profileFor.emit({ profileFor: this.selected, gender: this.gender })
  }



}
