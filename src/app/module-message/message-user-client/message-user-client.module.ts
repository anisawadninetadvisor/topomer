import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageUserClientPageRoutingModule } from './message-user-client-routing.module';

import { MessageUserClientPage } from './message-user-client.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageUserClientPageRoutingModule,FooterModule
  ],
  declarations: [MessageUserClientPage]
})
export class MessageUserClientPageModule {}
