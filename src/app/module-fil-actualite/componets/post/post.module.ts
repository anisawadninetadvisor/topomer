import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PostComponent } from './post.component';
import { HighlightHashtagsPipe } from 'src/app/highlight-hashtags.pipe';
import { IonicModule } from '@ionic/angular';
import { HeaderPostModule } from './header-post/header-post.module';
import { RouterModule } from '@angular/router';
import { ListepostandfollowersModule } from 'src/app/module-user/listepostandfollowers/listeposandfollowers.module';
@NgModule({
  declarations: [PostComponent,HighlightHashtagsPipe],
  imports: [CommonModule,IonicModule,HeaderPostModule,RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [PostComponent],
  providers: []
})
export class PostModule {}
