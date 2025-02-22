import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoiceTypePageRoutingModule } from './choice-type-routing.module';

import { ChoiceTypePage } from './choice-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoiceTypePageRoutingModule
  ],
  declarations: [ChoiceTypePage]
})
export class ChoiceTypePageModule {}
