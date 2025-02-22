import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
declare var $:any;
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(private profileService:ProfileService,private router: Router) { }
  data:any={
    email:"",
    er:""
  }
  ngOnInit() {

  }
  next()
  {
    
          if(this.data.email.length<3)
          {
              this.data.er="Enter your email or username or phone";
          }
          else 
          {
            this.data.er="";
            var data ={
              email:this.data.email
            }
            this.profileService.resetpassword(data)
        .subscribe(
          data => {
        
            if (!data.error) {
           
                 sessionStorage.setItem('reset-id',data.data);
                
               this.router.navigate(['/confirm-reset-password']);
            }else 
            {
              this.data.er="User does not exist";
            }
          },
          error => {
            
          
          }
        );

          }
  }

}
