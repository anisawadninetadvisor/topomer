import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterfaceInitialePage } from './interface-initiale.page';

const routes: Routes = [
  {
    path: '',
    component: InterfaceInitialePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterfaceInitialePageRoutingModule {}
