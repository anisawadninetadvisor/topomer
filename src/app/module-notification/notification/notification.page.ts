import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { environment } from 'src/environments/environment';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  baseUrlFile: string = environment.BASE_URL_file;
  constructor(private socketService:SocketService,private notificationService:NotificationService) { }
  notfication:any=[];
  ngOnInit() { 
  
    this.getData();
  }
  getData()
  {
    let user =sessionStorage.getItem('user');
   let users = user ? JSON.parse(user) : null;
      this.notificationService.getAll(users.id).subscribe(
        data => {
          if(!data.message)
          {
            this.notfication=data;
            this.socketService.sendNotif(users.id);
          }
        },
        error => {
          console.error('Erreur lors de la récupération des données :', error);
        }
      );

      this.notificationService.update(users.id).subscribe(
        data => {
        
        },
        error => {
          console.error('Erreur lors de la récupération des données :', error);
        }
      );
    
    
  }
  timeAgo(createdAt: string): string {
    const now = new Date();
    const past = new Date(createdAt);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
    const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };
  
    for (const interval in intervals) {
        const value = Math.floor(seconds / intervals[interval]);
        if (value >= 1) {
            return value === 1
                ? `1 ${interval} ago`
                : `${value} ${interval}s ago`;
        }
    }
    return "just now";
  }

}
