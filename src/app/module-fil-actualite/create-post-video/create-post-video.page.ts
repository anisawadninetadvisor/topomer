import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/services/module-fil-actualite/posts.service';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { AddPostService } from 'src/app/services/sync/add-post.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-create-post-video',
  templateUrl: './create-post-video.page.html',
  styleUrls: ['./create-post-video.page.scss'], 
}) 
export class CreatePostVideoPage implements OnInit {
  @Output() postUpdated = new EventEmitter<any>();
  baseUrl: string = environment.BASE_URL_file;
  er:any="";
  er_style:any="";
  bg:any=[];
  text:any='';
  bgsend:any=null;
  fileloading:any=null;
  videoSrc:any="";
  constructor(private cdr: ChangeDetectorRef,private imageCompress: NgxImageCompressService,private loadingController: LoadingController,private router:Router,private addPostService:AddPostService,private postsService:PostsService,private toastController: ToastController) { }

  ngOnInit() {
  }
  handleFileUpload(event: Event) {
   
    const input = event.target as HTMLInputElement;
    const files = input.files;
    console.log("je suis ici")
   
    if (files) {
     
      const file = files[0]; 
      const fileType = file.type; 
      const fileSize = file.size;
    
      
      const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/webm', 'video/mpeg'];

        if (!allowedTypes.includes(fileType)) {
          this.showErrorToast("The file is not an video");
          return;
        } else 
        if(fileSize>  20 * 1024 * 1024)
        {
          this.showErrorToast("The file size is too large");
          return;
        } 
        this.videoSrc = URL.createObjectURL(file);
        this.fileloading=file;
        setTimeout(() => {
          const videoElement = document.querySelector('video') as HTMLVideoElement;
          if (videoElement) {
            videoElement.src = this.videoSrc;
            videoElement.load(); 
          }
        }, 500);
        
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
async save()
{
  if(this.text.length<3 || this.text>150)
  {
    this.showErrorToast('Text invalid');
    return;
  }
  if(this.fileloading!=null)
  {
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    const formData = new FormData();
    formData.append('type', 'post'); 
    formData.append('video', this.fileloading, this.fileloading.name);
   

    try {
      const data = await this.postsService.uploadVideo(formData, users.id).toPromise();
      console.log(data)
      await this.sendDataBackend(data, users);
     
      
      console.log("Upload terminé et données envoyées au backend", data);
    } catch (error) {
      this.showErrorToast("Échec de l'upload");
    } 
  }else 
  {
    this.showErrorToast('Video invalid'); 
  }

}
async uploadImages() {
  const loading = await this.loadingController.create({
    message: 'Loading ....',
    spinner: 'crescent',
  });
  await loading.present();

  if (this.text.length < 6) {
    this.er = "The post text must be at least 6 characters long!";
    this.er_style = "border-bottom:1px solid red !important;";
  } else if (this.text.length > 200) {
    this.er = "The post text must not exceed 200 characters!";
    this.er_style = "border-bottom:1px solid red !important;";
  } else {
    this.er = "";
    this.er_style = "";

    // Attendez que l'upload des images se termine avant de fermer le loading
    try {
      await this.save();  // Attendez l'upload complet ici
    } catch (error) {
      console.error("Error during image upload", error);
    }
  }

  // Désactiver le message de chargement après l'upload
  await loading.dismiss();
}
sendDataBackend(images:any,users:any)
{
  
      const extractHashtags = (): string[] => {
      const hashtags = this.text.match(/#\w+/g) || [];
          return hashtags.map((tag:any) => tag.slice(1));
        };

        const hashtags = extractHashtags();
        
  let data ={
    text:this.text,
    user:users.id,
    file_video_image:[images.file],
    tagsusers:hashtags,
    color:"black"
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
        data.post.file_video_image = JSON.stringify(data.post.file_video_image);
       
        this.postUpdated.emit(data.post);
        this.addPostService.setPost(data.post);
        console.log('Redirection en cours...');
     
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/']);

         }, 200); 
        this.showSuccessToast('Your post has been created successfully!');
      
       
      },
      error => {
        
   
      }
    );

}

}
