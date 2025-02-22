import { AfterViewInit, Component, OnInit, ViewChild ,Output,EventEmitter } from '@angular/core';
import { MessageService } from 'src/app/services/module-msg/message.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { io, Socket } from 'socket.io-client';
import { SocketService } from 'src/app/services/socket/socket.service';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { LoadingController } from '@ionic/angular';
import { PostsService } from 'src/app/services/module-fil-actualite/posts.service';
import { IonContent } from '@ionic/angular';
import { AddPostService } from 'src/app/services/sync/add-post.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-message-user-client',
  templateUrl: './message-user-client.page.html',
  styleUrls: ['./message-user-client.page.scss'],
})
export class MessageUserClientPage implements AfterViewInit {
  @Output() messageUpdated = new EventEmitter<any>();
  @ViewChild('content', { static: true }) content!: IonContent;
  afficheplus:any=true;
   limit =25;
   scrollPosition: number = 0;
  fileloading:any=[];
  loading:any=false;
  idsender:any;
  path:any="";
  baseUrlFile: string = environment.BASE_URL_file;
  message:any=[];
  name:any="";
  msg:any="";
  socket:any;
  fileSend:any=null;
  showmore=false;
  constructor(private router: Router,private addPostService:AddPostService,private postsService:PostsService,private toastController: ToastController,private imageCompress: NgxImageCompressService,private loadingController: LoadingController,private socketService:SocketService,private messageService:MessageService,private route: ActivatedRoute,private profileService:ProfileService) { }
  id:any=0;
  users:any=[];
  sender:any=[];
 

  ngAfterViewInit() {
    
    this.idsender = this.route.snapshot.paramMap.get('sender');
    let user =sessionStorage.getItem('user');
    let users= user ? JSON.parse(user) : null;
    this.id=users.id;
    this.users=users;
    this.getData(this.limit);
    
    this.getUser();
    this.updateVue();
    /***** socket test  */

    this.socketService.onNewMessage().subscribe((data) => {
     
      if(data)
      {
        if(this.message.length==0)
        {
          window.location.reload();
        }else 
        {
          this.message.push(data);
        }
       
        if (this.content) {
            
          setTimeout(() => {
            this.content.scrollToBottom(0).then(() => console.log('Scrolled to bottom'));
          }, 100);
        } else {
         
        }
        this.smouthBottom();
      }
      
    });

    /******* */
    if(sessionStorage.getItem('path'))
    {
      if(sessionStorage.getItem('path')!="")
      {
        this.path=sessionStorage.getItem('path');
      }else 
      {
        this.path="/message";
      }
    }
  }
  updateVue()
  {
    this.messageService.update(this.id,this.idsender)
    .subscribe(
      data => {
        if(sessionStorage.getItem('messageControl')=="1")
          {
           
            sessionStorage.setItem('messageControl',"1")
          }else 
          {
            sessionStorage.setItem('messageControl',"1")
          }
        this.socketService.updateVueNb(this.idsender);
        this.messageUpdated.emit(this.id);
        this.addPostService.setMessage(this.id);
      },
      error => {
        console.log(error)
      
      }
    );
  }
  getData(limit:any)
  {
    this.limit=limit;
    this.messageService.getByDesc(this.id,this.idsender,this.limit)
    .subscribe(
      data => {
        
       console.log("je suis icia")
        if(data)
        {
          console.log(data)
          if(data.length==this.message.length)
            {
              this.afficheplus=false;
            }
            if(!data.message)
            {
              this.message=data;
            }
           console.log(this.message)
          if(this.message.length>0)
          {
            this.message = data.reverse();
            if (this.content && this.message.length<26 && this.showmore==false) {
            
              setTimeout(() => {
                this.content.scrollToBottom(0).then(() => console.log('Scrolled to bottoms'));
                
                this.loading=true;
              }, 1);
            } else {
             
              this.loading=true;
            }
          }else 
          {
            this.loading=true;
          }
           
          
         // this.smouthBottom();
        }
      },
      error => {
        console.log(error)
      
      }
    );
  }
  getUser()
  {
    this.profileService.getByIdUser(this.idsender)
    .subscribe(
      data => {
        this.name=data.nom+"  "+data.prenom;
        if(this.name.length>20)
        {
          this.name=data.nom;
          if(this.name.length>20)
          {
             this.name=this.name.substring(0, 20)+"..";
          }
        }
        
        var text=this.name;
        this.name=text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        this.sender=data;
        
    
      },
      error => {
        
      
      }
    );
  }
  smouthBottom()
  {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100); 
      }
    });
  }
  send()
  {
    
    if((this.msg!="" && this.msg.length <100) ||  this.fileSend!=null)
    {
      
      
      var data={
        "userIdSend": this.id,
        "userIdReceive": this.idsender,
        "message": this.msg,
        "files": this.fileSend, 
        "sender_username": this.users.username,
        "sender_image": this.users.image,
        "id": 0,
         "user_id_send": this.users.id,
          "user_id_receive": this.idsender,    
          "date_envois": null,
          "createdAt":null,
          "updatedAt": null,
          "receiver_username": this.sender.username,
         "receiver_image":this.sender.image
    
      }
     
            this.messageService.send(data)
            .subscribe(
              data => {
                console.log(data);
               var newData={
                "sender_username": this.users.username,
                "sender_image": this.users.image,
                "id": data.id,
                "user_id_send": this.users.id,
                "user_id_receive": this.idsender,
                "message": this.msg,
                "files": this.fileSend,
                "date_envois": null,
                "createdAt": data.createdAt,
                "updatedAt": data.createdAt,
                "receiver_username": this.sender.username,
                "receiver_image":this.sender.image
               }
               if(this.message.length==0)
                {
                  window.location.reload();
                }else 
                {
                  this.message.push(newData);
                }
            
              this.msg="";
            
                this.content.scrollToBottom(500).then(() => {
                 
                });
             
              if(data.socketId!=null)
              {
                this.socketService.sendMessage(this.idsender,newData);
              }
             this.fileSend=null;
             this.fileloading=[];
              this.smouthBottom();
              },
              error => {
                 
              
              }
            );
    }
  }
  async handleFileUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = input.files;
  
    if (!files || files.length === 0) {
      return; 
    }
  
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    const maxFileSize = 20 * 1024 * 1024; // 20 Mo
    if (this.fileloading.length >= 7) {
      this.showErrorToast("You can't upload more than 7 pictures.");
      return;
    }
  
    const filePromises: Promise<void>[] = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type;
      const fileSize = file.size;
      if (!allowedTypes.includes(fileType)) {
        this.showErrorToast("The file is not an image");
        continue;
      }
  
      if (fileSize > maxFileSize) {
        this.showErrorToast("The file size is too large");
        continue;
      }
      if (this.fileloading.length >= 7) {
        this.showErrorToast("You can't upload more than 7 pictures.");
        break;
      }
        const filePromise = new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.fileloading.push(reader.result as string);
          resolve();
        };
        reader.onerror = () => {
          this.showErrorToast("Failed to read the file");
          reject(new Error("FileReader error"));
        };
        reader.readAsDataURL(file);
      });
  
      filePromises.push(filePromise);
    }
  
    try {
      await Promise.all(filePromises);
      this.uploadImagesLoading(); 
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  }
  
  deleteImage(index: number) {
    this.fileloading.splice(index, 1); 
  }
  async uploadImagesLoading() {
    const formData = new FormData(); 

    for (let index = 0; index < this.fileloading.length; index++) {
      const image = this.fileloading[index];
      const blob = this.dataURLtoBlob(image);
      const base64Image = await this.blobToBase64(blob);
      try {
        const compressedBase64 = await this.compressImage(base64Image);
        const compressedBlob = this.dataURLtoBlob(compressedBase64);
        
        const mimeString = compressedBlob.type;
        let extension = '';

        // Déterminer l'extension à partir du type MIME
        switch (mimeString) {
          case 'image/jpeg':
            extension = 'jpg';
            break;
          case 'image/png':
            extension = 'png';
            break;
          case 'image/gif':
            extension = 'gif';
            break;
          case 'image/heic':
              extension = 'heic';
              break;
          case 'image/svg+xml':
            extension = 'svg';
            break;
          default:
            extension = 'jpg';
            break;
        }
        formData.append(`images${index}`, compressedBlob, `image${index}.${extension}`);
      } catch (error) {
        console.error("Erreur lors de la compression de l'image", error);
      }
    }


    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    formData.append('type', 'msg'); 
  formData.append('length', this.fileloading.length); 

    
        try {
        
          const data = await this.postsService.uploadImage(formData, users.id).toPromise();
          this.fileSend=data.file[0];
         
          await this.send();
          
          console.log("Upload terminé et données envoyées au backend", data);
        } catch (error) {
          this.showErrorToast("Échec de l'upload");
        } 
}

    async showErrorToast(msg:any) {
      const toast = await this.toastController.create({
        message:msg,  
        duration: 3000,  
        position: 'top',  
        color: 'danger', 
        cssClass: 'custom-toast-class' 
      });
  
      toast.present(); 
    }


    private dataURLtoBlob(dataURL: string): Blob {
      const byteString = atob(dataURL.split(',')[1]);
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
  }

  
async showSuccessToast(msg:any) {
  const toast = await this.toastController.create({
    message:msg,  
    duration: 3000,  
    position: 'top',  
    color: 'success', 
    cssClass: 'custom-toast-class' 
  });

  toast.present(); 
}

compressImage(base64: string): Promise<string> {
  return new Promise((resolve, reject) => {
    this.imageCompress.compressFile(base64, -1, 50, 50).then(
      (result) => {
        resolve(result);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async logScrolling($event:any) {
  // only send the event once
  

  if($event.target.localName != "ion-content") {
 
    return;
  }

  const scrollElement = await $event.target.getScrollElement();

  const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
  const currentScrollDepth = scrollElement.scrollTop;
 
  //console.log(scrollHeight)

 
}
afficherplus()
{
  this.showmore=true;
  var message=this.message;
  this.getData(this.limit+=20);
 
}
direction(id:any)
{
  this.router.navigate([`/profile/${id}`]);

}
     
}
