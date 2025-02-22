import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeFollowingPage } from './liste-following.page';

const routes: Routes = [
  {
    path: '',
    component: ListeFollowingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeFollowingPageRoutingModule {}
