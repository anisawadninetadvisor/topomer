import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
declare var $:any;
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.page.html',
  styleUrls: ['./confirm-reset-password.page.scss'],
})
export class ConfirmResetPasswordPage implements OnInit {

  constructor(private profileService:ProfileService,private router: Router) { }
  data:any={
    code:"",
    er:""
  }
  ngOnInit() {
    console.log(sessionStorage.getItem('reset-id'))
  }
  next()
  {
    
          if(this.data.code.length<3)
          {
              
              this.data.er="Enter your code";
          }
          else 
          {
            this.data.er="";
            var data ={
              code:this.data.code,
              id:sessionStorage.getItem('reset-id')
            }
            console.log(data)
            this.profileService.verifCode(data)
        .subscribe(
          data => {
            console.log(data);
            if (data) {
              //    console.log(data); 
              this.router.navigate(['/new-password']);
            }
          },
          error => {
            
          
          }
        );

          }
  }

}
