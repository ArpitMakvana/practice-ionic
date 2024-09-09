import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit, OnDestroy {
  notifications: any[] = [];
  private socketStatusSubscription!: Subscription;
  private notificationSubscription!: Subscription;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    // Listen for socket connection status
    this.socketStatusSubscription = this.socketService.getConnectionStatus().subscribe(isConnected => {
      if (isConnected) {
        console.log('Socket is connected. Now listening for notifications.');
  
        // Add log here before subscribing to notifications
        console.log('Registering notification event...');
  
        // Listen for notifications only when socket is connected
        this.notificationSubscription = this.socketService.onEvent('notification').subscribe(
          (notification) => {
            console.log('Notification received:', notification); // <-- This log should trigger
            this.notifications.push(notification);
          },
          (err) => console.error('Error receiving notifications:', err)
        );
      } else {
        console.warn('Socket is not connected. Cannot listen for notifications.');
      }
    });
  }
  

  markAsRead(notificationId: string) {
    this.socketService.emitEvent('readNotification', { id: notificationId });
  }

  ngOnDestroy() {
    // Unsubscribe from socket status and notification subscriptions to avoid memory leaks
    if (this.socketStatusSubscription) {
      this.socketStatusSubscription.unsubscribe();
    }
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
}
