import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeFollowingUserPage } from './liste-following-user.page';

const routes: Routes = [
  {
    path: '',
    component: ListeFollowingUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeFollowingUserPageRoutingModule {}
