import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { ToastController } from '@ionic/angular';
declare var $: any;
import { Router } from '@angular/router';


@Component({
  selector: 'app-tags-management',
  templateUrl: './tags-management.page.html',
  styleUrls: ['./tags-management.page.scss'],
})
export class TagsManagementPage implements OnInit {

  constructor(private router: Router,private toastController: ToastController,private profileService : ProfileService) { }
  tags:any=[];
  ngOnInit() {
    this.getData();
  }
  getData()
  {
    this.profileService.getTags()
    .subscribe(
      data => {
        this.tags=data;
      },
      error => {
      }
    );
  }
  addchoice(id:any,i:any)
  {
      if(this.tags[i].choice==true)
      {
        this.tags[i].choice=false;
      }else 
      {
        this.tags[i].choice=true;
      }
  }
  updateTags()
  {
 
    let tabs:any=[];
      this.tags.forEach((element:any) => {
        if(element.choice==true)
        {
          var data={
            title:element.title,
            id:element.id
          }
           tabs.push(data);
        }
      });
      console.log(tabs.length)
     if(tabs.length>0)
     {
      let data={
        tags:tabs
      }
      let  user=sessionStorage.getItem("user");
      let users = user ? JSON.parse(user) : null;
    
      this.profileService.updateTags(data,users.id)
      .subscribe(
        data => {
          console.log(data)
          setTimeout(() => {
           this.router.navigate(['/']);
          }, 200); 
         
        },
        error => {
         
        
        }
      );
     }else 
     {
       this.showErrorToast('Choose tags to enhance the performance of the news feed. ')
     }
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
