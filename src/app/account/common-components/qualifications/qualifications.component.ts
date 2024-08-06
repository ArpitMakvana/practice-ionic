import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss'],
})
export class QualificationsComponent  implements OnInit {
  @Output() submitData = new EventEmitter();
  @Input() userHighestQualifications:any;
  @Input() presentFormData: any = {};
  qualificationForm!: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.userHighestQualifications);
    try {
      const validJsonString = this.userHighestQualifications.replace(/'/g, '"');
      this.userHighestQualifications = JSON.parse(validJsonString);
      console.log(this.userHighestQualifications);
    } catch (e) {
      this.userHighestQualifications = this.userHighestQualifications.split("'").filter((ele:any)=>ele!=','&& ele!=='[' && ele!==', ' && ele!==' ,' && ele!==']');
      console.log(this.userHighestQualifications);
    }
    this.qualificationForm = this.fb.group({
      heightestQualification: ['', Validators.required],
      college: ['', Validators.required],
    });
    if(this.presentFormData) this.qualificationForm.patchValue(this.presentFormData);
  }

  submitForm(){
    this.submitData.emit(this.qualificationForm.value);
  }
}
