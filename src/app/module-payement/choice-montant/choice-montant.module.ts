import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoiceMontantPageRoutingModule } from './choice-montant-routing.module';

import { ChoiceMontantPage } from './choice-montant.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoiceMontantPageRoutingModule,FooterModule
  ],
  declarations: [ChoiceMontantPage]
})
export class ChoiceMontantPageModule {}
