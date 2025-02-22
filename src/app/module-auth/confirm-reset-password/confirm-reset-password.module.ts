import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmResetPasswordPageRoutingModule } from './confirm-reset-password-routing.module';

import { ConfirmResetPasswordPage } from './confirm-reset-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmResetPasswordPageRoutingModule
  ],
  declarations: [ConfirmResetPasswordPage]
})
export class ConfirmResetPasswordPageModule {}
