import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderPayementPage } from './order-payement.page';

const routes: Routes = [
  {
    path: '',
    component: OrderPayementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPayementPageRoutingModule {}
