import { AfterViewInit, Component, OnInit,ElementRef,Renderer2 } from '@angular/core';
import { PostsService } from 'src/app/services/module-fil-actualite/posts.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { AddPostService } from 'src/app/services/sync/add-post.service';
import { ChangeDetectorRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-page-initiales-partenaires',
  templateUrl: './page-initiales-partenaires.page.html',
  styleUrls: ['./page-initiales-partenaires.page.scss'],
})

export class PageInitialesPartenairesPage implements OnInit {

  limit :any=10;
  loadingData=false; 
  baseUrlFile: string = environment.BASE_URL_file;
  nodata:any=false;
  loading:any=false;
  constructor(private loadingCtrl: LoadingController,private cdr: ChangeDetectorRef,private renderer: Renderer2,private profileService:ProfileService,private postsService:PostsService,private addPostService:AddPostService,private el: ElementRef) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circles',
      duration: 3000
    });

    await loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.loading=true;
    }, 2000);
  }

  async logScrolling($event: any) {
  
    // Vérifier si l'événement provient de l'élément ion-content
    if ($event.target.localName !== "ion-content") {
      return;
    }
  
    // Obtenir l'élément de défilement réel
    const scrollElement = await $event.target.getScrollElement();
  
    // Calculer la hauteur totale de l'élément de défilement et la hauteur visible
    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    const currentScrollDepth = scrollElement.scrollTop;
  
  
    // Calculer le pourcentage du défilement
    const scrollPercentage = (currentScrollDepth / scrollHeight) * 100;
  
    // Vérifier si le défilement a atteint ou dépassé 50%
    if (scrollPercentage >= 90) {
      if(this.loadingData==false)
      {
        setTimeout(() => {
        this.limit+=10;
        
        this.loadingData=true;
        this.cdr.detectChanges();
        }, 0);
      
      }
      
    }
  }
  doRefresh(event: any) {
  
    setTimeout(() => {
     
      event.target.complete();
    }, 2000);
  }

}
