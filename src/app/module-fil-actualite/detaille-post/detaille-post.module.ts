import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetaillePostPageRoutingModule } from './detaille-post-routing.module';

import { DetaillePostPage } from './detaille-post.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';
import { PostModule } from '../componets/post/post.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetaillePostPageRoutingModule,FooterModule,PostModule,FooterModule
  ],
  declarations: [DetaillePostPage]
})
export class DetaillePostPageModule {}
