import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PostsService } from 'src/app/services/module-fil-actualite/posts.service';
import { PopoverController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

declare var $:any;
@Component({
  selector: 'app-interface-initiale-user',
  templateUrl: './interface-initiale-user.page.html',
  styleUrls: ['./interface-initiale-user.page.scss'],
})
export class InterfaceInitialeUserPage implements OnInit {
  baseUrlFile: string = environment.BASE_URL_file;
  isModalOpen = false;
  constructor(private toastController: ToastController,private popoverController: PopoverController,private postService:PostsService,private router: Router,private route: ActivatedRoute,private profileService:ProfileService,private alertController: AlertController) { } 
  id:any=0;
  posts:any=[];
  user:any={
    nom:"anis",
    prenom:"awadni",
    type:1
  }
  userId:any=0;
  ngOnInit() {
    this.getSubscripe();
    sessionStorage.setItem('path',this.router.url);

    this.id = this.route.snapshot.paramMap.get('id');
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.userId = users.id;
   if(this.id)
   {
    
    this.getData();
   }
  
  }
  getData()
  {
    this.profileService.getByIdUser(this.id)
    .subscribe(
      data => {
        
        console.log(data,'user')
        if(data && !data.error)
        {
          this.user=data;
        }else 
        {
          console.log(data)
        }
      }, 
      error => {
        
      console.log(error);
      }
    );
    this.postService.getByUserProfile(this.id)
    .subscribe(
      data => {
        
        if(data && !data.error)
        {
         console.log(data)
         this.posts=data;
        }else 
        {
          console.log(data)
        }
      },
      error => {
        
      console.log(error)
      }
    );
  }
  redirectMsg()
  {
    
    sessionStorage.setItem('path',this.router.url);
    this.router.navigate(['/message-user-client/'+this.userId+"/"+this.id]);
  }
  isFollowing(id: any): boolean {
    const abonne = sessionStorage.getItem("abonne");
    if (!abonne) {
      return false;
    }
    const abonnes = JSON.parse(abonne);
    return abonnes.some((element: any) => element.shopperId == id);
  }
  async presentUnfollowedAlert(user:any,moi:any,action:any)
{
  const alert = await this.alertController.create({
    header: 'Confirm Action',
    message: 'Are you sure you want to Unfollowed to this person?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',  
        cssClass: 'secondary',
        handler: () => {
         
          return false;
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.inabonne(user,moi,action);
          return true;
        }
      }
    ]
  });

  await alert.present();

}
async presentValidationAlert(user:any,moi:any,action:any) {
  const alert = await this.alertController.create({
    header: 'Confirm Action',
    message: 'Are you sure you want to subscribe to this person?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',  
        cssClass: 'secondary',
        handler: () => {
          console.log('Subscription canceled');
          return false;
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.abonne(user,moi,action);
          return true;
        }
      }
    ]
  });

  await alert.present();
}
abonne(user:any,moi:any,action:any)
{
  var data={
    "user_id": user,
    "user": moi,
    "isAbonne": action

  }
  this.profileService.abonne(data)
    .subscribe(
      data => {
        console.log(data)
          this.getSubscripe();
      },
      error => {
        
      
      }
    );
}
inabonne(user:any,moi:any,action:any)
{
  
  this.profileService.desabonne(user)
    .subscribe(
      data => {
        console.log(data)
        this.getSubscripe();
      },
      error => {
        
      
      }
    );
}
getSubscripe()
{
  const user = sessionStorage.getItem("user");
  const users = user ? JSON.parse(user) : null;
 
  this.profileService.getAbonne(users.id)
  .subscribe(
    data => {
      if(data.length>0) sessionStorage.setItem('abonne',JSON.stringify(data));
      else     sessionStorage.setItem('abonne','');
   
    },
    error => {
      
    
    }
  );
}
verifFile(fileName:any)
{
  let file:any;
  if (fileName.file_video_image!=null && fileName.file_video_image !== "" && fileName.file_video_image !== "{}") {
    file = JSON.parse(fileName.file_video_image);
    
  }else 
  {
    return false;
  }
 file=file[0];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp','webp'];
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
  const extension = file.split('.').pop()?.toLowerCase();
  if (extension && imageExtensions.includes(extension)) {
    return "img";
  } else if (extension && videoExtensions.includes(extension)) {
    
    return "mp4";
  } else {
    return false;
  }
}
changeBorder(id:any)
{
      var block="."+id;
    $(".col-none").css("border-bottom",'0px solid black');
    $(block).css("border-bottom",'2px solid black');
} 
verifFileAll(type:any)
{
  
 var  ret =false;
    for(var i=0;i<this.posts.length;i++)
    {
          if(this.verifFile(this.posts[i])==type)
          {
           
            ret=true;
          }
    }
return ret;}
verifFileAllText()
{
  
 var  ret =false;
    for(var i=0;i<this.posts.length;i++)
    {
          if(this.verifFile(this.posts[i])!="mp4" && this.verifFile(this.posts[i])!="img")
          {
           
            ret=true;
          }
    }
return ret;}
openModal() {
  this.isModalOpen = true;
}

// Fermer la modal
closeModal() {
  this.isModalOpen = false;
}
async presentValidationBlock() {
  const alert = await this.alertController.create({
    header: 'Confirm Action',
    message: 'Are you sure you want to blocked to this person?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',  
        cssClass: 'secondary',
        handler: () => {
          console.log('bloked canceled');
          return false;
        }
      },
      {
        text: 'Yes',
        handler: () => {
         this.block();
          return true;
        }
      }
    ]
  });

  await alert.present();
}
block()
{
  var data={
    user:this.userId, 
    user_block:this.user.id
  }
  console.log(data)
  this.profileService.block(data)
  .subscribe(
    data => {
      
     
      this.showSuccessToast('Block successful!');
      setTimeout(() => {
       window.location.href="/";
      }, 300);
    }, 
    error => {
      
    console.log(error);
    }
  );
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

}


