import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypePostPageRoutingModule } from './type-post-routing.module';

import { TypePostPage } from './type-post.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypePostPageRoutingModule,FooterModule
  ],
  declarations: [TypePostPage]
})
export class TypePostPageModule {}
