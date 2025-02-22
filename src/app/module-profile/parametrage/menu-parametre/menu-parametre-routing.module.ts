import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuParametrePage } from './menu-parametre.page';

const routes: Routes = [
  {
    path: '',
    component: MenuParametrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuParametrePageRoutingModule {}
