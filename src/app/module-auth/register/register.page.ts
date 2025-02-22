import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user={
    email:"",
    phone:"",
    password:"",
    username:"",
    nom:"",
    prenom:"",
    type:null
  }
  userVerif={
    email:"",
    phone:"",
    password:"",
    username:"",
    nom:"",
    prenom:""
  }
  userVerifstyle={
    email:"",
    phone:"",
    password:"",
    username:"",
    nom:"",
    prenom:""
  }
  constructor(private router: Router,private profileService:ProfileService,private toastController: ToastController) { }

  ngOnInit() {
  }
  sendData()
  {
    this.validateUser();
      if(this.userVerif.email=="" && this.userVerif.username=="" && this.userVerif.phone=="" && this.userVerif.password=="" && this.userVerif.nom=="" && this.userVerif.prenom=="")
      {
    
        this.profileService.create(this.user)
        .subscribe(
          data => {
            console.log(data);
            if (data) {
              if (data.success) {
                    this.showSuccessToast();
                    this.login();
              } else if(data.error)
              {
                this.showErrorToast(data.error);
              }
              
            }
          },
          error => {
            this.showErrorToast("An error occurred, please repeat the registration.");
          
          }
        );
      }
  }
login()
{
  let user={
    email:this.user.email,
    password:this.user.password
  }
  this.profileService.login(user)
  .subscribe(
    data => {
    
      if (data) {
       if(data.user)
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
         
          } else if(Object.keys(tags).length === 0 || tags.length === 0)
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
       
       }
      }else 
      {
        this.showErrorToast("please try again later.");
      }
    },
    error => {
      this.showErrorToast("please try again later.");
      this.router.navigate(['/login']);
    }
  );
}
  validateUser() {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.user.email.length < 4 || this.user.email.length > 100) {
      this.userVerif.email = "Email incorrect";
      this.userVerifstyle.email = "border-bottom:1px solid red !important";
    } else if (!this.user.email.includes('@')) {
      this.userVerif.email = "Email must contain '@'";
      this.userVerifstyle.email = "border-bottom:1px solid red !important";
    } else if (!emailRegex.test(this.user.email)) {
      this.userVerif.email = "Email format is incorrect";
      this.userVerifstyle.email = "border-bottom:1px solid red !important";
    } else {
      let dataEmail={
        email:this.user.email
      }
      this.profileService.VerifEmailExiste(dataEmail)
      .subscribe(
        data => {
          console.log(data);
          if (data) {
            if (data.message != true) {
              this.userVerif.email = "";
              this.userVerifstyle.email = "";
            } else {
              this.userVerif.email = "This email address already exists";
              this.userVerifstyle.email = "border-bottom:1px solid red !important";
            }
          }
        },
        error => {
          
        
        }
      );
    }
  
    // Validate phone
    const phoneRegex = /^[0-9]{6,15}$/;
    if (!phoneRegex.test(this.user.phone)) {
      this.userVerif.phone = "Phone number must be between 6 and 15 digits";
      this.userVerifstyle.phone = "border-bottom:1px solid red !important";
    } else {
      this.userVerif.phone = "";
      this.userVerifstyle.phone = "";
    }
  
    // Validate password
    if (this.user.password.length < 8 || this.user.password.length > 20) {
      this.userVerif.password = "Password must be between 8 and 20 characters";
      this.userVerifstyle.password = "border-bottom:1px solid red !important";
    } else {
      this.userVerif.password = "";
      this.userVerifstyle.password = "";
    }
  
    // Validate username
    if (this.user.username.length < 3 || this.user.username.length > 30) {
      this.userVerif.username = "Username must be between 3 and 30 characters";
      this.userVerifstyle.username = "border-bottom:1px solid red !important";
    } else {
      let dataUsername={
        username:this.user.username
      }
      this.profileService.VerifUserNameExiste(dataUsername)
      .subscribe(
        data => {
          console.log(data);
          if (data) {
            if (data.message != true) {
              this.userVerif.username = "";
              this.userVerifstyle.username = "";
            } else {
              this.userVerif.username  = "This username already exists";
              this.userVerifstyle.username = "border-bottom:1px solid red !important";
            }
          }
        },
        error => {
          
        
        }
      );
   
    }
    // Validate nom (last name)
    if (this.user.nom.length < 1 || this.user.nom.length > 50) {
      this.userVerif.nom = "Last name must be between 1 and 50 characters";
      this.userVerifstyle.nom = "border-bottom:1px solid red !important";
    } else {
      this.userVerif.nom = "";
      this.userVerifstyle.nom = "";
    }
      if (this.user.prenom.length < 1 || this.user.prenom.length > 50) {
      this.userVerif.prenom = "First name must be between 1 and 50 characters";
      this.userVerifstyle.prenom = "border-bottom:1px solid red !important";
    } else {
      this.userVerif.prenom = "";
      this.userVerifstyle.prenom = "";
    }
  }

  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Compte is created',  
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
