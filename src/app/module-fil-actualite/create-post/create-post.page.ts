import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/services/module-fil-actualite/posts.service';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { AddPostService } from 'src/app/services/sync/add-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit { 
  @Output() postUpdated = new EventEmitter<any>(); // EventEmitter
  baseUrl: string = environment.BASE_URL_file;
  er:any="";
  er_style:any="";
  bgcolor:any="black";
  constructor(private router:Router,private addPostService:AddPostService,private postsService:PostsService,private toastController: ToastController) { }
  bg:any=[];
  text:any='';
  bgsend:any=null; 
  ngOnInit() {
  
    this.getAll();
  }
  getAll()
  {
    this.postsService.getBackground()
    .subscribe(
      data => {
        this.bg=data;
        console.log(data)
      },
      error => {
        
   
      }
    );
  }
  next()
  {
    if (this.text.length < 6) {
      this.er = "The post text must be at least 6 characters long!";
      this.er_style = "border-bottom:1px solid red !important;";
  } else if (this.text.length > 200) {
      this.er = "The post text must not exceed 200 characters!";
      this.er_style = "border-bottom:1px solid red !important;";
  }else 
  {
    this.er = "";
    this.er_style = "";
    let  user=sessionStorage.getItem("user");
    let users = user ? JSON.parse(user) : null;
   
   
    const extractHashtags = (): string[] => {
      // Extraire les hashtags avec le symbole #
      const hashtags = this.text.match(/#\w+/g) || [];
      
      // Retirer le symbole # de chaque hashtag
      return hashtags.map((tag:any) => tag.slice(1));
  };
  
  // Appel de la fonction
  const hashtags = extractHashtags();
  
  let data ={
    text:this.text,
    user:users.id,
    bg:this.bgsend,
    tagsusers:hashtags,
    color:this.bgcolor
};



  
    this.postsService.create(data)
    .subscribe(
      data => {
       
        const user = sessionStorage.getItem("user");
        const users = user ? JSON.parse(user) : null;
       
        data.post.dislikes=0;
        data.post.likes=0;
        data.post.image=users.image;
        data.post.nom=users.nom;
        data.post.prenom=users.prenom;
        console.log(data.post);
        this.postUpdated.emit(data.post);
        this.addPostService.setPost(data.post);
         this.showSuccessToast('Your post has been created successfully!');
         this.router.navigate(['/']);
      },
      error => {
        
   
      }
    );


  }
  
  }
  bgChange(item:any,color:any)
  {
    console.log(item);
    if(item=='none.png')this.bgsend=null;
    else this.bgsend=item
    if(item=='none.png')this.bgcolor="black";
    else this.bgcolor=color
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

}
