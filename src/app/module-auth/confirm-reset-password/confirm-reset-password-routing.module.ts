import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmResetPasswordPage } from './confirm-reset-password.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmResetPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmResetPasswordPageRoutingModule {}
