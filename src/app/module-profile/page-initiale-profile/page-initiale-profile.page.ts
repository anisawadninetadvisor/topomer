import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PostsService } from 'src/app/services/module-fil-actualite/posts.service';
import { PopoverController } from '@ionic/angular';
declare var $ :any;
@Component({
  selector: 'app-page-initiale-profile',
  templateUrl: './page-initiale-profile.page.html',
  styleUrls: ['./page-initiale-profile.page.scss'],
})
export class PageInitialeProfilePage implements OnInit {
  baseUrlFile: string = environment.BASE_URL_file;
  id:any=0;
  posts:any[]=[];
  user:any=[];
  constructor(private popoverController: PopoverController,private postService:PostsService,private router: Router,private route: ActivatedRoute,private profileService:ProfileService,private alertController: AlertController) { }
  ngOnInit() {

   let user =sessionStorage.getItem('user');
   this.user= user ? JSON.parse(user) : null;
   this.id=this.user.id;
   this.getData(); 
  }
  redirect()
  {
  
  }
  getData()
  {
    this.profileService.getByIdUser(this.id)
    .subscribe(
      data => {
        
       
        if(data && !data.error)
        {
          this.user=data;
        }else 
        {
        
        }
      }, 
      error => {
        
      }
    );
    this.postService.getByUserProfile(this.id)
    .subscribe(
      data => {
        if(data && !data.error && !data.message)
        {
        
         this.posts=data;
         
        }else 
        {
        
        }
      },
      error => {
        
      }
    );
  }
  changeBorder(id:any)
{
      var block="."+id;
    $(".col-none").css("border-bottom",'0px solid black');
    $(block).css("border-bottom",'2px solid black');
}
verifFile(fileName:any)
{
  let file:any;
  if (fileName.file_video_image!=null && fileName.file_video_image !== "" && fileName.file_video_image !== "{}") {
    file = JSON.parse(fileName.file_video_image);
    
  }else 
  {
    return false;
  }
 file=file[0];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp','webp'];
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
  const extension = file.split('.').pop()?.toLowerCase();
  if (extension && imageExtensions.includes(extension)) {
    return "img";
  } else if (extension && videoExtensions.includes(extension)) {
    
    return "mp4";
  } else {
    return false;
  }
}

verifFileAll(type:any)
{
  
 var  ret =false;
    for(var i=0;i<this.posts.length;i++)
    {
          if(this.verifFile(this.posts[i])==type)
          {
           
            ret=true;
          }
    }
return ret;}
verifFileAllText()
{
  
 var  ret =false;
    for(var i=0;i<this.posts.length;i++)
    {
          if(this.verifFile(this.posts[i])!="mp4" && this.verifFile(this.posts[i])!="img")
          {
           
            ret=true;
          }
    }
return ret;}

}
