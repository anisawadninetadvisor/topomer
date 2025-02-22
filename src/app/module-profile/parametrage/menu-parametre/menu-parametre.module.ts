import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuParametrePageRoutingModule } from './menu-parametre-routing.module';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';
import { MenuParametrePage } from './menu-parametre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuParametrePageRoutingModule,FooterModule
  ],
  declarations: [MenuParametrePage]
})
export class MenuParametrePageModule {}
