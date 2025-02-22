import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmAuthPage } from './confirm-auth.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmAuthPageRoutingModule {}
