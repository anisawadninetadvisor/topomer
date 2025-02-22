import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {

  constructor(private profileService:ProfileService,private router: Router) { }
  data={
    password:'',
    confirm_password:'',
    er:''
  }
  ngOnInit() {
  }
  next()
  {
    if (this.data.password.length < 6) {
      this.data.er = "Password must be at least 6 characters long.";
    } else if (this.data.password.length > 30) {
      this.data.er = "Password must not exceed 30 characters.";
    } else if (this.data.password !== this.data.confirm_password) {
      this.data.er = "Passwords do not match.";
    } else {
      this.data.er = ""; 
      var data={
            password:this.data.password,
            id:sessionStorage.getItem('reset-id')
      }
      this.profileService.newpassword(data)
      .subscribe(
        data => {
          console.log(data);
          if (data.user) {
            sessionStorage.setItem('user',JSON.stringify(data.user));
            let  user=sessionStorage.getItem("user");
            let users = user ? JSON.parse(user) : null;
            let tags=JSON.parse(users.tags);
        
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
          }
        },
        error => {
          
        
        }
      );
    }
  }

}
