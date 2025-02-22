import { Component, OnInit } from '@angular/core';
declare var $: any;
import { ToastController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choice-type',
  templateUrl: './choice-type.page.html',
  styleUrls: ['./choice-type.page.scss'],
})
export class ChoiceTypePage implements OnInit {

  constructor(private router: Router,private toastController: ToastController,private profileService:ProfileService) { }
  type={
    type:0
  }
  ngOnInit() {
   
  }
  changeType(type:any)
  {
    $(".p1").css("background",'white');
    $(".p1").css("color",'black');
    $(".p2").css("background",'white');
    $(".p2").css("color",'black');
    if(type==1)
    {
       this.type.type=1;
       $(".p1").css("color",'white');
       $(".p1").css("background",'black');
    }
    if(type==2)
      {
         this.type.type=2;
         $(".p2").css("color",'white');
         $(".p2").css("background",'black');
      }
  }
  choice()
  {
    if(this.type.type== 1 || this.type.type==2)
    {
       let  user=sessionStorage.getItem("user");
       let users = user ? JSON.parse(user) : null;
       users.type=this.type.type;
     
       let tags=JSON.parse(users.tags);
        this.updateUser(users);
       
      if(tags==null || Object.keys(tags).length === 0 || tags.length === 0)
       {
        setTimeout(() => {
          this.router.navigate(['/tags-management']);
        }, 1000); 
       }else 
       {
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000); 
       }
   
    }else 
    {
      this.showErrorToast("Please select your account type");
    }
  }
  updateUser(users:any)
  {
    
    let data={
      type:users.type
    }
    this.profileService.updateType(data,users.id)
    .subscribe(
      data => {
       console.log(data);
        
      },
      error => {
       
      
      }
    );
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

  

}
