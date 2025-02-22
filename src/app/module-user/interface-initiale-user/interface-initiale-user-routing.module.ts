import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterfaceInitialeUserPage } from './interface-initiale-user.page';

const routes: Routes = [
  {
    path: '',
    component: InterfaceInitialeUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterfaceInitialeUserPageRoutingModule {}
