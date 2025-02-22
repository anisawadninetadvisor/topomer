import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.page.html',
  styleUrls: ['./edit-name.page.scss'],
})
export class EditNamePage implements OnInit {
  user:any=[];
  fileloading:any=[];
  baseUrlFile: string = environment.BASE_URL_file;
  constructor(private profileService:ProfileService,private toastController: ToastController) { }
  dataUser={
    nom:"",
    prenom:"",
    email:"",
    phone:"",
    image:""
  }
  image:any="/assets/assets/img/profile/profile-1.jpg";
  ngOnInit() {
    
    let user =sessionStorage.getItem('user');
    this.user= user ? JSON.parse(user) : null;
    console.log(this.user)
    this.dataUser.nom=this.user.nom;
    this.dataUser.prenom=this.user.prenom;
    this.dataUser.email=this.user.email;
    this.dataUser.phone=this.user.phone;
    this.image=this.baseUrlFile+""+this.user.image;
    this.dataUser.image=this.user.image;
  }


  handleFileUpload(event: Event) {
   
    const input = event.target as HTMLInputElement;
    const files = input.files;
    
   
    if (files && files.length > 0) {
      const file = files[0]; 
      const fileType = file.type; 
      const fileSize = file.size;
    
      
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif','image/webp'];

        if (!allowedTypes.includes(fileType)) {
          this.showErrorToast("The file is not an image");
          return;
        } else 
        if(fileSize> 1048576)
        {
          this.showErrorToast("The file size is too large");
          return;
        } 
    }

    if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = () => {
              this.image = URL.createObjectURL(file);
              this.fileloading[0]=reader.result as string;
           
                
            };

            reader.readAsDataURL(file);
        }
    }
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
uploadImagesLoading() {
  if(this.fileloading[0] && this.fileloading[0]!=null)
  {


  const formData = new FormData(); 

  this.fileloading.forEach((image: any, index: number) => {
      const blob = this.dataURLtoBlob(image);
      const mimeString = blob.type;
      let extension = '';
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
          case 'image/svg+xml':
              extension = 'svg';
              break;
          default:
              extension = 'jpg'; 
              break;
      }
      formData.append(`images${index}`, blob, `image${index}.${extension}`);
  });

  const user = sessionStorage.getItem("user");
  const users = user ? JSON.parse(user) : null;
  formData.append('type', 'profile'); 
  formData.append('length', this.fileloading.length); 
  console.log(formData)
  this.profileService.uploadImage(formData, users.id).toPromise()
      .then((data:any) => {
        this.image=data.file;
        this.dataUser.image=data.file[0];
        this.updateProfile();
        
      })
      .catch((error:any) => {
         this.showErrorToast("Echec");
      });
    }else 
    {
      this.updateProfile();
    }
}
updateProfile()
{
  let user =sessionStorage.getItem('user');
  this.user= user ? JSON.parse(user) : null;
  this.profileService.updateUser(this.dataUser,this.user.id)
  .subscribe( 
    data => {
     
     this.user.nom=this.dataUser.nom;
     this.user.prenom=this.dataUser.prenom;
     this.user.phone=this.dataUser.phone;
     this.user.image=this.dataUser.image;
     this.image=this.baseUrlFile+""+this.dataUser.image;
     sessionStorage.setItem('user',JSON.stringify(this.user));
    
       this.showSuccessToast('Your profile has been updated successfully!');
     
    },
    error => {
      
 
    }
  );
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
deleteImage(index: number) {
  this.fileloading.splice(index, 1); 
}

}
