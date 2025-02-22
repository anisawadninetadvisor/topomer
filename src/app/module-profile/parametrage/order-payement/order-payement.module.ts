import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPayementPageRoutingModule } from './order-payement-routing.module';

import { OrderPayementPage } from './order-payement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPayementPageRoutingModule
  ],
  declarations: [OrderPayementPage]
})
export class OrderPayementPageModule {}
