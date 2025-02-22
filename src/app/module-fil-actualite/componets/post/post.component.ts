import { Component,AfterViewInit, OnDestroy, OnInit,Input,ElementRef, ViewChild,HostListener , Renderer2} from '@angular/core';
import { environment } from 'src/environments/environment';
import { register } from 'swiper/element/bundle';
import { PostsService } from 'src/app/services/module-fil-actualite/posts.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { GestureController, Gesture, GestureDetail } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare var $:any;
import { Share } from '@capacitor/share';

register();
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent  implements AfterViewInit, OnDestroy {
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
swipedeclare:any=false;
touchStartX: number = 0;
touchEndX: number = 0;
showLike: boolean = false;
showDislike: boolean = false;
  constructor(private router: Router,private route: ActivatedRoute,private actionSheetController: ActionSheetController,/*private socialSharing: SocialSharing*/private gestureCtrl: GestureController,private socketService:SocketService,private profileService:ProfileService,private alertController: AlertController,private toastController: ToastController,private postsService:PostsService,private el: ElementRef, private renderer: Renderer2)
  {
 
  }
  startSwipe(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX; // Position initiale du toucher
  }

  endSwipe(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX; // Position finale du toucher
    this.detectSwipe();
  }

  detectSwipe() {
    const swipeThreshold = 50; // Distance minimum pour valider un swipe

    if (this.touchStartX - this.touchEndX > swipeThreshold) {   this.triggerLikeAnimation();
    } else if (this.touchEndX - this.touchStartX > swipeThreshold) {
      this.triggerDsLikeAnimation();
    }
  }
  triggerLikeAnimation() {
    this.showLike = true;
    if(!this.post.likes==true)
      {
        this.likes();
      }
   
    setTimeout(() => {
      this.showLike = false; 
    }, 1000);
  }
  triggerDsLikeAnimation() {
  
    if(!this.post.dislikes==true)
      {
        this.dislikes();
      }
      $(document).ready(function() {
        let width = $(".post-div-tr-initial").width();
        let centerwidth = width / 2;
        
        let step = centerwidth; 
        $(".post-div-tr-initial").css("opacity",'1');
        let interval = setInterval(function() {
            step+=5;
            $(".post-div-tr-initial .post-div-tr").css("background", `linear-gradient(to right, transparent ${centerwidth}px, red ${step}px, transparent ${width}px)`);
            
            if (step >= width) {
                clearInterval(interval);
            }
        }, 0.5); 
    });
    setTimeout(() => {
      this.showDislike = true;
    }, 100);
    setTimeout(() => {
      this.showDislike = false; 
    }, 3000);
    setTimeout(() => {
      $(".post-div-tr-initial").css("opacity",'0.4');
    }, 4000);
  }
  ngAfterViewInit() {




   
  
  
  
  
  
    if(this.route.snapshot.paramMap.get('id'))
    {
      this.swipedeclare=true;
    }
   
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.userId=users.id;
    if (this.post.file_video_image!=null && this.post.file_video_image !== "" && this.post.file_video_image !== "{}") {
      this.file = JSON.parse(this.post.file_video_image);
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
    this.detected()
  }
  detected()
  {
    const swipeArea = document.getElementById('swipeArea');

    if (swipeArea) {
      const gesture: Gesture = this.gestureCtrl.create({
        el: swipeArea,
        gestureName: 'swipe',
        onMove: (event: GestureDetail) => this.onSwipeMove(event),
      });

      gesture.enable();
    } else {
     
    }

  }
  onSwipeMove(event: GestureDetail) {
    const { deltaX, deltaY } = event;
    const angle = Math.atan2(deltaY, deltaX) * (360 / Math.PI);
    if (angle > 10 && angle > 60) {
      console.log("Swipe diagonal (/) detected!");
      var  postElement = document.querySelector('.post-like');
      console.log(angle)
      if(postElement)
      {
     // postElement.classList.add('swiped');
      }
     
    }
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
          console.log(data)
          if(this.post.user!=users.id) this.socketService.sendNotif(this.post.user);
         
        },
        error => {
            console.log(error)
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
          console.log(data)
          if(this.post.user!=users.id) this.socketService.sendNotif(this.post.user);
        },
        error => {
          console.log(error)
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

    async partagerVideoEtTexte() {
    
      const message = this.post.text;

      var videoUrl="";
      if(this.file[0])videoUrl = this.baseUrlFile+this.file[0];
      console.log(videoUrl)
      
      if(this.file[0])
      {
        await Share.share({
          title: 'Topomer',
          text: "@Topomer,"+message,
          url: videoUrl,
          dialogTitle: 'Share'
        });
      }else 
      {
        await Share.share({
          title: 'Topomer',
          text: "@Topomer,"+message,
          url: "https://topomer.com",
          dialogTitle: 'Share'
        });
      }
    
        
    }



    async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: '',
        cssClass: 'action-sheet',
        buttons: [
          {
            text: 'Share',
            icon: 'share',
            cssClass: 'action-sheet-share',  // Classe CSS pour Share
            data: 10,
            handler: () => {
              this.partagerVideoEtTexte();
            }
          },
          {
            text: 'Signal',
            icon: 'warning',
            cssClass: 'action-sheet-signale',
            role: 'single',
            handler: () => {
             this.signale();
            }
          }
        ]
      });
      await actionSheet.present();
    
      const { role, data } = await actionSheet.onDidDismiss();
      console.log('onDidDismiss resolved with role and data', role, data);
    }

    signale()
    {
        this.presentPrompt();
    }
    async presentPrompt() {
      const alert = await this.alertController.create({
        header: 'Why are you reporting this post?',
        inputs: [
          {
            name: 'name',
            type: 'text',
            placeholder: ''
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'OK',
            handler: (data) => {
              console.log('Your name is', data.name);
            }
          }
        ]
      });
    
      await alert.present();
    }
    linkredirect(id:any)
    {
      if(!this.route.snapshot.paramMap.get('id'))
      {
        this.router.navigate([`/detaille-post/${id}`]);
      }
      
    }    
    
    

    

   
}
