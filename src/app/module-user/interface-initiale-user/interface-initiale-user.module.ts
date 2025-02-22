import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PostprofilesModule } from 'src/app/module-profile/componets/postprofiles/postprofiles.module';
import { InterfaceInitialeUserPageRoutingModule } from './interface-initiale-user-routing.module';
import { InterfaceInitialeUserPage } from './interface-initiale-user.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';
import { ListepostandfollowersModule } from '../listepostandfollowers/listeposandfollowers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterfaceInitialeUserPageRoutingModule,FooterModule,ListepostandfollowersModule,PostprofilesModule
  ],
  declarations: [InterfaceInitialeUserPage]
})
export class InterfaceInitialeUserPageModule {}
