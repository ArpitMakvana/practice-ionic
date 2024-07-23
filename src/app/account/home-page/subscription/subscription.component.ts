import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent  implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}
  profilList() {
    this.router.navigate(['/details']);
  }

}
