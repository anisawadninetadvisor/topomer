import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoiceTypePage } from './choice-type.page';

const routes: Routes = [
  {
    path: '',
    component: ChoiceTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoiceTypePageRoutingModule {}
