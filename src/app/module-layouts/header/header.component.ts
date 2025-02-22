import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  nb:any=0;
  constructor(private socketService:SocketService,private menu: MenuController,private notificationService:NotificationService) { }
  ngOnInit(): void {
    this.socketService.onNewNotification().subscribe((data) => {
   
      this.getAll();
      
    });
    this.getAll();
  }
  getAll()
  {
    let user =sessionStorage.getItem('user');
    let users = user ? JSON.parse(user) : null;
       this.notificationService.getNb(users.id).subscribe(
         data => {
    
           if(!data.message)
           {
           
             this.nb=data;
           }
         },
         error => {
           console.error('Erreur lors de la récupération des données :', error);
         }
       );
  }
 
  openMenu() {
    
    this.menu.open();
  }
  


}
