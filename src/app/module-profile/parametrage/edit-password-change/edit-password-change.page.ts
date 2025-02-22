import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/module-auth/profile.service';

@Component({
  selector: 'app-edit-password-change',
  templateUrl: './edit-password-change.page.html',
  styleUrls: ['./edit-password-change.page.scss'],
})
export class EditPasswordChangePage implements OnInit {
  dataUser={
    new_password:"",
    password:"",
    repeat_password:""
   
  }
  dataStyle={
    new_password:false,
    password:false,
    repeat_password:false
  }
  dataAlert={
    new_password:"",
    password:"",
    repeat_password:""
  }
  constructor(private profileService:ProfileService,private toastController: ToastController) { }

  user:any=[];
  ngOnInit() {
    let user =sessionStorage.getItem('user');
    this.user= user ? JSON.parse(user) : null;
    console.log(this.user,'user')
  }
  changePassword()
  {
        if(this.dataUser.password=="" || this.dataUser.password != this.user.password)
        {
          
            this.dataStyle.password=true;
            this.dataAlert.password="Password incrorrect";
        }else 
        {
          this.dataStyle.password=false;
          this.dataAlert.password="";
        }
        if(this.dataUser.new_password=="" || this.dataUser.new_password.length<6 || this.dataUser.new_password.length>30)
        {
          this.dataStyle.new_password=true;
          this.dataAlert.new_password = "Password must contain a minimum of 6 characters and a maximum of 30.";
        }else 
        {
          this.dataStyle.new_password=false;
          this.dataAlert.new_password = "";
        }
        if(this.dataUser.repeat_password!=this.dataUser.new_password)
        {
          this.dataStyle.repeat_password=true;
          this.dataAlert.repeat_password = "Passwords do not match.";
        }else 
        {
          this.dataStyle.repeat_password=false;
          this.dataAlert.repeat_password = "";
        }

        if(!this.dataStyle.new_password && !this.dataStyle.password && !this.dataStyle.repeat_password)
        {
          var data={
            password:this.dataUser.password,
            newPassword:this.dataUser.new_password,
          }
          this.profileService.updatePassword(data,this.user.id)
          .subscribe(
            data => {
              
              if(data && data.message)
              {
                
                this.user.password=this.dataUser.new_password;
                sessionStorage.setItem('user',JSON.stringify(this.user));
                this.dataUser.password="";
                this.dataUser.new_password="";
                this.dataUser.repeat_password="";
                this.showSuccessToast('Your Password has been updated successfully!');
              }
              
             
            },
            error => {
              
         
            }
          );
        }

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
