import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListepostandfollowersComponent } from './listepostandfollowers.component';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListepostandfollowersComponent],
  imports: [CommonModule,IonicModule,RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ListepostandfollowersComponent],
  providers: []
})
export class ListepostandfollowersModule {}