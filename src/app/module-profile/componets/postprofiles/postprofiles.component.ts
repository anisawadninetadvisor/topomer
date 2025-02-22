import { Component,AfterViewInit, OnDestroy, OnInit,Input,ElementRef, ViewChild,HostListener , Renderer2} from '@angular/core';
import { environment } from 'src/environments/environment';
import { register } from 'swiper/element/bundle';
import { PostsService } from 'src/app/services/module-fil-actualite/posts.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { SocketService } from 'src/app/services/socket/socket.service';

register();
@Component({
  selector: 'app-postprofiles',
  templateUrl: './postprofiles.component.html',
  styleUrls: ['./postprofiles.component.scss'],
})
export class PostprofilesComponent  implements AfterViewInit, OnDestroy {
  baseUrlFile: string = environment.BASE_URL_file;
  isModalOpen = false;
  @Input() post: any;
  @Input() compte: any;
  file:any=[];
  base_url_file=environment.BASE_URL_file;
  private observer!: IntersectionObserver;
  comment: string = '';
  commentErrorStyle="";
  commentError:any="";
  commentTest:any="";
  listeComment:any=[];
  userId:any=0;
  constructor(private socketService:SocketService,private profileService:ProfileService,private alertController: AlertController,private toastController: ToastController,private postsService:PostsService,private el: ElementRef, private renderer: Renderer2)
  {
 
  }
  
  ngAfterViewInit() {
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.userId=users.id;
    if (this.post.file_video_image!=null && this.post.file_video_image !== "" && this.post.file_video_image !== "{}") {
      this.file = JSON.parse(this.post.file_video_image);
      console.log(this.file[0])
    }
  
    setTimeout(() => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };
  
      this.observer = new IntersectionObserver(this.handleIntersect.bind(this), options);
      const videoElements = this.el.nativeElement.querySelectorAll('video.video');
  
      videoElements.forEach((video: HTMLVideoElement) => {
        video.muted = true;
        this.observer.observe(video);
      });
    }, 0);
  }
  handleIntersect(entries: IntersectionObserverEntry[]) {
   
    entries.forEach(entry => {
      const video = entry.target as HTMLVideoElement;
  
      if (entry.isIntersecting) {
       
        video.play();
      } else {
       
        video.pause();
      }
    });
  }
  

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  openModal() {
    this.getCommanetaire();
    this.isModalOpen = true;
  }
  verifFile(fileName:any)
  {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp','webp'];
    const videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension && imageExtensions.includes(extension)) {
      return "img";
    } else if (extension && videoExtensions.includes(extension)) {
      return "mp4";
    } else {
      return null;
    }
  }

  closeModal() {
    this.isModalOpen = false;
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
color(bg:any)
{
  if(bg!= null && bg!="none.png" && bg!="none.jpg")
  {
    return "color:white";
  }else 
  {
    return "color:black";
  }
}

/*shareViaFacebook() {
  const message = 'Regardez ce contenu!';
  const image = 'URL_DE_VOTRE_IMAGE'; // Remplacez par l'URL de votre image

  this.socialSharing.shareViaFacebook(message, image)
    .then(() => {
      console.log('Partage réussi sur Facebook');
    })
    .catch((error) => {
      console.error('Erreur lors du partage sur Facebook', error);
    });
}

shareViaInstagram() {
  const message = 'Regardez ce contenu!';
  const image = 'URL_DE_VOTRE_IMAGE'; // Remplacez par l'URL de votre image

  this.socialSharing.shareViaInstagram(message, image)
    .then(() => {
      console.log('Partage réussi sur Instagram');
    })
    .catch((error) => {
      console.error('Erreur lors du partage sur Instagram', error);
    });
}

shareViaTikTok() {
  const message = 'Regardez ce contenu!';
  const image = 'URL_DE_VOTRE_IMAGE'; // Remplacez par l'URL de votre image

  this.socialSharing.shareVia('tiktok', message, image)
    .then(() => {
      console.log('Partage réussi sur TikTok');
    })
    .catch((error) => {
      console.error('Erreur lors du partage sur TikTok', error);
    });
}*/

/******* commentaire  */

onEnter(event:any) 
{
  const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
  const value = inputElement.value;
 this.comment=value;
  if (this.comment.length < 3) {
    this.commentError = "Comment is too short. It must be at least 3 characters.";
    this.commentErrorStyle = "border-bottom: 1px solid red !important";
  }
  else
  if (this.comment.length > 60) {
    this.commentError = "Comment is too long. It must not exceed 60 characters.";
    this.commentErrorStyle = "border-bottom: 1px solid red !important";
  }
  else 
  {
   
    this.commentError = "";
    this.commentErrorStyle = "";
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    var data={
      commentaire:this.comment,
      post:this.post.id,
      user:users.id
    }
    console.log(data)
    this.postsService.sendComment(data)
    .subscribe(
      data => {
        if(this.post.user!=users.id) this.socketService.sendNotif(this.post.user);
       if(this.listeComment?.length>0)
       {
        this.listeComment.push(data.comments[0]);
        this.fetchAndSortComments();
       }else 
       {
        this.getCommanetaire();
       }
      
        this.showSuccessToast('Yourcomment has been created');
        inputElement.value="";
        this.post.nbCommentaire+=1;
      },
      error => {
        
      
      }
    );
  }
  
}
getCommanetaire()
{
  this.postsService.getComment(this.post.id)
    .subscribe(
      data => {
      
       this.listeComment=data.records;
       console.log(this.listeComment)
      },
      error => {
        
      
      }
    );
}

async fetchAndSortComments() {
  try {
  
    this.listeComment.sort((a:any, b:any) => b.commentId - a.commentId);
    console.log(this.listeComment)
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires:', error);
  }
}
async showSuccessToast(msg:any) {
  const toast = await this.toastController.create({
    message:msg,  
    duration: 1500,  
    position: 'top',  
    color: 'success', 
    cssClass: 'custom-toast-class' 
  });

  toast.present(); 
}
    likes()
    {
      /**** avant post */
      if(this.post.likes==true)
        {
          this.post.likes=false;
          if(this.post.nbJaime>0)this.post.nbJaime-=1;
        }
      else {
        this.post.likes=true;
        this.post.nbJaime+=1;
      }
      if(this.post.dislikes==true)
        {
          this.post.dislikes=false;
          if(this.post.nbDislikes>0)this.post.nbDislikes-=1;
          
        }
      this.post.dislikes=false;
      /******* */


      const user = sessionStorage.getItem("user");
      const users = user ? JSON.parse(user) : null;
      let data ={
        "post": this.post.id,
        "user": users.id,
        "likes": true,
        "dislikes": false
    
      }
      this.postsService.likes(data)
      .subscribe(
        data => {
          if(this.post.user!=users.id) this.socketService.sendNotif(this.post.user);
         
        },
        error => {

        }
      );

    }

    dislikes()
    {
         /**** avant post */
      if(this.post.dislikes==true)
        {
          this.post.dislikes=false;
          if(this.post.nbDislikes>0)this.post.nbDislikes-=1;
        }
      else {
        this.post.dislikes=true;
        this.post.nbDislikes+=1;
      }
      if(this.post.likes==true)
        {
          this.post.likes=false;
          if(this.post.nbJaime>0)this.post.nbJaime-=1;
        }
      this.post.likes=false;

      /****** */
      const user = sessionStorage.getItem("user");
      const users = user ? JSON.parse(user) : null;
      let data ={
        "post": this.post.id,
        "user": users.id,
        "likes": false,
        "dislikes":true
    
      }
      this.postsService.likes(data)
      .subscribe(
        data => {
          if(this.post.user!=users.id) this.socketService.sendNotif(this.post.user);
        },
        error => {

        }
      );

    }

    dynamicLink(id:any) {
     
      if(id==this.userId)
      {
       
        return "/page-initiale-profile";
      }else 
      {
     
        return `/profile/${id}`;
      }
    
    }
    fermerModal(){
      this.isModalOpen = false;
    }

   
}
