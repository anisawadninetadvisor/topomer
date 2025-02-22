import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePostVideoPageRoutingModule } from './create-post-video-routing.module';

import { CreatePostVideoPage } from './create-post-video.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePostVideoPageRoutingModule,FooterModule
  ],
  declarations: [CreatePostVideoPage]
})
export class CreatePostVideoPageModule {}
