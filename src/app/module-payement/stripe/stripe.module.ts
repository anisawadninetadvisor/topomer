import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StripePageRoutingModule } from './stripe-routing.module';

import { StripePage } from './stripe.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StripePageRoutingModule,FooterModule
  ],
  declarations: [StripePage]
})
export class StripePageModule {}
