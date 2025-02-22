import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterfaceInitialePageRoutingModule } from './interface-initiale-routing.module';

import { InterfaceInitialePage } from './interface-initiale.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterfaceInitialePageRoutingModule,FooterModule
  ],
  declarations: [InterfaceInitialePage]
})
export class InterfaceInitialePageModule {}
