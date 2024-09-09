import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../../services/socket.service'; // Import the socket service
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userchat-list',
  templateUrl: './userchat-list.component.html',
  styleUrls: ['./userchat-list.component.scss'],
})
export class UserchatListComponent implements OnInit, OnDestroy {
  chatList: any = []; // Store chat list here
  private chatListSubscription!: Subscription; // Subscription to manage cleanup

  constructor(private socketService: SocketService) {} // Inject SocketService

  ngOnInit() {
    // Subscribe to chatList event from socket
    this.chatListSubscription = this.socketService.onEvent('chatList').subscribe(
      (chatListData) => {
        console.log('Chat List received:', chatListData); // Log received data
        this.chatList = chatListData; // Store chat list data
      },
      (err) => {
        console.error('Error receiving chat list:', err); // Handle error
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe from the chatList event to avoid memory leaks
    if (this.chatListSubscription) {
      this.chatListSubscription.unsubscribe();
    }
  }
}
