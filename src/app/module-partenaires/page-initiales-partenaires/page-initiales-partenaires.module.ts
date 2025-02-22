import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageInitialesPartenairesPageRoutingModule } from './page-initiales-partenaires-routing.module';

import { PageInitialesPartenairesPage } from './page-initiales-partenaires.page';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';
import { HeaderModule } from 'src/app/module-layouts/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageInitialesPartenairesPageRoutingModule,FooterModule,HeaderModule
  ],
  declarations: [PageInitialesPartenairesPage]
})
export class PageInitialesPartenairesPageModule {}
