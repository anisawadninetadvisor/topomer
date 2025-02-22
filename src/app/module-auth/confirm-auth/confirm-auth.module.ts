import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmAuthPageRoutingModule } from './confirm-auth-routing.module';

import { ConfirmAuthPage } from './confirm-auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmAuthPageRoutingModule
  ],
  declarations: [ConfirmAuthPage]
})
export class ConfirmAuthPageModule {}
