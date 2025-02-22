import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlockagePageRoutingModule } from './blockage-routing.module';

import { BlockagePage } from './blockage.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlockagePageRoutingModule,FooterModule
  ],
  declarations: [BlockagePage]
})
export class BlockagePageModule {}
