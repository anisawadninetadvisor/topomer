import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeFollowersPageRoutingModule } from './liste-followers-routing.module';

import { ListeFollowersPage } from './liste-followers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeFollowersPageRoutingModule
  ],
  declarations: [ListeFollowersPage]
})
export class ListeFollowersPageModule {}
