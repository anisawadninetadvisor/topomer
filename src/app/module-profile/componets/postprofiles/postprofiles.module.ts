import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PostprofilesComponent } from './postprofiles.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [PostprofilesComponent],
  imports: [CommonModule,IonicModule,RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  exports: [PostprofilesComponent],
  providers: []
})
export class PostprofilesModule {}