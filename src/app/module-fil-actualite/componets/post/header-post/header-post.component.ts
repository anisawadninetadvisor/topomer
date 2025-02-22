import { Component, OnInit,Input } from '@angular/core';
import { PostsService } from 'src/app/services/module-fil-actualite/posts.service';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-post',
  templateUrl: './header-post.component.html',
  styleUrls: ['./header-post.component.scss'],
})
export class HeaderPostComponent  implements OnInit {
  @Input() postNom: any;
  @Input() postPrenom: any;
  @Input() postcreatedAt: any;
  @Input() postUser: any;
  @Input() postImage: any;
  userId:any=0;
  baseUrlFile: string = environment.BASE_URL_file;
  constructor(private profileService:ProfileService,private alertController: AlertController) { }

  ngOnInit() {
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.userId=users.id;
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
      
        this.getSubscripe();
      },
      error => {
        
      
      }
    );
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
isFollowing(id: any): boolean {
  const abonne = sessionStorage.getItem("abonne");
  if (!abonne) {
    return false;
  }
  const abonnes = JSON.parse(abonne);
  return abonnes.some((element: any) => element.shopperId == id);
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
dynamicLink() {
  if(this.postUser==this.userId)
  {
    return "/page-initiale-profile";
  }else 
  {
    return `/profile/${this.postUser}`;
  }

}

}
