import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeFollowingPageRoutingModule } from './liste-following-routing.module';

import { ListeFollowingPage } from './liste-following.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeFollowingPageRoutingModule
  ],
  declarations: [ListeFollowingPage]
})
export class ListeFollowingPageModule {}
