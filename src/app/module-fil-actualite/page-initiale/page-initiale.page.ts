import { AfterViewInit, Component, OnInit,ElementRef,Renderer2 } from '@angular/core';
import { PostsService } from 'src/app/services/module-fil-actualite/posts.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { AddPostService } from 'src/app/services/sync/add-post.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-page-initiale',
  templateUrl: './page-initiale.page.html',
  styleUrls: ['./page-initiale.page.scss'],
})

export class PageInitialePage implements AfterViewInit {
  limit :any=10;
  loadingData=false; 
  baseUrlFile: string = environment.BASE_URL_file;
  nodata:any=false;
  constructor(private cdr: ChangeDetectorRef,private renderer: Renderer2,private profileService:ProfileService,private postsService:PostsService,private addPostService:AddPostService,private el: ElementRef) { }
  posts:any=[];
  ngAfterViewInit() {
    setTimeout(() => {
      this.getData(this.limit);
      this.cdr.detectChanges();
      }, 0);
 
    this.addPostService.post$.subscribe(post => {
      if (post) {
        this.posts.unshift(post);
       
      }
    });
    this.getSubscripe();
    const ionContent = this.el.nativeElement.querySelector('ion-content');
    this.renderer.setStyle(ionContent, '--offset-bottom', '0px !important');
  }
  getData(limit:any)
  {
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.postsService.getByUserLike(users.id,limit)
    .subscribe(
      data => {
        let dataTrue=this.posts;
        if(dataTrue.length==data.length && this.limit>10)
        {
          setTimeout(() => {
            this.nodata=true;
            this.loadingData=true;
            this.cdr.detectChanges();
            }, 0);
       
        }else 
        {
          this.posts=data; 
          if(this.limit>10)
            {
              setTimeout(() => {
                this.loadingData=false;
                this.cdr.detectChanges();
                }, 0);
             
            }
        }
       
     
      },
      error => {
      
      
      }
    );
    
  }
  getSubscripe()
  {
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
   
    this.profileService.getAbonne(users.id)
    .subscribe(
      data => {
        if(data.length>0) sessionStorage.setItem('abonne',JSON.stringify(data));
        else     sessionStorage.setItem('abonne','');
     
      },
      error => {
        
      
      }
    );
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
        this.getData(this.limit);
        this.loadingData=true;
        this.cdr.detectChanges();
        }, 0);
      
      }
      
    }
  }
  doRefresh(event: any) {
    this.getData(10);
    setTimeout(() => {
     
      event.target.complete();
    }, 2000);
  }
 
 

}
