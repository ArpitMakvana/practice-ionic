import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent  implements OnInit {
  @Input() plans:any;
  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {
    console.log(this.plans)
  }
  activatePlan(plan:any){
    return this.modalCtrl.dismiss(plan, 'purchased');
  }

}
