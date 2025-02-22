import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  private socket: Socket;
  constructor() { 
    this.socket = io('https://api-topomer.satisvisor.com/');
  }

  ngOnInit() {
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.socket.emit('register', users.id);
  
    this.socket.on('message', (data: any) => {
      console.log('Message reçu:', data);
    });
    this.socket.on('new_message', (message: any) => {
      console.log('Nouveau message reçu:', message);
    
    });
 
  }
  sendMessage() {
    // Envoie un message au serveur
    const message = 'Hello depuis Ionic !';
    this.socket.emit('message', message);
  }

  ngOnDestroy() {
    // Déconnexion propre lorsque le composant est détruit
    this.socket.disconnect();
  }

}
