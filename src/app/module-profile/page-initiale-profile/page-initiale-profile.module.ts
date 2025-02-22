import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';
import { IonicModule } from '@ionic/angular';
 
import { PageInitialeProfilePageRoutingModule } from './page-initiale-profile-routing.module';
import { PageInitialeProfilePage } from './page-initiale-profile.page';
import { ListepostandfollowersModule } from 'src/app/module-user/listepostandfollowers/listeposandfollowers.module';
import { PostprofilesModule } from '../componets/postprofiles/postprofiles.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageInitialeProfilePageRoutingModule,FooterModule,ListepostandfollowersModule,PostprofilesModule
  ],
  declarations: [PageInitialeProfilePage]
})
export class PageInitialeProfilePageModule {}
