import { Component, OnInit,Input } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
@Component({
  selector: 'app-listepostandfollowers',
  templateUrl: './listepostandfollowers.component.html',
  styleUrls: ['./listepostandfollowers.component.scss'],
})
export class ListepostandfollowersComponent  implements OnInit {

  constructor(private profileService:ProfileService) { }
  dashbord:any=[];
  @Input() id:any;
  ngOnInit() {
    this.getData();
  }
  getData()
  {
    this.profileService.getInteractions(this.id)
    .subscribe(
      data => {
        
       
        if(data)
        {
          this.dashbord=data;
          console.log(this.dashbord,'data')
        }
      },
      error => {
        
      
      }
    );
  }

}
