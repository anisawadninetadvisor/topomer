import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';
import { EditNamePageRoutingModule } from './edit-name-routing.module';

import { EditNamePage } from './edit-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditNamePageRoutingModule,FooterModule
  ],
  declarations: [EditNamePage]
})
export class EditNamePageModule {}
