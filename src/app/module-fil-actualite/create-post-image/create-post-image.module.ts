import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePostImagePageRoutingModule } from './create-post-image-routing.module';

import { CreatePostImagePage } from './create-post-image.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePostImagePageRoutingModule,FooterModule
  ],
  declarations: [CreatePostImagePage]
})
export class CreatePostImagePageModule {}
