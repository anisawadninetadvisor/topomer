import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/module-msg/message.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket/socket.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-interface-initiale',
  templateUrl: './interface-initiale.page.html',
  styleUrls: ['./interface-initiale.page.scss'],
})

export class InterfaceInitialePage implements OnInit {
  base_url_file = environment.BASE_URL_file;
  constructor(private loadingCtrl: LoadingController,private socketService:SocketService,private router:Router,private messageService: MessageService) { }
  userId: any = 0;
  message: any = [];
  messageSearch:any=[];
  loading:any;
  async ngOnInit() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circles',
   
    });

    await this.loading.present();
    this.socketService.onNewMessage().subscribe((data) => {
   
      if(data)
      {
        this.getAll();
      
      }
      
    });
    sessionStorage.setItem('path',this.router.url);
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.userId = users.id;
    this.getAll();
  }
  getAll() {
    this.messageService.getAll(this.userId)
      .subscribe(
        data => {
          console.log(data);
          if(!data.message)
          {
            this.message = data;
            this.messageSearch=data;
          
          }
          this.loading.dismiss();
      
          this.scrollToBottom();

        },
        error => {
          this.loading.dismiss();
        }
      );

  }
  truncateMessage(msg: string): string {
    return msg.length > 50 ? msg.substring(0, 50) + '...' : msg;
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
private scrollToBottom() {
  const chatContainer = document.querySelector('.chat-container');
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight; // Fait défiler vers le bas
  }
}
onSearch(event: Event)
{
  var inputValue = (event.target as HTMLInputElement).value;
  if(inputValue.length>2)
  {
    if(this.messageSearch.length>0)
    {
    
      this.message = this.messageSearch.filter((msg: any) => 
        msg.receiver_username?.toLowerCase().includes(inputValue.toLowerCase()) ||
        msg.sender_username?.toLowerCase().includes(inputValue.toLowerCase())
      );
      
    }
    
  }else 
  {
    this.message=this.messageSearch;
  }
 
}

}
