import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockagePage } from './blockage.page';

const routes: Routes = [
  {
    path: '',
    component: BlockagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlockagePageRoutingModule {}
