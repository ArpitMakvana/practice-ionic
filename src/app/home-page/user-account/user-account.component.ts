import { Component, OnInit } from '@angular/core'; 


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent  implements OnInit {
  
  selectedSegment: string = 'tab1'; // Default selected tab

  constructor() {}

  // Method to handle segment changes
  onSegmentChange(event: any) {
    console.log('Selected Segment:', event.detail.value);
    // You can perform additional actions based on the selected segment if needed
  }


  ngOnInit() {}

}
