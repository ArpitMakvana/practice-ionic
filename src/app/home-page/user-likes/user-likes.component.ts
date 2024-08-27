import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-likes',
  templateUrl: './user-likes.component.html',
  styleUrls: ['./user-likes.component.scss'],
})
export class UserLikesComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  openProfile(data:any){
    this.router.navigate(['/home/profile-information'])
  }
}
