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
  selector: 'app-create-post-image',
  templateUrl: './create-post-image.page.html',
  styleUrls: ['./create-post-image.page.scss'],
})
export class CreatePostImagePage implements OnInit { 
  @Output() postUpdated = new EventEmitter<any>();
  baseUrl: string = environment.BASE_URL_file;
  er:any="";
  er_style:any="";
  constructor(private cdr: ChangeDetectorRef,private imageCompress: NgxImageCompressService,private loadingController: LoadingController,private router:Router,private addPostService:AddPostService,private postsService:PostsService,private toastController: ToastController) { }
  bg:any=[];
  text:any='';
  bgsend:any=null;
  fileloading:any=[];
  ngOnInit() {
  
    this.getAll();
  }
  getAll()
  {
    this.postsService.getBackground()
    .subscribe(
      data => {
        this.bg=data;
      
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
    tagsusers:hashtags
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
  bgChange(item:any)
  {
    console.log(item);
    if(item=='none.png')this.bgsend=null;
    else this.bgsend=item
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

  handleFileUpload(event: Event) {
   
    const input = event.target as HTMLInputElement;
    const files = input.files;
    
   
    if (files && files.length > 0) {
      console.log("je suisi ici");
      const file = files[0]; 
      const fileType = file.type; 
      const fileSize = file.size;
    
      
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','image/webp'];

        if (!allowedTypes.includes(fileType)) {
          this.showErrorToast("The file is not an image");
          return;
        } else 
        if(fileSize>  20 * 1024 * 1024)
        {
          this.showErrorToast("The file size is too large");
          return;
        } else if (this.fileloading.length == 7 || this.fileloading.length>6)
        {
          this.showErrorToast("You can't download the charger more than 7 Pictures.");
          return;
        }
    }

    if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = () => {
              if (this.fileloading && (this.fileloading.length == 7 || this.fileloading.length>6)) {
                this.showErrorToast("You can't download the charger more than 7 Pictures.");
                return; 
            }else 
            {
              this.fileloading.push(reader.result as string);
            }
                
            };

            reader.readAsDataURL(file);
        }
    }
}
  deleteImage(index: number) {
    this.fileloading.splice(index, 1); 
  }
  async uploadImagesLoading() {
    const formData = new FormData(); // Créer un objet FormData unique

    for (let index = 0; index < this.fileloading.length; index++) {
      const image = this.fileloading[index];
      const blob = this.dataURLtoBlob(image);
      const base64Image = await this.blobToBase64(blob);
      try {
        const compressedBase64 = await this.compressImage(base64Image);
        const compressedBlob = this.dataURLtoBlob(compressedBase64);
        
        const mimeString = compressedBlob.type;
        let extension = '';

        // Déterminer l'extension à partir du type MIME
        switch (mimeString) {
          case 'image/jpeg':
            extension = 'jpg';
            break;
          case 'image/png':
            extension = 'png';
            break;
          case 'image/gif':
            extension = 'gif';
            break;
          case 'image/heic':
              extension = 'heic';
              break;
          case 'image/svg+xml':
            extension = 'svg';
            break;
          default:
            extension = 'jpg';
            break;
        }
        formData.append(`images${index}`, compressedBlob, `image${index}.${extension}`);
      } catch (error) {
        console.error("Erreur lors de la compression de l'image", error);
      }
    }


    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    formData.append('type', 'post'); 
  formData.append('length', this.fileloading.length); 
   
    
        try {
          const data = await this.postsService.uploadImage(formData, users.id).toPromise();
          
          await this.sendDataBackend(data, users);
          
          console.log("Upload terminé et données envoyées au backend", data);
        } catch (error) {
          this.showErrorToast("Échec de l'upload");
        } 
}
blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
compressImage(base64: string): Promise<string> {
  return new Promise((resolve, reject) => {
    this.imageCompress.compressFile(base64, -1, 50, 50).then(
      (result) => {
        resolve(result);
      },
      (error) => {
        reject(error);
      }
    );
  });
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
    file_video_image:images.file,
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
        console.log(data.post,'je suis ici');
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
  private dataURLtoBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]; // Obtenir le type MIME
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString }); // Créer le Blob avec le type MIME
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
      await this.uploadImagesLoading();  // Attendez l'upload complet ici
    } catch (error) {
      console.error("Error during image upload", error);
    }
  }

  // Désactiver le message de chargement après l'upload
  await loading.dismiss();
}
compressFile() {
  const MAX_MEGABYTE = 2;
  this.imageCompress
      .uploadAndGetImageWithMaxSize(MAX_MEGABYTE)
      .then(
          (result: string) => {
              console.log(result)
          },
          (result: string) => {
              console.error(
                  "The compression algorithm didn't succed! The best size we can do is",
                  this.imageCompress.byteCount(result),
                  'bytes'
              );
            console.log(result)
          }
      );
}

}