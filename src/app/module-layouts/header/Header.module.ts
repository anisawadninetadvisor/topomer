import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { IonicModule } from '@ionic/angular'; // Importation nécessaire

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule,RouterModule,IonicModule],
  exports: [HeaderComponent] 
})
export class HeaderModule {}