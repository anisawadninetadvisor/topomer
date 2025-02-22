import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private baseUrl: string = environment.BASE_URL+"/";
  constructor() {
    let user =sessionStorage.getItem('user');
    let users= user ? JSON.parse(user) : null;
    this.socket = io("https://files-pub.com/");
    this.socket.emit('register', users.id);

  }

  getSocket(): Socket {
    return this.socket;
  }
  onNewMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newmessage', (data,callback) => {
        if (callback) {
          callback('received');
      }
        observer.next(data);
      });
    });
  }
  onNewNotification(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newnotif', (data,callback) => {
        if (callback) {
          callback('received');
      }
        observer.next(data);
      });
    });
  }
  sendMessage(id:any,data: any) {
    this.socket.emit('newmessage', id,data);
  }
  updateVueNb(id:any) {
    this.socket.emit('updatevuenb', id);
  }

  onNewupdateVueNb(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('updatevuenb', (data,callback) => {
        if (callback) {
          callback('received');
      }
        observer.next(data);
      });
    });
  }
  
  
  sendNotif(id:any) {
    this.socket.emit('newnotif', id);
  }
}
