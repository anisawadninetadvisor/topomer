import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';
import { EditPasswordPageRoutingModule } from './edit-password-routing.module';

import { EditPasswordPage } from './edit-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPasswordPageRoutingModule,FooterModule
  ],
  declarations: [EditPasswordPage]
})
export class EditPasswordPageModule {}
