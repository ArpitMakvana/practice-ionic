import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  emailPhoneFormData:any;
  nameDobFormData:any;
  steps: number = 0;
  config:any={};
  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.registerService.getConfig().then((res)=>{
      this.config=this.config
    }).catch(err=>console.error(err));
  }

  goBack() {
    this.steps--;
  }
  optionSelected(event: string) {
    console.log(event);
    if (event == 'mobile') {
      this.steps++
    }
  }
  enterdEmailPhone(event: any) {
    this.emailPhoneFormData = event;
    this.steps++;
  }

  submitOtp() {
    this.steps++;
  }
  profileFor(event:any){
    console.log(event);
    this.steps++;
  }
  nameDobForm(event:any){
    console.log(event);
    this.nameDobFormData = event;
    this.steps++;
  }

}
