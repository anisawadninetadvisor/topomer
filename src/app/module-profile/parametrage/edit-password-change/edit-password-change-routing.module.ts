import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPasswordChangePage } from './edit-password-change.page';

const routes: Routes = [
  {
    path: '',
    component: EditPasswordChangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPasswordChangePageRoutingModule {}
