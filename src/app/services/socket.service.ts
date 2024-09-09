import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  private socket!: Socket;
  private readonly SOCKET_URL = environment.socket;
  private isConnected = new BehaviorSubject<boolean>(false); // BehaviorSubject to store the last emitted value

  constructor(private auth: AuthService) {
    this.initializeSocketConnection();
  }

  private async initializeSocketConnection() {
    try {
      const token = await this.auth.getToken();
      console.log('Token:', token);
      this.socket = io(this.SOCKET_URL, {
        extraHeaders: {
          token: token,
        }
      });

      this.socket.on('connect', () => {
        console.log('Socket connected:', this.socket.id);
        this.isConnected.next(true);
      });

      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
        this.isConnected.next(false);
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        this.isConnected.next(false);
      });

      this.socket.on('connect_timeout', () => {
        console.warn('Socket connection timeout');
        this.isConnected.next(false);
      });

    } catch (error) {
      console.error('Error fetching token or connecting to socket:', error);
    }
  }

  // Emit an event to the server
  emitEvent(eventName: string, data: any) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    } else {
      console.error('Socket is not connected.');
    }
  }

  // Listen for events from the server
  onEvent<T>(eventName: string): Observable<T> {
    return new Observable<T>((observer) => {
      if (this.socket) {
        console.log(`Listening for event: ${eventName}`); // Log the event you're listening for
  
        this.socket.on(eventName, (data: T) => {
          console.log(`Event ${eventName} received with data:`, data); // Log received data here
          observer.next(data);
        });
      } else {
        console.error('Socket is not connected.');
      }
    });
  }
  

  // Listen for socket connection status
  getConnectionStatus(): Observable<boolean> {
    return this.isConnected.asObservable();
  }

  // Disconnect from socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  ngOnDestroy() {
    this.disconnect();
  }
}
