import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageUserClientPage } from './message-user-client.page';

const routes: Routes = [
  {
    path: '',
    component: MessageUserClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageUserClientPageRoutingModule {}
