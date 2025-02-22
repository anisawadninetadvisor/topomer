import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeFollowingUserPageRoutingModule } from './liste-following-user-routing.module';

import { ListeFollowingUserPage } from './liste-following-user.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeFollowingUserPageRoutingModule,FooterModule
  ],
  declarations: [ListeFollowingUserPage]
})
export class ListeFollowingUserPageModule {}
