import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPostComponent } from './header-post.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderPostComponent],
  imports: [CommonModule,IonicModule,RouterModule],
  schemas: [],
  exports: [HeaderPostComponent],
  providers: []
})
export class HeaderPostModule {}