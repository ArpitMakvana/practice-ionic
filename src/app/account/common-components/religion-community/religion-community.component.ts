import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-religion-community',
  templateUrl: './religion-community.component.html',
  styleUrls: ['./religion-community.component.scss'],
})
export class ReligionCommunityComponent implements OnInit {
  @Output() submitData = new EventEmitter();
  @Input() userReligion: any;
  @Input() presentFormData: any = {};

  religionCommunityForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userReligion = this.userReligion.split(',').map((str: any) => str.replace('"', ''));
    this.religionCommunityForm = this.fb.group({
      religion: ['', Validators.required],
      community: ['', Validators.required],
      subcommunity: ['', Validators.required]
    });
    if (this.presentFormData) this.religionCommunityForm.patchValue(this.presentFormData);

    console.log(this.userReligion);
  }


  submitForm() {
    if (this.religionCommunityForm.valid) {
      this.submitData.emit(this.religionCommunityForm.value);
    }
  }
}
