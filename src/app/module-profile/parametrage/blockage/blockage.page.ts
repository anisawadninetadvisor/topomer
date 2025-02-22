import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-blockage',
  templateUrl: './blockage.page.html',
  styleUrls: ['./blockage.page.scss'],
})
export class BlockagePage implements OnInit {
  baseUrlFile: string = environment.BASE_URL_file;

  constructor(private profileService:ProfileService) { }
  id:any=0;
  liste:any=[];
  ngOnInit() { 
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.id = users.id;
    this.getData();
  }
  getData()
  {
    this.profileService.blockListe(this.id)
    .subscribe(
      data => {
        
       
        if(data && !data.error)
        {
          this.liste=data;
         
        }else 
        {
          
        }
      }, 
      error => {
        
      console.log(error);
      }
    );
  }

}
