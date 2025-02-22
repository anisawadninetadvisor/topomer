import { Component, OnInit ,ElementRef, Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
declare var $: any;
import { MessageService } from 'src/app/services/module-msg/message.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { AddPostService } from 'src/app/services/sync/add-post.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  constructor(private addPostService:AddPostService,private messageService:MessageService,private router: Router,private toastController: ToastController,private renderer: Renderer2,private socketService:SocketService) { }
  user:any=[];
  baseUrlFile: string = environment.BASE_URL_file;
  new_msg=0;
  ngOnInit() {
 
    let user =sessionStorage.getItem('user');
    this.user= user ? JSON.parse(user) : null;
    this.getNbMsg();
    if(sessionStorage.getItem('messageControl'))
    {
     
      if(sessionStorage.getItem('messageControl')=="1")
      {
        this.getNbMsg();
        sessionStorage.setItem('messageControl',"0")
      }else
      {
        sessionStorage.setItem('messageControl',"0")
      }
    }else 
    {
      sessionStorage.setItem('messageControl 2',"0")
    }
    this.addPostService.message$.subscribe(post => {
      if (post) {
        this.getNbMsg();
      }
    });
    this.socketService.onNewMessage().subscribe((data) => {
   
      if(data)
      {
      
     this.getNbMsg();
      this.presentToast()
      }
      
    });

    this.socketService.onNewupdateVueNb().subscribe((data) => {
   
      this.getNbMsg();
      
    });
   
  }
  getNbMsg()
  {
     
    this.messageService.getNbMessage(this.user.id)
    .subscribe(
      data => {
       
        if(data)
        {
            this.new_msg=data;
        }
      },
      error => {
        
      
      }
    );
  }
  redirect(url:any)
  {
    
    this.router.navigate([url]);
  }
  async presentToast() {
    const audio = new Audio();
    audio.src = this.baseUrlFile+'uploads/son/msg.mp3';
    audio.load();
    audio.play(); // Joue le son
    const toast = await this.toastController.create({
      message: 'New message',
      duration: 5000, 
      position: 'top', 
      cssClass: 'custom-toast' 
    });
    toast.present();
  }
  actualise() {
    if (this.router.url === '/') {
      location.reload();
    }
  }
  
  


}
