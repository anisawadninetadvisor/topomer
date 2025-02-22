import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeFollowersUserPageRoutingModule } from './liste-followers-user-routing.module';

import { ListeFollowersUserPage } from './liste-followers-user.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeFollowersUserPageRoutingModule,FooterModule
  ],
  declarations: [ListeFollowersUserPage]
})
export class ListeFollowersUserPageModule {}
