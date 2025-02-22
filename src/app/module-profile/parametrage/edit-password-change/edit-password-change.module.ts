import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPasswordChangePageRoutingModule } from './edit-password-change-routing.module';

import { EditPasswordChangePage } from './edit-password-change.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPasswordChangePageRoutingModule,FooterModule
  ],
  declarations: [EditPasswordChangePage]
})
export class EditPasswordChangePageModule {}
