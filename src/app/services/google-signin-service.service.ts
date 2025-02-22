import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { ProfileService } from './module-auth/profile.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


declare global {
  interface Window {
    google: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleSigninService {
 user :any;
  constructor(private router: Router,private profileService:ProfileService,private toastController: ToastController) {

   }
  public initializeGoogleSignin(clientId: string, callback: (response: any) => void) {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: callback,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'outline', size: 'large' }
      );
    }
  }

  public handleCredentialResponse(response: any) {
    this.user = jwtDecode(response.credential);
  
    let userData:any={userData:{
        nom:this.user.family_name,
        prenom:this.user.given_name,
        image:this.user.picture,
        email:this.user.email

    }}
   
    this.profileService.loginGoogle(userData)
    .subscribe(
      data => {
       
        if(data)
        {
          sessionStorage.setItem('user',JSON.stringify(data.user));
          let  user=sessionStorage.getItem("user");
          let users = user ? JSON.parse(user) : null;
          let tags=JSON.parse(users.tags);
          this.showSuccessToast();
          if (data.user.type == null || (data.user.type != 1 && data.user.type != 2)) {
           
          setTimeout(() => {
              this.router.navigate(['/choice-type']);
            }, 1000);
         
          } else if(tags==null || Object.keys(tags).length === 0 || tags.length === 0)
            {
             setTimeout(() => {
               this.router.navigate(['/tags-management']);
             }, 1000); 
            } 
          else {
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
          }
         console.log(data)
        }else 
        {
          console.log('datya',data)
        }
     
      },
      error => {
      console.log("error",error)
      }
    );
   
  }
  public connexion(response: any) {
    this.user = response;
  
    let userData:any={userData:{
        nom:this.user.family_name,
        prenom:this.user.given_name,
        image:this.user.picture,
        email:this.user.email

    }}
   
    this.profileService.loginGoogle(userData)
    .subscribe(
      data => {
       
        if(data)
        {
          sessionStorage.setItem('user',JSON.stringify(data.user));
          let  user=sessionStorage.getItem("user");
          let users = user ? JSON.parse(user) : null;
          let tags=JSON.parse(users.tags);
          this.showSuccessToast();
          if (data.user.type == null || (data.user.type != 1 && data.user.type != 2)) {
           
          setTimeout(() => {
              this.router.navigate(['/choice-type']);
            }, 1000);
         
          } else if(tags==null || Object.keys(tags).length === 0 || tags.length === 0)
            {
             setTimeout(() => {
               this.router.navigate(['/tags-management']);
             }, 1000); 
            } 
          else {
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
          }
         console.log(data)
        }else 
        {
          console.log('datya',data)
        }
     
      },
      error => {
      console.log("error",error)
      }
    );
   
  }
  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Successful login',  
      duration: 3000,  
      position: 'top',  
      color: 'success', 
      cssClass: 'custom-toast-class' 
    });

    toast.present(); 
  }
}
