import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-liste-followers-user',
  templateUrl: './liste-followers-user.page.html',
  styleUrls: ['./liste-followers-user.page.scss'],
})
export class ListeFollowersUserPage implements OnInit {
  baseUrlFile=environment.BASE_URL_file;
  constructor(private router: Router,private profileService:ProfileService,private route: ActivatedRoute,private alertController: AlertController) { }
  liste : any=[];
  id:any=0;
  userId:any=0;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.userId = users.id;
    if(this.id!=0)
    {
      this.getData();
    }
  
  }
  getData()
  {
    this.profileService.getFollowersUser(this.id)
    .subscribe(
      data => {
       
        if(data)
        {
          console.log(data)
            this.liste=data;
        }
      },
      error => {
        
      
      }
    );
  }
  isFollowing(id: any): boolean {
    const abonne = sessionStorage.getItem("abonne");
    if (!abonne) {
      return false;
    }
    const abonnes = JSON.parse(abonne);
    return abonnes.some((element: any) => element.shopperId == id);
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
    console.log("je suis ici")
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
          
        console.log(error)
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
dynamicLink(idUser:any) {
  console.log(idUser)
  if(idUser==this.userId)
  {
    this.router.navigate(['/page-initiale-profile']);
  
  }else 
  {
    
    this.router.navigate(['/profile', idUser]);
 
  }

}
}
